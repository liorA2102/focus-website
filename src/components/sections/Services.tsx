import ScrollReveal from '@/components/ScrollReveal'
import type { Dictionary } from '@/lib/i18n'

const icons = [
  'M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
  'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
]

export default function Services({ d }: { d: Dictionary }) {
  return (
    <section className="py-24 px-5 md:px-14" id="services">
      <div className="max-w-[1080px] mx-auto">
        <ScrollReveal><p className="text-[11px] font-bold tracking-[.12em] uppercase text-[var(--coral)] mb-3.5">{d.services.tag}</p></ScrollReveal>
        <ScrollReveal delay={80}><h2 className="text-[clamp(30px,3.5vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--navy)] mb-3.5 whitespace-pre-line">{d.services.title}</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="text-[16px] leading-[1.7] text-[var(--muted)] max-w-[480px] mb-14">{d.services.sub}</p></ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {d.services.items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 80}>
              <div className="group bg-white border border-[var(--border)] rounded-[18px] p-10 relative overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:border-transparent transition-all duration-300 cursor-default">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--coral)] scale-x-0 group-hover:scale-x-100 origin-left rtl:origin-right transition-transform duration-300" />
                <div className="w-[50px] h-[50px] rounded-xl bg-[var(--coral-bg)] flex items-center justify-center mb-6">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="#F05851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icons[i]} />
                  </svg>
                </div>
                <h3 className="text-[19px] font-bold tracking-[-0.02em] text-[var(--navy)] mb-2.5">{item.title}</h3>
                <p className="text-sm leading-[1.7] text-[var(--muted)]">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
