import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import type { Dictionary, Locale } from '@/lib/i18n'

// Sample positions — replace with real data source later
const samplePositions = [
  { id: '1', title: 'VP Engineering', company: 'High-Tech Startup', location: 'Tel Aviv', type: 'Full-time' },
  { id: '2', title: 'CFO', company: 'Capital Fund', location: 'Ramat Gan', type: 'Full-time' },
  { id: '3', title: 'Director of Business Development', company: 'MedTech Company', location: 'Herzliya', type: 'Full-time' },
]

export default function PositionsPreview({ d, lang }: { d: Dictionary; lang: Locale }) {
  return (
    <section className="py-24 px-14 bg-white" id="positions">
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

        <div className="flex flex-col gap-4">
          {samplePositions.map((pos, i) => (
            <ScrollReveal key={pos.id} delay={i * 60}>
              <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--coral)]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                <div>
                  <h3 className="text-[17px] font-bold text-[var(--navy)] mb-1 group-hover:text-[var(--coral)] transition-colors">{pos.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                    <span>{pos.company}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
                    <span>{d.positions.location}: {pos.location}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
                    <span>{pos.type}</span>
                  </div>
                </div>
                <Link href={`/${lang}/positions/${pos.id}`} className="px-5 py-2 rounded-lg bg-[var(--coral-bg)] text-[var(--coral)] text-sm font-semibold hover:bg-[var(--coral)] hover:text-white transition-all no-underline shrink-0">
                  {d.positions.apply}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
