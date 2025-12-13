"use client"

import { useI18n, useChangeLocale, useLocale } from "@lib/i18n/context"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"

export function NavAccountLink() {
  const t = useI18n()

  return (
    <LocalizedClientLink
      className="hover:text-ui-fg-base"
      href="/account"
      data-testid="nav-account-link"
    >
      {t("nav.account")}
    </LocalizedClientLink>
  )
}

export function NavCartFallback() {
  const t = useI18n()

  return (
    <LocalizedClientLink
      className="hover:text-ui-fg-base flex gap-2"
      href="/cart"
      data-testid="nav-cart-link"
    >
      {t("nav.cart")} (0)
    </LocalizedClientLink>
  )
}

export function NavLanguageSwitcher() {
  const changeLocale = useChangeLocale()
  const currentLocale = useLocale()
  const t = useI18n()

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLocale("fr")}
        className={clx(
          "text-sm transition-colors hover:text-ui-fg-base",
          currentLocale === "fr"
            ? "text-ui-fg-base font-semibold"
            : "text-ui-fg-subtle"
        )}
        aria-label={t("lang.french")}
      >
        FR
      </button>
      <span className="text-ui-fg-subtle">|</span>
      <button
        onClick={() => changeLocale("en")}
        className={clx(
          "text-sm transition-colors hover:text-ui-fg-base",
          currentLocale === "en"
            ? "text-ui-fg-base font-semibold"
            : "text-ui-fg-subtle"
        )}
        aria-label={t("lang.english")}
      >
        EN
      </button>
    </div>
  )
}
