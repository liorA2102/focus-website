@AGENTS.md

# Focus Group Website — Architecture

## Data Flow: Positions

```
Jacob's machine (Focus app)
  └─ creates / updates / closes a position
       └─ syncs to Turso (cloud SQLite) immediately
            └─ focusgroup.co.il reads from Turso on every request
```

**Focus app** runs locally on Jacob's PC (`localhost:3001`).  
**Turso** is the shared cloud database (`TURSO_URL` / `TURSO_TOKEN` in `.env.local` of both repos).  
**This website** is deployed on Vercel and queries Turso directly in server components.

## Why `export const dynamic = 'force-dynamic'`

All position-related pages (`[lang]/page.tsx`, `[lang]/positions/page.tsx`, `[lang]/positions/[id]/page.tsx`) set `force-dynamic`.

Without it, Vercel statically generates these pages at deploy time and caches them indefinitely — position changes in Focus would never appear on the site until the next redeploy.

With `force-dynamic`, every request hits Turso live. Traffic is low enough that this is fine.

## Sync Rules (enforced in Focus app)

- **New position created** → upserted to Turso immediately (status = open)
- **Position updated** → upserted to Turso if still open, removed if closed/filled/cancelled
- **Position deleted** → removed from Turso
- **Client/company name** → intentionally NOT synced (confidential). The `client` column in Turso is always blank.

## Manual Full-Resync

If Turso ever gets out of sync with the local Focus DB, hit this endpoint on Jacob's machine:

```
POST http://localhost:3001/api/admin/sync-turso
```

This purges stale rows and re-upserts all currently-open positions.  
Read back what's in Turso:

```
GET http://localhost:3001/api/admin/sync-turso
```

## Deploying to Production

Git pushes to `main` trigger a Vercel build automatically, but **do not always auto-promote to the custom domain**. After pushing, always promote manually:

```bash
# 1. List deployments — find the newest one (shows age like "2m")
npx vercel ls

# 2. Promote it
npx vercel promote <deployment-url> --yes

# 3. Verify the CDN cache was cleared (should show age: 0, x-vercel-cache: MISS)
curl -sI https://focusgroup.co.il/he/positions | grep -E "x-vercel-cache|age" -i
```

If `x-vercel-cache: HIT` with a high age after promotion, wait 10 seconds and retry the curl — CDN propagation takes a moment.

## Environment Variables

| Var | Where | Purpose |
|-----|-------|---------|
| `TURSO_URL` | Both repos | Turso database URL (`libsql://...`) |
| `TURSO_TOKEN` | Both repos | Turso auth token |
| `FOCUS_API_URL` | Website only | Focus app base URL (for apply-form proxy) |
