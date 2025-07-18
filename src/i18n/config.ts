export const locales = ['en', 'de'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const i18nMatcher = '/((?!api|_next|.*\\..*).*)'
