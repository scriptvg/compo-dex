import * as React from "react"
import { cn } from "@/lib/utils"

interface TocItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string
  url: string
  depth: number
  isActive: boolean
}

export const TocItem = React.forwardRef<HTMLAnchorElement, TocItemProps>(
  ({ title, url, depth, isActive, className, ...props }, ref) => (
    <a
      ref={ref}
      href={url}
      className={cn(
        "border-l-3 border-transparent transition-colors px-2 -mx-2 -ml-4 text-[0.8rem] text-muted-foreground no-underline hover:text-foreground",
        "data-[active=true]:border-primary data-[active=true]:font-medium data-[active=true]:text-foreground",
        "data-[depth='3']:pl-4 data-[depth='4']:pl-6",
        className,
      )}
      data-active={isActive}
      data-depth={depth}
      {...props}
    >
      {title}
    </a>
  ),
)
TocItem.displayName = "TocItem"
