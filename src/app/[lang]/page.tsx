import { getDictionary, type Locale } from '@/lib/i18n'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Services from '@/components/sections/Services'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import Industries from '@/components/sections/Industries'
import PositionsPreview from '@/components/sections/PositionsPreview'
import CTA from '@/components/sections/CTA'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const d = getDictionary(lang as Locale)

  return (
    <>
      <Hero d={d} lang={lang as Locale} />
      <Stats d={d} />
      <Services d={d} />
      <HowItWorks d={d} />
      <Testimonials d={d} />
      <Industries d={d} />
      <PositionsPreview d={d} lang={lang as Locale} />
      <CTA d={d} lang={lang as Locale} />
    </>
  )
}
