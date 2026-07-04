import dynamic from "next/dynamic"
import type { ComponentType } from "react"

/** Registro explícito de demos: slug → componente cargado on-demand.
 *
 * Para añadir un demo: crea `components/demo/<slug>.tsx` con `export default`
 * y registra una línea aquí. El `slug` debe coincidir con el de
 * `lib/components-registry.ts`. */
export const demoComponents: Record<string, ComponentType> = {
    pokedex: dynamic(() => import("@/components/demo/pokedex")),
    "pokedex-grid": dynamic(() => import("@/components/demo/pokedex-grid")),
    "pokedex-empty": dynamic(() => import("@/components/demo/pokedex-empty")),
    "pokedex-count": dynamic(() => import("@/components/demo/pokedex-count")),
    "pokemon-badge": dynamic(() => import("@/components/demo/pokemon-badge")),
    "pokemon-badge-variants": dynamic(
        () => import("@/components/demo/pokemon-badge-variants"),
    ),
    "pokemon-badge-variants-type": dynamic(
        () => import("@/components/demo/pokemon-badge-variants-type"),
    ),
    "pokemon-badge-as-link": dynamic(
        () => import("@/components/demo/pokemon-badge-as-link"),
    ),
    "pokemon-badge-with-tooltip": dynamic(
        () => import("@/components/demo/pokemon-badge-with-tooltip"),
    ),
    "pokemon-card": dynamic(() => import("@/components/demo/pokemon-card")),
    "pokemon-card-dual": dynamic(
        () => import("@/components/demo/pokemon-card-dual"),
    ),
    "pokemon-card-sprite": dynamic(
        () => import("@/components/demo/pokemon-card-sprite"),
    ),
    "pokemon-card-badges": dynamic(
        () => import("@/components/demo/pokemon-card-badges"),
    ),
    "pokemon-card-mega": dynamic(
        () => import("@/components/demo/pokemon-card-mega"),
    ),
    "pokemon-card-sm": dynamic(
        () => import("@/components/demo/pokemon-card-sm"),
    ),
    "pokemon-stat": dynamic(() => import("@/components/demo/pokemon-stat")),
    "pokemon-sprite": dynamic(() => import("@/components/demo/pokemon-sprite")),
    "pokemon-sprite-group": dynamic(
        () => import("@/components/demo/pokemon-sprite-group"),
    ),
}

export function getDemoComponent(slug: string): ComponentType | undefined {
    return demoComponents[slug]
}
