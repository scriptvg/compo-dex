import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { getDocNav } from "@/lib/docs-nav"

export function DocsPager({
    href,
    className,
}: {
    href: string
    className?: string
}) {
    const { prev, next } = getDocNav(href)

    if (!prev && !next) {
        return null
    }

    return (
        <div
            className={cn(
                "flex items-center justify-between gap-4 border-t border-dashed pt-6",
                className,
            )}
        >
            {prev ? (
                <Link
                    href={prev.href}
                    className="group inline-flex flex-col gap-1 text-sm"
                >
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        Previous
                    </span>
                    <span className="font-medium">{prev.name}</span>
                </Link>
            ) : (
                <span />
            )}

            {next ? (
                <Link
                    href={next.href}
                    className="group inline-flex flex-col items-end gap-1 text-right text-sm"
                >
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        Next
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="font-medium">{next.name}</span>
                </Link>
            ) : (
                <span />
            )}
        </div>
    )
}
