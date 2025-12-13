"use client"

import { useEffect } from "react"
import { suppressHydrationErrors } from "@lib/util/suppress-hydration-errors"

/**
 * Component that suppresses hydration errors in the browser
 * This allows browser translation to work without console errors
 */
export function ErrorSuppressor() {
  useEffect(() => {
    suppressHydrationErrors()
  }, [])

  return null
}
