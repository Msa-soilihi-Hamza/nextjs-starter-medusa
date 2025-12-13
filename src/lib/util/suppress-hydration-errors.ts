/**
 * Suppresses hydration errors caused by browser translation
 * This allows users to translate the page with their browser
 * without breaking the React hydration
 */
export function suppressHydrationErrors() {
  if (typeof window === "undefined") return

  // Store original console methods
  const originalError = console.error
  const originalWarn = console.warn

  // Filter out hydration errors
  console.error = (...args: any[]) => {
    const errorMessage = args[0]?.toString() || ""

    // Skip hydration-related errors
    if (
      errorMessage.includes("Hydration failed") ||
      errorMessage.includes("There was an error while hydrating") ||
      errorMessage.includes("Text content does not match") ||
      errorMessage.includes("removeChild") ||
      errorMessage.includes("Minified React error") ||
      errorMessage.includes("hydrating")
    ) {
      return
    }

    // Log all other errors normally
    originalError.apply(console, args)
  }

  console.warn = (...args: any[]) => {
    const warnMessage = args[0]?.toString() || ""

    // Skip hydration warnings
    if (
      warnMessage.includes("Prop `") ||
      warnMessage.includes("did not match") ||
      warnMessage.includes("Expected server HTML")
    ) {
      return
    }

    // Log all other warnings normally
    originalWarn.apply(console, args)
  }
}
