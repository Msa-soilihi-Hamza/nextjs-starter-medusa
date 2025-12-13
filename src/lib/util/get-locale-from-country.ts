// Mapping between country codes (Medusa regions) and locales (i18n)
const countryToLocale: Record<string, "fr" | "en"> = {
  // French-speaking countries
  fr: "fr",
  be: "fr",
  ch: "fr",
  ca: "fr",
  // English-speaking countries
  us: "en",
  gb: "en",
  au: "en",
  nz: "en",
  ie: "en",
  in: "en",
  sg: "en",
}

export function getLocaleFromCountry(countryCode: string): "fr" | "en" {
  return countryToLocale[countryCode?.toLowerCase()] || "fr"
}
