import Link from 'next/link'
import { getDictionary, type Locale } from '@/lib/i18n'
import ScrollReveal from '@/components/ScrollReveal'
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

async function getPositions(): Promise<ApiPosition[]> {
  try {
    const client = createClient({
      url: process.env.TURSO_URL!,
      authToken: process.env.TURSO_TOKEN!,
    })
    const result = await client.execute('SELECT * FROM positions ORDER BY created_at DESC')
    return result.rows.map((r) => ({
      id: r.id as number,
      title: r.title as string,
      company: r.client as string,
      location: r.location as string | null,
      industry: null,
      salaryRange: r.salary_range as string | null,
      description: r.description as string | null,
      requirements: r.requirements as string | null,
    }))
  } catch {
    return []
  }
}

export default async function PositionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const d = getDictionary(lang as Locale)
  const positions = await getPositions()

  return (
    <section className="min-h-screen pt-[120px] pb-24 px-5 md:px-14 bg-white">
      <div className="max-w-[1080px] mx-auto">
        <ScrollReveal><p className="text-[11px] font-bold tracking-[.12em] uppercase text-[var(--coral)] mb-4">{d.positions.tag}</p></ScrollReveal>
        <ScrollReveal delay={80}><h1 className="text-[clamp(36px,4vw,52px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--navy)] mb-4">{d.positions.title}</h1></ScrollReveal>
        <ScrollReveal delay={160}><p className="text-[17px] leading-[1.7] text-[var(--muted)] mb-14">{d.positions.sub}</p></ScrollReveal>

        {positions.length === 0 ? (
          <ScrollReveal delay={200}>
            <div className="text-center py-20">
              <p className="text-[18px] font-semibold text-[var(--navy)] mb-2">{d.positionDetail.noPositions}</p>
              <p className="text-[15px] text-[var(--muted)]">{d.positionDetail.noPositionsSub}</p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="flex flex-col gap-4">
            {positions.map((pos, i) => (
              <ScrollReveal key={pos.id} delay={i * 50}>
                <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--coral)]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                  <div>
                    {pos.industry && (
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--coral-bg)] text-[var(--coral)] text-[11px] font-bold tracking-wide uppercase mb-2">{pos.industry}</div>
                    )}
                    <h3 className="text-[17px] font-bold text-[var(--navy)] mb-1 group-hover:text-[var(--coral)] transition-colors">{pos.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                      <span>{pos.company}</span>
                      {pos.location && <><span className="w-1 h-1 rounded-full bg-[var(--muted)]" /><span>{pos.location}</span></>}
                      <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
                      <span>{d.positionDetail.fullTime}</span>
                    </div>
                  </div>
                  <Link href={`/${lang}/positions/${pos.id}`} className="px-5 py-2 rounded-lg bg-[var(--coral-bg)] text-[var(--coral)] text-sm font-semibold hover:bg-[var(--coral)] hover:text-white transition-all no-underline shrink-0">
                    {d.positions.apply}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
