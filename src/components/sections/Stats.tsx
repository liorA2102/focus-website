import ScrollReveal from '@/components/ScrollReveal'
import type { Dictionary } from '@/lib/i18n'

export default function Stats({ d }: { d: Dictionary }) {
  const items = [
    { num: '6,300+', label: d.stats.placements },
    { num: '1992', label: d.stats.established },
    { num: '950+', label: d.stats.clients },
  ]

  return (
    <section className="bg-[var(--navy)] py-16 px-14">
      <div className="max-w-[1080px] mx-auto grid grid-cols-3">
        {items.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 80} className={`text-center px-6 relative ${i > 0 ? 'before:absolute before:left-0 before:top-[10%] before:h-[80%] before:w-px before:bg-white/10' : ''}`}>
            <span className="block text-[clamp(44px,5vw,68px)] font-extrabold tracking-[-0.04em] text-[var(--coral)] leading-none">
              {item.num}
            </span>
            <span className="block mt-2 text-xs font-semibold tracking-widest uppercase text-white/40">
              {item.label}
            </span>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
