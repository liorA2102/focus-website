import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import type { Dictionary, Locale } from '@/lib/i18n'

export default function CTA({ d, lang }: { d: Dictionary; lang: Locale }) {
  return (
    <section className="py-24 px-5 md:px-14 bg-[var(--navy)] relative overflow-hidden" id="contact">
      {/* Decorative circles */}
      <svg className="absolute ltr:right-[-80px] rtl:left-[-80px] top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-[0.035] pointer-events-none" viewBox="0 0 100 100" fill="none">
        {[49, 38, 27, 16, 5].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} stroke="#F05851" strokeWidth=".8" />
        ))}
      </svg>

      <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 relative z-10">
        <ScrollReveal>
          <h2 className="text-[clamp(30px,3.5vw,50px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-white mb-3.5 whitespace-pre-line">{d.cta.title}</h2>
          <p className="text-[16px] leading-[1.65] text-white/45">{d.cta.sub}</p>
        </ScrollReveal>
        <ScrollReveal delay={80} className="shrink-0">
          <div className="flex flex-col items-end rtl:items-start gap-3">
            <Link href={`/${lang}/contact`} className="px-8 py-3.5 rounded-lg bg-white text-[var(--navy)] text-[15px] font-semibold hover:bg-[var(--coral)] hover:text-white transition-all hover:-translate-y-px hover:shadow-xl no-underline whitespace-nowrap">
              {d.cta.btn}
            </Link>
            <span className="text-xs text-white/30">{d.cta.note}</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
