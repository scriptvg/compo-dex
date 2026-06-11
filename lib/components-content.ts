import "server-only"

import type { ComponentType } from "react"

import type { DocFrontmatter } from "@/lib/docs-content"

export type ComponentModule = {
    default: ComponentType
    frontmatter?: DocFrontmatter
}

/** Carga del MDX de cada componente documentado. Imports estáticos
 * (bundler-friendly); añade una línea al crear content/docs/components/<slug>.mdx.
 *
 * Solo de servidor: el MDX arrastra ComponentPreview → get-file (fs). */
export const componentLoaders: Record<
    string,
    () => Promise<ComponentModule>
> = {
    pokedex: () => import("@/content/docs/components/pokedex.mdx"),
    "pokemon-badge": () => import("@/content/docs/components/pokemon-badge.mdx"),
    "pokemon-card": () => import("@/content/docs/components/pokemon-card.mdx"),
    "pokemon-sprite": () =>
        import("@/content/docs/components/pokemon-sprite.mdx"),
}
