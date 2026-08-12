// Feature flags for the public site.
//
// SHOW_POSITIONS controls the entire public job-posts area:
//   - the positions preview section on the homepage
//   - the "Positions" links in the navbar, footer and hero
//   - the /[lang]/positions list and /[lang]/positions/[id] detail pages
//     (both redirect to the homepage while this is false)
//
// Flip to `true` to bring jobs back — no other change needed.
export const SHOW_POSITIONS = false
