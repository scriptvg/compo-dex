import "server-only"

import type { ComponentType } from "react"

/** Carga del MDX de cada componente documentado. Imports estáticos
 * (bundler-friendly); añade una línea al crear content/docs/components/<slug>.mdx.
 *
 * Solo de servidor: el MDX arrastra ComponentPreview → get-file (fs). */
export const componentLoaders: Record<
    string,
    () => Promise<{ default: ComponentType }>
> = {
    "pokemon-badge": () => import("@/content/docs/components/pokemon-badge.mdx"),
    "pokemon-card": () => import("@/content/docs/components/pokemon-card.mdx"),
    "pokemon-sprite": () =>
        import("@/content/docs/components/pokemon-sprite.mdx"),
}
