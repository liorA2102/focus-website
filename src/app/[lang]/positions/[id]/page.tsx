import Link from 'next/link'
import { getDictionary, type Locale } from '@/lib/i18n'
import ApplyForm from '@/components/ApplyForm'
import { createClient } from '@libsql/client'

type ApiPosition = {
  id: number
  title: string
  company: string
  location: string | null
  industry: string | null
  salaryRange: string | null
  description: string | null
  requirements: string | null
}

async function getPosition(id: string): Promise<ApiPosition | null> {
  try {
    const client = createClient({
      url: process.env.TURSO_URL!,
      authToken: process.env.TURSO_TOKEN!,
    })
    const result = await client.execute({
      sql: 'SELECT * FROM positions WHERE id = ?',
      args: [Number(id)],
    })
    const r = result.rows[0]
    if (!r) return null
    return {
      id: r.id as number,
      title: r.title as string,
      company: r.client as string,
      location: r.location as string | null,
      industry: null,
      salaryRange: r.salary_range as string | null,
      description: r.description as string | null,
      requirements: r.requirements as string | null,
    }
  } catch {
    return null
  }
}

export default async function PositionDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  const d = getDictionary(lang as Locale)
  const position = await getPosition(id)

  if (!position) {
    return (
      <section className="min-h-screen pt-[120px] pb-24 px-5 md:px-14 bg-white">
        <div className="max-w-[1080px] mx-auto text-center py-20">
          <h1 className="text-[32px] font-extrabold text-[var(--navy)] mb-3">{d.positionDetail.notFound}</h1>
          <p className="text-[16px] text-[var(--muted)] mb-8">{d.positionDetail.notFoundBody}</p>
          <Link href={`/${lang}/positions`} className="text-[var(--coral)] font-semibold hover:underline">
            ← {d.positionDetail.backToPositions}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen pt-[120px] pb-24 px-5 md:px-14 bg-white">
      <div className="max-w-[1080px] mx-auto">
        {/* Back link */}
        <Link
          href={`/${lang}/positions`}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--muted)] hover:text-[var(--coral)] transition-colors no-underline mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {d.positionDetail.backToPositions}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* Left: position info */}
          <div>
            {position.industry && (
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--coral-bg)] text-[var(--coral)] text-[11px] font-bold tracking-wide uppercase mb-4">
                {position.industry}
              </div>
            )}
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--navy)] mb-3">
              {position.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[14px] text-[var(--muted)] mb-8">
              <span className="font-medium text-[var(--navy)]">{position.company}</span>
              {position.location && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                  <span>{position.location}</span>
                </>
              )}
              <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
              <span>{d.positionDetail.fullTime}</span>
            </div>

            {position.salaryRange && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[14px] text-[var(--navy)] font-semibold mb-8">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--coral)]">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                {position.salaryRange}
              </div>
            )}

            {position.description && (
              <div className="mb-10">
                <h2 className="text-[17px] font-extrabold text-[var(--navy)] mb-3">{d.positionDetail.aboutRole}</h2>
                <div className="text-[15px] leading-[1.8] text-[var(--muted)] whitespace-pre-wrap">{position.description}</div>
              </div>
            )}

            {position.requirements && (
              <div className="mb-10">
                <h2 className="text-[17px] font-extrabold text-[var(--navy)] mb-3">{d.positionDetail.requirements}</h2>
                <div className="text-[15px] leading-[1.8] text-[var(--muted)] whitespace-pre-wrap">{position.requirements}</div>
              </div>
            )}

            {/* Apply form on mobile (below content) */}
            <div className="lg:hidden">
              <ApplyForm positionId={position.id} positionTitle={position.title} d={d.positionDetail} />
            </div>
          </div>

          {/* Right: sticky apply form (desktop) */}
          <div className="hidden lg:block sticky top-[100px]">
            <ApplyForm positionId={position.id} positionTitle={position.title} d={d.positionDetail} />
          </div>
        </div>
      </div>
    </section>
  )
}
