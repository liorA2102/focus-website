import ScrollReveal from '@/components/ScrollReveal'
import type { Dictionary } from '@/lib/i18n'

export default function Industries({ d }: { d: Dictionary }) {
  return (
    <section className="py-24 px-5 md:px-14 bg-[var(--grey)]" id="about">
      <div className="max-w-[1080px] mx-auto">
        <ScrollReveal><p className="text-[11px] font-bold tracking-[.12em] uppercase text-[var(--coral)] mb-3.5">{d.industries.tag}</p></ScrollReveal>
        <ScrollReveal delay={80}><h2 className="text-[clamp(30px,3.5vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--navy)] mb-3.5 whitespace-pre-line">{d.industries.title}</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="text-[16px] leading-[1.7] text-[var(--muted)] max-w-[480px] mb-14">{d.industries.sub}</p></ScrollReveal>

        <ScrollReveal delay={240}>
          <div className="flex flex-wrap gap-3">
            {d.industries.items.map((item) => (
              <span key={item} className="px-5 py-2.5 rounded-full border-[1.5px] border-[var(--navy)]/25 text-sm font-semibold text-[var(--navy)] opacity-75 hover:bg-[var(--coral)] hover:border-[var(--coral)] hover:text-white hover:opacity-100 hover:-translate-y-0.5 transition-all cursor-default">
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
