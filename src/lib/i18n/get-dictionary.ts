import type { Locale } from "./config"

const dictionaries = {
  en: () => import("./locales/en.json").then((module) => module.default),
  fr: () => import("./locales/fr.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  const dictionaryLoader = dictionaries[locale] || dictionaries.fr
  return dictionaryLoader()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
