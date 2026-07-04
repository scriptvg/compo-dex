import * as React from "react"
import { cn } from "@/lib/utils"
import { TocItem } from "@/components/ui/toc-item"
import type { TocEntry } from "@/lib/toc"

interface TocListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TocEntry[]
  activeId: string | null
  onItemClick?: (url: string) => void
}

export const TocList = React.forwardRef<HTMLDivElement, TocListProps>(
  ({ items, activeId, onItemClick, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2 text-sm -mx-4 px-4", className)}
      {...props}
    >
      {items.map((item) => (
        <TocItem
          key={item.url}
          title={item.title}
          url={item.url}
          depth={item.depth}
          isActive={item.url === `#${activeId}`}
          onClick={() => onItemClick?.(item.url)}
        />
      ))}
    </div>
  ),
)
TocList.displayName = "TocList"
