import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
                "flex items-center justify-between gap-4 px-4 py-4",
                className,
            )}
        >
            {prev ? (
                <Button variant="outline" className="group h-9 px-3" asChild>
                    <Link href={prev.href} aria-label={`Anterior: ${prev.name}`}>
                        <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
                        {prev.name}
                    </Link>
                </Button>
            ) : (
                <span />
            )}

            {next ? (
                <Button variant="outline" className="group h-9 px-3" asChild>
                    <Link href={next.href} aria-label={`Siguiente: ${next.name}`}>
                        {next.name}
                        <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </Button>
            ) : (
                <span />
            )}
        </div>
    )
}
