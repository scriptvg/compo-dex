export type ComponentCategory = "component" | "block"

export type ComponentStatus = "stable" | "beta" | "planned"

export type ComponentDoc = {
    /** URL slug under /docs/components/<slug> */
    slug: string
    /** Display name in the sidebar and page heading */
    name: string
    /** Group it belongs to in the sidebar. `component` = primitivos (compodex/ui),
     * `block` = bloques compuestos (compodex/blocks). */
    category: ComponentCategory
    /** Short description shown on the component page. */
    description?: string
    /** List of dependencies required by the component. */
    dependencies?: string[]
    /** Lifecycle status. `planned` = aún no implementado. */
    status?: ComponentStatus
    /** Show the "New" badge in the sidebar. */
    isNew?: boolean
    /** Import de uso mostrado en la sección "Usage" (solo si el componente existe). */
    imports?: { name: string; from: string }
}

/** Single source of truth for documented components. Drives both the docs
 * sidebar (lib/page-tree.ts) and the dynamic route /docs/components/[slug].
 *
 * Para añadir un componente: agrega una entrada aquí y aparecerá tanto en el
 * sidebar como en su ruta — sin tocar nada más. */
export const componentDocs: ComponentDoc[] = [
    // ── Primitivos (compodex/ui) ─────────────────────────────────────────
    {
        slug: "pokedex",
        name: "Pokedex",
        category: "component",
        description:
            "Primitivos controlables para construir Pokédex: búsqueda, filtros de dominio, paginación incremental y renderizado de colecciones.",
        status: "stable",
        isNew: true,
        dependencies: ["radix-ui", "lucide-react"],
        imports: {
            name: "Pokedex",
            from: "@/components/compodex/ui/pokedex",
        },
    },
    {
        slug: "pokemon-badge",
        name: "Pokemon Badge",
        category: "component",
        description: "Insignia de tipo de Pokémon para mostrar el tipo elemental de un Pokémon.",
        status: "stable",
        dependencies: ["class-variance-authority", "radix-ui"],
        imports: {
            name: "PokemonBadgeType",
            from: "@/components/compodex/ui/badge-type",
        },
    },
    {
        slug: "pokemon-card",
        name: "Pokemon Card",
        category: "component",
        description:
            "Tarjeta de presentación con variantes por tipo, gradiente dual y modo mega.",
        status: "stable",
        imports: {
            name: "PokemonCard",
            from: "@/components/compodex/ui/pokemon-card",
        },
    },
    {
        slug: "pokemon-sprite",
        name: "Pokemon Sprite",
        category: "component",
        description: "Sprite del Pokémon con estados de carga y fallback.",
        status: "stable",
        imports: {
            name: "PokemonSprite",
            from: "@/components/compodex/ui/pokemon-sprite",
        },
    },
    {
        slug: "pokemon-type-icon",
        name: "Pokemon Type Icon",
        category: "component",
        description: "Icono individual de un tipo, escalable y accesible.",
        status: "planned",
    },
    {
        slug: "pokemon-stat-bar",
        name: "Pokemon Stat Bar",
        category: "component",
        description: "Barra de estadística (HP, Ataque, Defensa…) con animación.",
        status: "planned",
    },
    {
        slug: "pokemon-number",
        name: "Pokemon Number",
        category: "component",
        description: "Número de la Pokédex Nacional formateado (#0001).",
        status: "planned",
    },
    {
        slug: "pokemon-skeleton",
        name: "Pokemon Skeleton",
        category: "component",
        description: "Placeholder de carga para tarjetas y sprites.",
        status: "planned",
    },

    // ── Bloques compuestos (compodex/blocks) ─────────────────────────────

    {
        slug: "pokedex-filter-menu",
        name: "Pokedex Filter Menu",
        category: "block",
        description:
            "Menú de filtros por generación, tipo primario/secundario y legendarios.",
        status: "stable",
    },
    {
        slug: "pokedex-grid",
        name: "Pokedex Grid",
        category: "block",
        description: "Grid responsive con carga incremental (load more).",
        status: "planned",
    },
    {
        slug: "pokemon-detail-panel",
        name: "Pokemon Detail Panel",
        category: "block",
        description: "Panel de detalle con estadísticas, tipos y sprites.",
        status: "planned",
        isNew: true,
    },
    {
        slug: "pokemon-evolution-chain",
        name: "Pokemon Evolution Chain",
        category: "block",
        description: "Cadena evolutiva interactiva con condiciones de evolución.",
        status: "planned",
    },
    {
        slug: "type-effectiveness-table",
        name: "Type Effectiveness Table",
        category: "block",
        description: "Tabla de efectividad de tipos (debilidades y resistencias).",
        status: "planned",
    },
]

export function getComponentDoc(slug: string): ComponentDoc | undefined {
    return componentDocs.find((c) => c.slug === slug)
}

export function getComponentsByCategory(
    category: ComponentCategory,
): ComponentDoc[] {
    return componentDocs.filter((c) => c.category === category)
}
