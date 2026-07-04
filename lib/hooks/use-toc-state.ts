"use client"

import * as React from "react"
import type { TocEntry } from "@/lib/toc"

export function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (itemIds.length === 0) {
      return
    }

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }

        const firstVisible = itemIds.find((id) => visible.has(id))
        if (firstVisible) {
          setActiveId(firstVisible)
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    )

    const elements = itemIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    for (const element of elements) {
      observer.observe(element)
    }

    const onScroll = () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (reachedBottom) {
        setActiveId(itemIds[itemIds.length - 1])
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [itemIds])

  return activeId
}

export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(
        docHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / docHeight))
          : 0,
      )
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return progress
}

export function useTocState(toc: TocEntry[]) {
  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  )
  const activeHeading = useActiveItem(itemIds)
  const scrollProgress = useScrollProgress()

  return {
    activeHeading,
    scrollProgress,
  }
}
