import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, isValidLocale } from './settings'

export default getRequestConfig(async ({ locale = defaultLocale }) => {
  const resolvedLocale = isValidLocale(locale) ? locale : defaultLocale

  return {
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
    locale: resolvedLocale,
    timeZone: 'Europe/Zurich',
  }
})
 