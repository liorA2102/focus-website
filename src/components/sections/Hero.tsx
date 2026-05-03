'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Dictionary, Locale } from '@/lib/i18n'

export default function Hero({ d, lang }: { d: Dictionary; lang: Locale }) {
  const wordRef = useRef<HTMLSpanElement>(null)
  const words = d.hero.rotatingWords
  const indexRef = useRef(0)
  const isRTL = lang === 'he'

  useEffect(() => {
    const el = wordRef.current
    if (!el) return
    const interval = setInterval(() => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(-10px)'
      setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % words.length
        el.textContent = words[indexRef.current]
        el.style.transition = 'none'
        el.style.opacity = '0'
        el.style.transform = 'translateY(10px)'
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.transition = 'opacity 0.25s ease, transform 0.25s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }))
      }, 260)
    }, 2800)
    return () => clearInterval(interval)
  }, [words])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-5 md:px-14 pt-[132px] pb-20"
      style={{
        background: isRTL ? `
          radial-gradient(ellipse 60% 80% at 15% 40%, rgba(240,88,81,0.11) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 30% 90%, rgba(30,43,60,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 5% 10%, rgba(240,88,81,0.07) 0%, transparent 55%),
          linear-gradient(200deg, #ffffff 40%, #fef7f6 100%)
        ` : `
          radial-gradient(ellipse 60% 80% at 85% 40%, rgba(240,88,81,0.11) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 70% 90%, rgba(30,43,60,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 95% 10%, rgba(240,88,81,0.07) 0%, transparent 55%),
          linear-gradient(160deg, #ffffff 40%, #fef7f6 100%)
        `
      }}
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px' }}
      />

      {/* Network SVG */}
      <svg className={`hidden md:block absolute top-0 h-full w-[58%] pointer-events-none opacity-0 animate-[fadeUp_0.8s_0.3s_forwards] ${isRTL ? 'left-[-20px]' : 'right-[-20px]'}`}
        viewBox="0 0 650 580" preserveAspectRatio="xMidYMid meet">
        <g stroke="#F05851" strokeWidth="1" opacity="0.13">
          <line x1="60" y1="55" x2="185" y2="28"/><line x1="185" y1="28" x2="330" y2="68"/>
          <line x1="330" y1="68" x2="465" y2="42"/><line x1="465" y1="42" x2="580" y2="88"/>
          <line x1="60" y1="55" x2="145" y2="135"/><line x1="185" y1="28" x2="145" y2="135"/>
          <line x1="185" y1="28" x2="280" y2="158"/><line x1="330" y1="68" x2="280" y2="158"/>
          <line x1="330" y1="68" x2="415" y2="140"/><line x1="465" y1="42" x2="415" y2="140"/>
          <line x1="465" y1="42" x2="545" y2="168"/><line x1="580" y1="88" x2="545" y2="168"/>
          <line x1="28" y1="155" x2="145" y2="135"/><line x1="145" y1="135" x2="280" y2="158"/>
          <line x1="280" y1="158" x2="415" y2="140"/><line x1="415" y1="140" x2="545" y2="168"/>
          <line x1="545" y1="168" x2="635" y2="130"/><line x1="145" y1="135" x2="88" y2="258"/>
          <line x1="145" y1="135" x2="225" y2="272"/><line x1="280" y1="158" x2="225" y2="272"/>
          <line x1="280" y1="158" x2="360" y2="248"/><line x1="415" y1="140" x2="360" y2="248"/>
          <line x1="415" y1="140" x2="495" y2="265"/><line x1="545" y1="168" x2="495" y2="265"/>
          <line x1="635" y1="130" x2="620" y2="245"/><line x1="88" y1="258" x2="225" y2="272"/>
          <line x1="225" y1="272" x2="360" y2="248"/><line x1="360" y1="248" x2="495" y2="265"/>
          <line x1="495" y1="265" x2="620" y2="245"/><line x1="88" y1="258" x2="178" y2="345"/>
          <line x1="225" y1="272" x2="178" y2="345"/><line x1="225" y1="272" x2="315" y2="368"/>
          <line x1="360" y1="248" x2="315" y2="368"/><line x1="360" y1="248" x2="450" y2="352"/>
          <line x1="495" y1="265" x2="450" y2="352"/><line x1="620" y1="245" x2="578" y2="372"/>
          <line x1="48" y1="355" x2="178" y2="345"/><line x1="178" y1="345" x2="315" y2="368"/>
          <line x1="315" y1="368" x2="450" y2="352"/><line x1="450" y1="352" x2="578" y2="372"/>
          <line x1="178" y1="345" x2="130" y2="452"/><line x1="178" y1="345" x2="268" y2="440"/>
          <line x1="315" y1="368" x2="268" y2="440"/><line x1="315" y1="368" x2="405" y2="465"/>
          <line x1="450" y1="352" x2="405" y2="465"/><line x1="450" y1="352" x2="535" y2="448"/>
          <line x1="578" y1="372" x2="535" y2="448"/><line x1="130" y1="452" x2="268" y2="440"/>
          <line x1="268" y1="440" x2="405" y2="465"/><line x1="405" y1="465" x2="535" y2="448"/>
        </g>
        <g fill="#F05851">
          <circle cx="60" cy="55" r="2.8" opacity=".28"/><circle cx="185" cy="28" r="2.8" opacity=".22"/>
          <circle cx="330" cy="68" r="2.8" opacity=".32"/><circle cx="465" cy="42" r="2.8" opacity=".22"/>
          <circle cx="580" cy="88" r="2.8" opacity=".28"/><circle cx="28" cy="155" r="2.5" opacity=".18"/>
          <circle cx="145" cy="135" r="2.8" opacity=".28"/><circle cx="280" cy="158" r="2.8" opacity=".22"/>
          <circle cx="415" cy="140" r="2.8" opacity=".28"/><circle cx="545" cy="168" r="2.8" opacity=".22"/>
          <circle cx="635" cy="130" r="2.5" opacity=".18"/><circle cx="88" cy="258" r="2.8" opacity=".28"/>
          <circle cx="225" cy="272" r="2.8" opacity=".22"/><circle cx="360" cy="248" r="2.8" opacity=".28"/>
          <circle cx="495" cy="265" r="2.8" opacity=".22"/><circle cx="620" cy="245" r="2.5" opacity=".18"/>
          <circle cx="48" cy="355" r="2.5" opacity=".18"/><circle cx="178" cy="345" r="2.8" opacity=".28"/>
          <circle cx="315" cy="368" r="2.8" opacity=".22"/><circle cx="450" cy="352" r="2.8" opacity=".28"/>
          <circle cx="578" cy="372" r="2.8" opacity=".22"/><circle cx="130" cy="452" r="2.8" opacity=".22"/>
          <circle cx="268" cy="440" r="2.8" opacity=".28"/><circle cx="405" cy="465" r="2.8" opacity=".22"/>
          <circle cx="535" cy="448" r="2.8" opacity=".28"/>
          <circle cx="330" cy="68" r="5" opacity=".45" className="animate-[nodePulse_3.6s_ease-in-out_infinite]"/>
          <circle cx="280" cy="158" r="5" opacity=".45" className="animate-[nodePulse_3.6s_1.2s_ease-in-out_infinite]"/>
          <circle cx="360" cy="248" r="5" opacity=".45" className="animate-[nodePulse_3.6s_2.4s_ease-in-out_infinite]"/>
          <circle cx="268" cy="440" r="5" opacity=".4" className="animate-[nodePulse_3.6s_0.6s_ease-in-out_infinite]"/>
        </g>
        <g fill="#1E2B3C">
          <circle cx="495" cy="265" r="3.5" opacity=".12"/>
          <circle cx="88" cy="258" r="3" opacity=".1"/>
          <circle cx="450" cy="352" r="3.5" opacity=".12"/>
        </g>
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-[640px]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--coral-bg)] border border-[var(--coral-border)] text-[11px] font-bold tracking-widest uppercase text-[var(--coral)] mb-8 opacity-0 animate-[fadeUp_0.5s_0.1s_forwards]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--coral)]" />
          {d.hero.badge}
        </div>

        <h1 className="text-[clamp(46px,5.5vw,78px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--navy)] mb-6 opacity-0 animate-[fadeUp_0.6s_0.22s_forwards]">
          {d.hero.headline1}<br />
          <span className="text-[var(--coral)]">
            {d.hero.headlineAccent}{' '}
            <span
              ref={wordRef}
              className="inline-block"
              style={{ transition: 'opacity 0.25s ease, transform 0.25s ease' }}
            >
              {words[0]}
            </span>
            {d.hero.headlinePeriod}
          </span><br />
          {d.hero.headline2}
        </h1>

        <p className="text-[17px] leading-[1.72] text-[var(--muted)] max-w-[460px] mb-10 opacity-0 animate-[fadeUp_0.6s_0.38s_forwards]">
          {d.hero.sub}
        </p>

        <div className="flex gap-3.5 flex-wrap opacity-0 animate-[fadeUp_0.6s_0.52s_forwards]">
          <Link href={`/${lang}/contact`} className="px-8 py-3.5 rounded-lg bg-[var(--coral)] text-white text-[15px] font-semibold hover:bg-[#d14a32] transition-all hover:-translate-y-px hover:shadow-xl no-underline">
            {d.hero.ctaPrimary}
          </Link>
          <Link href={`/${lang}/positions`} className="px-8 py-3.5 rounded-lg border-2 border-[var(--navy)] text-[var(--navy)] text-[15px] font-semibold hover:bg-[var(--navy)] hover:text-white transition-all no-underline">
            {d.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
