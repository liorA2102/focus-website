import { getDictionary, type Locale } from '@/lib/i18n'
import { createClient } from '@libsql/client'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Services from '@/components/sections/Services'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import Industries from '@/components/sections/Industries'
import PositionsPreview from '@/components/sections/PositionsPreview'
import CTA from '@/components/sections/CTA'

async function getPreviewPositions() {
  try {
    const client = createClient({ url: process.env.TURSO_URL!, authToken: process.env.TURSO_TOKEN! })
    const result = await client.execute('SELECT id, title, client, location FROM positions ORDER BY created_at DESC LIMIT 3')
    return result.rows.map((r) => ({
      id: String(r.id),
      title: r.title as string,
      company: r.client as string,
      location: r.location as string | null,
    }))
  } catch {
    return []
  }
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const d = getDictionary(lang as Locale)
  const positions = await getPreviewPositions()

  return (
    <>
      <Hero d={d} lang={lang as Locale} />
      <Stats d={d} />
      <Services d={d} />
      <HowItWorks d={d} />
      <Testimonials d={d} />
      <Industries d={d} />
      <PositionsPreview d={d} lang={lang as Locale} positions={positions} />
      <CTA d={d} lang={lang as Locale} />
    </>
  )
}
