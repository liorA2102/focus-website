import Link from 'next/link'
import Logo from './Logo'
import type { Dictionary, Locale } from '@/lib/i18n'

export default function Footer({ d, lang }: { d: Dictionary; lang: Locale }) {
  return (
    <footer className="bg-[#111922] px-14 pt-16 pb-8">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-3 gap-14 pb-12 border-b border-white/[0.07] mb-7">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={28} />
              <span className="text-white font-bold text-sm tracking-tight">FOCUS GROUP</span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed whitespace-pre-line">{d.footer.tagline}</p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/28 mb-5">{d.footer.nav}</div>
            <ul className="flex flex-col gap-3 list-none">
              {[
                { href: `/${lang}/about`, label: d.nav.about },
                { href: `/${lang}/services`, label: d.nav.services },
                { href: `/${lang}/positions`, label: d.nav.positions },
                { href: `/${lang}/contact`, label: d.nav.contact },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/55 hover:text-white transition-colors no-underline">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/28 mb-5">{d.footer.contact}</div>
            <div className="space-y-3">
              {[
                { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0', text: d.footer.address },
                { icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12 19.79 19.79 0 0 1 1.21 3.5a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z', text: d.footer.phone },
                { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6', text: d.footer.email },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <svg className="w-[15px] h-[15px] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#F05851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon} />
                  </svg>
                  <span className="text-[13px] text-white/50 leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-white/20">{d.footer.copyright}</span>
          <span className="text-xs text-white/20">Ramat Gan, Israel</span>
        </div>
      </div>
    </footer>
  )
}
