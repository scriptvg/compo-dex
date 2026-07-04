"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TocItem } from "@/components/ui/toc-item"
import type { TocEntry } from "@/lib/toc"

interface ScrollProgressRingProps extends React.SVGAttributes<SVGSVGElement> {
  progress: number
}

function ScrollProgressRing({ progress, className, ...props }: ScrollProgressRingProps) {
  const radius = 7
  const circumference = 2 * Math.PI * radius

  return (
    <svg
      viewBox="0 0 18 18"
      className={cn("size-4 shrink-0 -rotate-90", className)}
      aria-hidden="true"
      {...props}
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

interface TocFloatingProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TocEntry[]
  activeId: string | null
  scrollProgress: number
}

export const TocFloating = React.forwardRef<HTMLDivElement, TocFloatingProps>(
  ({ items, activeId, scrollProgress, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)

    const activeTitle =
      items.find((item) => item.url === `#${activeId}`)?.title ??
      "On This Page"

    return (
      <div
        ref={ref}
        className={cn(
          "sticky top-(--header-height) z-20 border-b bg-background",
          className,
        )}
        {...props}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="group flex h-10 w-full items-center gap-2 px-4 text-sm font-medium text-muted-foreground"
            >
              <ScrollProgressRing progress={scrollProgress} />
              <span className="truncate text-foreground">{activeTitle}</span>
              <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={0}
            className="no-scrollbar max-h-[60svh] w-[var(--radix-popover-trigger-width)] gap-2 overflow-y-auto bg-background p-4 text-sm ring-0 border-b border-dashed"
          >
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <TocItem
                  key={item.url}
                  title={item.title}
                  url={item.url}
                  depth={item.depth}
                  isActive={item.url === `#${activeId}`}
                  onClick={() => setOpen(false)}
                  className="text-[0.8rem]"
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)
TocFloating.displayName = "TocFloating"
