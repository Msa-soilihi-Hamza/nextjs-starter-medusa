"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { usePathname } from "next/navigation"
import { getLocaleFromCountry } from "@lib/util/get-locale-from-country"
import frTranslations from "./locales/fr"
import enTranslations from "./locales/en"

type Locale = "fr" | "en"
type Translations = typeof frTranslations

const translations: Record<Locale, Translations> = {
  fr: frTranslations,
  en: enTranslations,
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: keyof Translations) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const countryCode = pathname?.split("/")[1] || "fr"
  const initialLocale = getLocaleFromCountry(countryCode)

  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  // Sync with URL changes
  useEffect(() => {
    const newLocale = getLocaleFromCountry(countryCode)
    setLocaleState(newLocale)
  }, [countryCode])

  // Sync with localStorage for persistence
  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null
    if (stored && (stored === "fr" || stored === "en")) {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const t = (key: keyof Translations): string => {
    return translations[locale][key] || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context.t
}

export function useLocale() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useLocale must be used within I18nProvider")
  }
  return context.locale
}

export function useChangeLocale() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useChangeLocale must be used within I18nProvider")
  }
  return context.setLocale
}
