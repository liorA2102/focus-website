'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Logo from './Logo'
import type { Dictionary, Locale } from '@/lib/i18n'

export default function Navbar({ d, lang }: { d: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false)
  const otherLang = lang === 'en' ? 'he' : 'en'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 h-[72px] px-14 flex items-center justify-between bg-white/92 backdrop-blur-md transition-all duration-300 ${scrolled ? 'border-b border-[var(--border)] shadow-sm' : 'border-b border-transparent'}`}>
      <Link href={`/${lang}`} className="flex items-center gap-3.5 no-underline">
        <Logo size={38} />
        <div className="leading-none">
          <span className="block text-[15px] font-extrabold tracking-tight text-[var(--navy)]">FOCUS</span>
          <span className="block text-[15px] font-light tracking-widest text-[var(--navy)]">GROUP</span>
        </div>
      </Link>

      <ul className="flex items-center gap-9 list-none">
        {[
          { key: 'about', label: d.nav.about },
          { key: 'services', label: d.nav.services },
          { key: 'positions', label: d.nav.positions },
          { key: 'contact', label: d.nav.contact },
        ].map(({ key, label }) => (
          <li key={key}>
            <Link href={`/${lang}/${key}`} className="text-sm font-medium text-[var(--navy)] opacity-65 hover:opacity-100 transition-opacity no-underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5">
        <Link href={`/${otherLang}`} className="text-xs font-bold tracking-widest text-[var(--navy)] opacity-40 hover:opacity-70 transition-opacity no-underline">
          {d.nav.langToggle}
        </Link>
        <Link href={`/${lang}/contact`} className="px-5 py-2.5 rounded-md bg-[var(--coral)] text-white text-sm font-semibold hover:bg-[#d14a32] transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-coral/30 no-underline">
          {d.nav.cta}
        </Link>
      </div>
    </nav>
  )
}
