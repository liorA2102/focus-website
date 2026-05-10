import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import type { Dictionary, Locale } from '@/lib/i18n'

type PreviewPosition = { id: string; title: string; company: string; location: string | null }

export default function PositionsPreview({ d, lang, positions }: { d: Dictionary; lang: Locale; positions: PreviewPosition[] }) {
  return (
    <section className="py-24 px-14 bg-[var(--grey)]" id="positions">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <ScrollReveal><p className="text-[11px] font-bold tracking-[.12em] uppercase text-[var(--coral)] mb-3.5">{d.positions.tag}</p></ScrollReveal>
            <ScrollReveal delay={80}><h2 className="text-[clamp(30px,3.5vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--navy)]">{d.positions.title}</h2></ScrollReveal>
          </div>
          <ScrollReveal delay={160}>
            <Link href={`/${lang}/positions`} className="text-sm font-semibold text-[var(--coral)] hover:underline no-underline">
              {d.positions.viewAll} →
            </Link>
          </ScrollReveal>
        </div>

        {positions.length === 0 ? (
          <ScrollReveal>
            <p className="text-[16px] text-[var(--muted)] text-center py-12">{d.positions.sub}</p>
          </ScrollReveal>
        ) : (
          <div className="flex flex-col gap-4">
            {positions.map((pos, i) => (
              <ScrollReveal key={pos.id} delay={i * 60}>
                <Link href={`/${lang}/positions/${pos.id}`} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--coral)]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all group no-underline cursor-pointer">
                  <div>
                    <h3 className="text-[17px] font-bold text-[var(--navy)] mb-1 group-hover:text-[var(--coral)] transition-colors">{pos.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                      {pos.location && <span>{pos.location}</span>}
                    </div>
                  </div>
                  <span className="px-5 py-2 rounded-lg bg-[var(--coral-bg)] text-[var(--coral)] text-sm font-semibold group-hover:bg-[var(--coral)] group-hover:text-white transition-all shrink-0">
                    {d.positions.apply}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
