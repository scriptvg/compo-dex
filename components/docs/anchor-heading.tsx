import { Hash } from "lucide-react"

import { cn } from "@/lib/utils"

type AnchorHeadingProps = React.ComponentProps<"h2"> & {
    level: 2 | 3 | 4
}

/** Heading enlazable: tanto el texto como el `#` (visible al hover) redirigen
 * a la sección. Un único `<a>` envuelve ambos para no anidar anchors. El `id`
 * lo inyecta rehype-slug (en MDX) o se pasa a mano (en páginas TSX). */
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
            className={cn("group/heading scroll-m-24", className)}
            {...props}
        >
            {id ? (
                <a
                    href={`#${id}`}
                    className="flex w-fit items-center gap-2 text-inherit no-underline hover:underline underline-offset-4"
                >
                    {children}
                    <Hash
                        aria-hidden
                        className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover/heading:opacity-100"
                    />
                </a>
            ) : (
                children
            )}
        </Tag>
    )
}
