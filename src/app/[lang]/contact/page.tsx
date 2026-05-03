import { getDictionary, type Locale } from '@/lib/i18n'
import ContactForm from '@/components/sections/ContactForm'

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const d = getDictionary(lang as Locale)
  return <ContactForm d={d} />
}
