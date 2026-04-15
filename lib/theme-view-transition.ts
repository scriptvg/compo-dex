"use client"

import { flushSync } from "react-dom"

type ThemeName = "light" | "dark"

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

export function setThemeWithViewTransition(
  nextTheme: ThemeName,
  setTheme: (theme: string) => void,
) {
  if (typeof document === "undefined") {
    setTheme(nextTheme)
    return
  }

  if (prefersReducedMotion()) {
    setTheme(nextTheme)
    return
  }

  const doc = document as unknown as {
    startViewTransition?: (cb: () => void) => void
  }

  if (!doc.startViewTransition) {
    setTheme(nextTheme)
    return
  }

  // Must be invoked with `document` as receiver (avoid "Illegal invocation")
  doc.startViewTransition(() => {
    flushSync(() => {
      setTheme(nextTheme)
    })
  })
}

export function toggleThemeWithViewTransition(
  resolvedTheme: string | undefined,
  setTheme: (theme: string) => void,
) {
  const nextTheme: ThemeName = resolvedTheme === "dark" ? "light" : "dark"
  setThemeWithViewTransition(nextTheme, setTheme)
}
