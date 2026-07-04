"use client"

import * as React from "react"
import { TocList } from "@/components/ui/toc-list"
import { TocFloating } from "@/components/ui/toc-floating"
import { useTocState } from "@/lib/hooks/use-toc-state"
import { useIsMobileViewport } from "@/lib/hooks/use-is-mobile-viewport"
import type { TocEntry } from "@/lib/toc"

interface DocsTableOfContentsProps {
  toc: TocEntry[]
  variant?: "floating" | "list" | "auto"
  className?: string
}

export function DocsTableOfContents({
  toc,
  variant = "auto",
  className,
}: DocsTableOfContentsProps) {
  const isMobile = useIsMobileViewport()
  const { activeHeading, scrollProgress } = useTocState(toc)

  if (!toc?.length) {
    return null
  }

  const resolvedVariant =
    variant === "auto" ? (isMobile ? "floating" : "list") : variant

  if (resolvedVariant === "floating") {
    return (
      <TocFloating
        items={toc}
        activeId={activeHeading}
        scrollProgress={scrollProgress}
        className={className}
      />
    )
  }

  return (
    <TocList
      items={toc}
      activeId={activeHeading}
      className={className}
    />
  )
}
