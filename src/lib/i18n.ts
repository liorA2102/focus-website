import { en } from './dictionaries/en'
import { he } from './dictionaries/he'
export type { Dictionary } from './dictionaries/en'

export type Locale = 'en' | 'he'
export const locales: Locale[] = ['en', 'he']
export const defaultLocale: Locale = 'en'

export function getDictionary(locale: Locale) {
  return locale === 'he' ? he : en
}
