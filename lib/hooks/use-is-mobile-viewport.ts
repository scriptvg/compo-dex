"use client"

import * as React from "react"

export function useIsMobileViewport() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1279px)")

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return isMobile
}
