"use client"

import * as React from "react"
import { ChevronRight, List } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { TocEntry } from "@/lib/toc"

function useActiveItem(itemIds: string[]) {
    const [activeId, setActiveId] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (itemIds.length === 0) {
            return
        }

        // Track which headings are currently inside the active band and always
        // pick the first one in document order, so overlapping headings don't
        // fight over the active state.
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

        // The active band is only the top 20% of the viewport, so the last
        // heading can never reach it (there isn't enough room to scroll it up).
        // When the page is scrolled to the bottom, force the last heading active
        // so no item is ever left unmarked.
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

function useScrollProgress() {
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

function ScrollProgressRing({
    progress,
    className,
}: {
    progress: number
    className?: string
}) {
    const radius = 7
    const circumference = 2 * Math.PI * radius

    return (
        <svg
            viewBox="0 0 18 18"
            className={cn("size-4 shrink-0 -rotate-90", className)}
            aria-hidden="true"
        >
            <circle
                cx="9"
                cy="9"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-20"
            />
            <circle
                cx="9"
                cy="9"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                className="text-foreground transition-[stroke-dashoffset] duration-150 ease-out"
            />
        </svg>
    )
}

export function DocsTableOfContents({
    toc,
    variant = "list",
    className,
}: {
    toc: TocEntry[]
    variant?: "dropdown" | "list" | "floating"
    className?: string
}) {
    const [open, setOpen] = React.useState(false)
    const itemIds = React.useMemo(
        () => toc.map((item) => item.url.replace("#", "")),
        [toc],
    )
    const activeHeading = useActiveItem(itemIds)
    const scrollProgress = useScrollProgress()

    if (!toc?.length) {
        return null
    }

    if (variant === "floating") {
        const activeTitle =
            toc.find((item) => item.url === `#${activeHeading}`)?.title ??
            "On This Page"

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <div
                    className={cn(
                        "sticky top-(--header-height) z-20 border-b bg-background ",
                        className,
                    )}
                >
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className="group flex h-10 w-full items-center gap-2 px-4 text-sm font-medium text-muted-foreground"
                        >
                            <ScrollProgressRing progress={scrollProgress} />
                            <span className="truncate text-foreground">
                                {activeTitle}
                            </span>
                            <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </button>
                    </PopoverTrigger>
                </div>
                <PopoverContent
                    align="start"
                    sideOffset={0}
                    className="no-scrollbar max-h-[60svh] w-[var(--radix-popover-trigger-width)] gap-2 overflow-y-auto bg-background p-4 text-sm ring-0 border-b border-dashed"
                >
                    {toc.map((item) => (
                        <a
                            key={item.url}
                            href={item.url}
                            onClick={() => setOpen(false)}
                            className="text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6"
                            data-active={item.url === `#${activeHeading}`}
                            data-depth={item.depth}
                        >
                            {item.title}
                        </a>
                    ))}
                </PopoverContent>
            </Popover>
        )
    }
    
    if (variant === "dropdown") {
        return (
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn("h-8 md:h-7", className)}
                    >
                        <List /> On This Page
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    className="no-scrollbar max-h-[70svh]"
                >
                    {toc.map((item) => (
                        <DropdownMenuItem
                            key={item.url}
                            asChild
                            onClick={() => {
                                setOpen(false)
                            }}
                            data-depth={item.depth}
                            className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
                        >
                            <a href={item.url}>{item.title}</a>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <div className={cn("flex flex-col gap-2 text-sm", className)}>
            {toc.map((item) => (
                <a
                    key={item.url}
                    href={item.url}
                    className="text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6"
                    data-active={item.url === `#${activeHeading}`}
                    data-depth={item.depth}
                >
                    {item.title}
                </a>
            ))}
        </div>
    )
}
