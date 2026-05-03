import ScrollReveal from '@/components/ScrollReveal'
import type { Dictionary } from '@/lib/i18n'

export default function Testimonials({ d }: { d: Dictionary }) {
  return (
    <section className="py-24 px-5 md:px-14 bg-white">
      <div className="max-w-[1080px] mx-auto">
        <ScrollReveal><p className="text-[11px] font-bold tracking-[.12em] uppercase text-[var(--coral)] mb-3.5">{d.testimonials.tag}</p></ScrollReveal>
        <ScrollReveal delay={80}><h2 className="text-[clamp(30px,3.5vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--navy)] mb-16 whitespace-pre-line">{d.testimonials.title}</h2></ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {d.testimonials.items.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 80}>
              <div className="bg-[var(--grey)] rounded-2xl p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="text-[var(--coral)] text-4xl font-serif leading-none mb-4">&ldquo;</div>
                  <p className="text-[15px] leading-[1.7] text-[var(--navy)] mb-6">{item.quote}</p>
                </div>
                <div className="border-t border-[var(--border)] pt-5">
                  <div className="font-semibold text-[var(--navy)] text-sm">{item.name}</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">{item.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
