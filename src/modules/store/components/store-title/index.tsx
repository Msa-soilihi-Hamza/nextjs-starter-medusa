"use client"

import { useI18n } from "@lib/i18n/context"

export default function StoreTitle() {
  const t = useI18n()

  return (
    <div className="mb-8 text-2xl-semi">
      <h1 data-testid="store-page-title">{t("store.title")}</h1>
    </div>
  )
}
