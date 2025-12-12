"use client"

import { createContext, useContext } from "react"
import type { Dictionary } from "./get-dictionary"

const I18nContext = createContext<Dictionary | null>(null)

export function I18nProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary
  children: React.ReactNode
}) {
  return (
    <I18nContext.Provider value={dictionary}>{children}</I18nContext.Provider>
  )
}

export function useTranslations() {
  const dictionary = useContext(I18nContext)

  if (!dictionary) {
    throw new Error("useTranslations must be used within I18nProvider")
  }

  return dictionary
}

export function useT(namespace?: keyof Dictionary) {
  const dictionary = useTranslations()

  if (namespace) {
    return dictionary[namespace]
  }

  return dictionary
}
