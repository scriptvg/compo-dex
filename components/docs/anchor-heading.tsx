import { Hash } from "lucide-react"

import { cn } from "@/lib/utils"

type AnchorHeadingProps = React.ComponentProps<"h2"> & {
    level: 2 | 3 | 4
}

/** Heading con auto-link `#` que aparece al hover. El `id` lo inyecta
 * rehype-slug (en MDX) o se pasa a mano (en páginas TSX). */
export function AnchorHeading({
    level,
    id,
    className,
    children,
    ...props
}: AnchorHeadingProps) {
    const Tag = `h${level}` as "h2" | "h3" | "h4"

    return (
        <Tag
            id={id}
            className={cn(
                "group/heading flex scroll-m-24 items-center gap-2",
                className,
            )}
            {...props}
        >
            {children}
            {id ? (
                <a
                    href={`#${id}`}
                    aria-label="Link to section"
                    className="text-muted-foreground opacity-0 transition-opacity group-hover/heading:opacity-100"
                >
                    <Hash className="size-4" />
                </a>
            ) : null}
        </Tag>
    )
}
