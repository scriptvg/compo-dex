import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getDocNav } from "@/lib/docs-nav"

/** Flechas prev/next en la cabecera (esquina superior derecha), estilo shadcn. */
export function DocsHeaderNav({
    href,
    className,
}: {
    href: string
    className?: string
}) {
    const { prev, next } = getDocNav(href)

    return (
        <div className={cn("flex items-center gap-1.5", className)}>
            {prev ? (
                <Button variant="outline" size="icon-sm" asChild>
                    <Link href={prev.href} aria-label={`Anterior: ${prev.name}`}>
                        <ArrowLeft />
                    </Link>
                </Button>
            ) : (
                <Button variant="outline" size="icon-sm" disabled aria-label="Anterior">
                    <ArrowLeft />
                </Button>
            )}

            {next ? (
                <Button variant="outline" size="icon-sm" asChild>
                    <Link href={next.href} aria-label={`Siguiente: ${next.name}`}>
                        <ArrowRight />
                    </Link>
                </Button>
            ) : (
                <Button variant="outline" size="icon-sm" disabled aria-label="Siguiente">
                    <ArrowRight />
                </Button>
            )}
        </div>
    )
}
