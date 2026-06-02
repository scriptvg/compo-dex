import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getComponentsByCategory } from "@/lib/components-registry"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Components",
    description: "Catálogo de componentes y bloques de compodex.",
}

const SECTIONS = [
    {
        label: "Components",
        description: "Primitivos de UI con temática Pokémon.",
        items: getComponentsByCategory("component"),
    },
    {
        label: "Blocks",
        description: "Bloques compuestos listos para usar.",
        items: getComponentsByCategory("block"),
    },
]

export default function ComponentsPage() {
    return (
        <div className="flex w-full min-w-0 max-w-4xl flex-col gap-8 py-2">
            <header className="flex flex-col gap-3 border-b border-dashed pb-6">
                <h1 className="text-3xl font-bold">Components</h1>
                <p className="text-base text-muted-foreground">
                    Catálogo de componentes y bloques. Cada uno incluye preview en
                    vivo y su código fuente.
                </p>
            </header>

            {SECTIONS.map((section) => (
                <section key={section.label} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold">{section.label}</h2>
                        <p className="text-sm text-muted-foreground">
                            {section.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {section.items.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/docs/components/${item.slug}`}
                                className="group flex flex-col gap-2 border border-dashed p-4 transition-colors hover:border-solid hover:bg-accent"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-medium">{item.name}</span>
                                    <div className="flex items-center gap-2">
                                        {item.status && item.status !== "stable" ? (
                                            <Badge variant="secondary">
                                                {item.status}
                                            </Badge>
                                        ) : null}
                                        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                                    </div>
                                </div>
                                {item.description ? (
                                    <p className="text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                ) : null}
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
