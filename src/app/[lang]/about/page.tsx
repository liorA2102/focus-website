import { getDictionary, type Locale } from '@/lib/i18n'
import ScrollReveal from '@/components/ScrollReveal'

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const d = getDictionary(lang as Locale)
  const { about, stats } = d

  return (
    <section className="min-h-screen pt-[120px] pb-24 px-14 bg-white">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-2 gap-24 items-start">
          <div>
            <ScrollReveal><p className="text-[11px] font-bold tracking-[.12em] uppercase text-[var(--coral)] mb-4">{about.tag}</p></ScrollReveal>
            <ScrollReveal delay={80}><h1 className="text-[clamp(36px,4vw,52px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--navy)] mb-8 whitespace-pre-line">{about.title}</h1></ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="text-[16px] leading-[1.8] text-[var(--muted)] space-y-5">
                {about.body.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="sticky top-28">
            <ScrollReveal delay={200}>
              <p className="text-[11px] font-bold tracking-[.12em] uppercase text-[var(--muted)] mb-8">{about.statsTitle}</p>
              <div className="flex flex-col gap-6">
                {[
                  { num: '6,300+', label: stats.placements },
                  { num: '1992', label: stats.established },
                  { num: '950+', label: stats.clients },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-6 p-6 rounded-2xl bg-[var(--grey)]">
                    <span className="text-[48px] font-extrabold tracking-[-0.04em] text-[var(--coral)] leading-none">{item.num}</span>
                    <span className="text-sm font-semibold text-[var(--muted)] uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
