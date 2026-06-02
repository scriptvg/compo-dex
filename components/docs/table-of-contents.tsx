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
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                }
            },
            { rootMargin: "0% 0% -80% 0%" },
        )

        for (const id of itemIds ?? []) {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        }

        return () => {
            for (const id of itemIds ?? []) {
                const element = document.getElementById(id)
                if (element) {
                    observer.unobserve(element)
                }
            }
        }
    }, [itemIds])

    return activeId
}

function useScrollSentinel() {
    const [isAtTop, setIsAtTop] = React.useState(true)
    const sentinelRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsAtTop(entry.isIntersecting)
            },
            { threshold: 0 },
        )

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [])

    return { isAtTop, sentinelRef }
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
    const { isAtTop, sentinelRef } = useScrollSentinel()

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
                        "sticky top-(--header-height) z-20 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                        className,
                    )}
                >
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className="group flex h-10 w-full items-center gap-2 px-4 text-sm font-medium text-muted-foreground"
                        >
                            <List className="size-4 shrink-0" />
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
                    className="no-scrollbar max-h-[60svh] w-[var(--radix-popover-trigger-width)] gap-2 overflow-y-auto"
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
        <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
            <p className="sticky top-0 h-6 bg-background text-xs font-medium text-muted-foreground">
                On This Page
            </p>
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
