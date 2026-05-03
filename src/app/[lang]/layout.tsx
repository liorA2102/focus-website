import type { Metadata } from 'next'
import { getDictionary, type Locale } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'he' }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'he' ? 'פוקוס גרופ — גיוס בכירים' : 'Focus Group — Executive Recruiting',
    description: lang === 'he'
      ? 'מעל 30 שנות ניסיון בגיוס מנהלים בכירים וכישרונות מובילים בישראל ובעולם.'
      : 'Over 30 years placing senior executives and top talent across Israel and globally.',
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const d = getDictionary(locale)
  const isRTL = locale === 'he'

  return (
    <div lang={lang} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar d={d} lang={locale} />
      <main>{children}</main>
      <Footer d={d} lang={locale} />
    </div>
  )
}
