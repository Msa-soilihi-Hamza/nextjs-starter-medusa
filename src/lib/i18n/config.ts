export const i18nConfig = {
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localeDetection: false,
} as const

export type Locale = (typeof i18nConfig.locales)[number]

// Map country codes to locales
export const countryToLocale: Record<string, Locale> = {
  fr: "fr",
  be: "fr",
  ch: "fr",
  ca: "fr",
  us: "en",
  gb: "en",
  au: "en",
}

export function getLocaleFromCountry(countryCode: string): Locale {
  return countryToLocale[countryCode?.toLowerCase()] || i18nConfig.defaultLocale
}
