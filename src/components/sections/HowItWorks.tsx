import ScrollReveal from '@/components/ScrollReveal'
import type { Dictionary } from '@/lib/i18n'

export default function HowItWorks({ d }: { d: Dictionary }) {
  return (
    <section className="py-24 px-14 bg-[var(--grey)]">
      <div className="max-w-[1080px] mx-auto">
        <ScrollReveal><p className="text-[11px] font-bold tracking-[.12em] uppercase text-[var(--coral)] mb-3.5">{d.howItWorks.tag}</p></ScrollReveal>
        <ScrollReveal delay={80}><h2 className="text-[clamp(30px,3.5vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--navy)] mb-3.5 whitespace-pre-line">{d.howItWorks.title}</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="text-[16px] leading-[1.7] text-[var(--muted)] max-w-[480px] mb-16">{d.howItWorks.sub}</p></ScrollReveal>

        <div className="grid grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-[16%] right-[16%] h-px bg-[var(--border)] hidden md:block" />

          {d.howItWorks.steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 100}>
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center mb-6 relative z-10 shadow-sm">
                  <span className="text-[22px] font-extrabold text-[var(--coral)] tracking-tight">{step.num}</span>
                </div>
                <h3 className="text-[18px] font-bold text-[var(--navy)] mb-2.5 tracking-tight">{step.title}</h3>
                <p className="text-sm leading-[1.7] text-[var(--muted)]">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
