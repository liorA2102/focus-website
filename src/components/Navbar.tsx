'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Logo from './Logo'
import type { Dictionary, Locale } from '@/lib/i18n'
import { SHOW_POSITIONS } from '@/lib/flags'

export default function Navbar({ d, lang }: { d: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const otherLang = lang === 'en' ? 'he' : 'en'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [lang])

  const navLinks = [
    { key: 'about', label: d.nav.about },
    { key: 'services', label: d.nav.services },
    ...(SHOW_POSITIONS ? [{ key: 'positions', label: d.nav.positions }] : []),
    { key: 'contact', label: d.nav.contact },
  ]

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 h-[72px] px-5 md:px-14 flex items-center justify-between bg-white/92 backdrop-blur-md transition-all duration-300 ${scrolled || open ? 'border-b border-[var(--border)] shadow-sm' : 'border-b border-transparent'}`}>
        <Link href={`/${lang}`} className="flex items-center gap-3.5 no-underline" onClick={() => setOpen(false)}>
          <Logo size={38} />
          <div className="leading-none">
            <span className="block text-[15px] font-extrabold tracking-tight text-[var(--navy)]">FOCUS</span>
            <span className="block text-[15px] font-light tracking-widest text-[var(--navy)]">GROUP</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {navLinks.map(({ key, label }) => (
            <li key={key}>
              <Link href={`/${lang}/${key}`} className="text-sm font-medium text-[var(--navy)] opacity-65 hover:opacity-100 transition-opacity no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <Link href={`/${otherLang}`} className="text-xs font-bold tracking-widest text-[var(--navy)] opacity-40 hover:opacity-70 transition-opacity no-underline">
            {d.nav.langToggle}
          </Link>
          <Link href={`/${lang}/contact`} className="px-5 py-2.5 rounded-md bg-[var(--coral)] text-white text-sm font-semibold hover:bg-[#d14a32] transition-all no-underline">
            {d.nav.cta}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[var(--navy)] transition-all duration-200 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[var(--navy)] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[var(--navy)] transition-all duration-200 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-white pt-[72px] flex flex-col px-6 py-8 md:hidden">
          <ul className="flex flex-col gap-1 list-none mb-8">
            {navLinks.map(({ key, label }) => (
              <li key={key}>
                <Link
                  href={`/${lang}/${key}`}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[20px] font-semibold text-[var(--navy)] border-b border-[var(--border)] no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-auto">
            <Link href={`/${lang}/contact`} onClick={() => setOpen(false)} className="py-3.5 rounded-lg bg-[var(--coral)] text-white text-[15px] font-semibold text-center no-underline">
              {d.nav.cta}
            </Link>
            <Link href={`/${otherLang}`} onClick={() => setOpen(false)} className="py-3.5 rounded-lg border border-[var(--border)] text-[var(--navy)] text-[15px] font-semibold text-center no-underline opacity-60">
              {d.nav.langToggle}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
