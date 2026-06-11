/** Tipo de una prop en las tablas de API de la documentación. */
export type ApiPropType =
    /** Tipo mostrado como código inline, p. ej. `string`. */
    | { kind: "code"; text: string }
    /** Unión de literales — se renderiza con `EnumType` (tooltip de valores). */
    | { kind: "enum"; name: string; values: readonly string[] }
    /** Función — se muestra como `function` y la firma se revela en el popover. */
    | { kind: "function"; signature: string }

export type ApiProp = {
    name: string
    type: ApiPropType
    /** Valor por defecto; omitir cuando no aplica (se muestra "—"). */
    default?: string
    /** Se revela en un popover ⓘ junto al nombre — la tabla queda limpia. */
    description?: string
}

export type ApiComponent = {
    /** Nombre exacto del export, p. ej. `PokedexSearch`. */
    name: string
    props: ApiProp[]
}

const code = (text: string): ApiPropType => ({ kind: "code", text })
const enumOf = (name: string, values: readonly string[]): ApiPropType => ({
    kind: "enum",
    name,
    values,
})
const fn = (signature: string): ApiPropType => ({
    kind: "function",
    signature,
})

const POKEMON_TYPES = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
    "stellar",
    "unknown",
    "shadow",
] as const

const BUTTON_VARIANTS = [
    "default",
    "outline",
    "secondary",
    "ghost",
    "destructive",
    "link",
] as const

const BUTTON_SIZES = [
    "default",
    "xs",
    "sm",
    "lg",
    "icon",
    "icon-xs",
    "icon-sm",
    "icon-lg",
] as const

/** Única fuente de verdad de las tablas de props de la documentación.
 * Clave: slug del componente documentado → lista de componentes con sus props.
 * Las páginas MDX las renderizan con `<PropsTable of="<slug>" component="<Name>" />`. */
export const componentsApi: Record<string, ApiComponent[]> = {
    "pokemon-badge": [
        {
            name: "PokemonBadgeType",
            props: [
                {
                    name: "type",
                    type: enumOf("PokemonBadgeType", POKEMON_TYPES),
                    default: '"normal"',
                    description:
                        "Tipo elemental: define el color de la insignia vía los tokens --color-type-*. Expuesto como data-type.",
                },
                {
                    name: "variant",
                    type: enumOf("Variant", ["solid", "soft", "outline", "ghost"]),
                    default: '"solid"',
                    description:
                        "Tratamiento visual; todas las variantes derivan del color del tipo. Expuesto como data-variant.",
                },
                {
                    name: "asChild",
                    type: code("boolean"),
                    default: "false",
                    description: "Fusiona props con el hijo inmediato.",
                },
            ],
        },
    ],
    "pokemon-card": [
        {
            name: "PokemonCard",
            props: [
                {
                    name: "type",
                    type: enumOf("PokemonBadgeType", POKEMON_TYPES),
                    default: '"normal"',
                    description: "Tipo principal: tiñe el fondo de la tarjeta.",
                },
                {
                    name: "secondary",
                    type: enumOf("PokemonBadgeType", POKEMON_TYPES),
                    description:
                        "Tipo secundario: activa el fondo degradado dual entre ambos tipos.",
                },
                {
                    name: "size",
                    type: enumOf("Size", ["default", "sm"]),
                    default: '"default"',
                    description: "Densidad de la tarjeta. Expuesto como data-size.",
                },
                {
                    name: "isMega",
                    type: code("boolean"),
                    default: "false",
                    description: "Activa el borde animado del modo Mega.",
                },
            ],
        },
    ],
    "pokemon-sprite": [
        {
            name: "PokemonSprite",
            props: [
                {
                    name: "size",
                    type: enumOf("Size", ["default", "sm", "lg"]),
                    default: '"default"',
                    description:
                        "Tamaño del sprite; los subcomponentes se escalan con él. Expuesto como data-size.",
                },
            ],
        },
    ],
    pokedex: [
        {
            name: "Pokedex",
            props: [
                {
                    name: "items",
                    type: code("T[]"),
                    default: "[]",
                    description:
                        "Los datos a renderizar. El root nunca hace fetching.",
                },
                {
                    name: "getItemKey",
                    type: fn("(item: T, index: number) => React.Key"),
                    default: "item.name ?? index",
                    description: "Key estable por item.",
                },
                {
                    name: "getItemName",
                    type: fn("(item: T) => string"),
                    default: "item.name",
                    description: "Nombre usado por el matcher por defecto.",
                },
                {
                    name: "query",
                    type: code("string"),
                    description: "Query controlada.",
                },
                {
                    name: "defaultQuery",
                    type: code("string"),
                    default: '""',
                    description: "Query inicial (modo no controlado).",
                },
                {
                    name: "onQueryChange",
                    type: fn("(query: string) => void"),
                    description: "Notifica cambios de la query.",
                },
                {
                    name: "filters",
                    type: code("PokedexFilterState"),
                    description: "Filtros controlados.",
                },
                {
                    name: "defaultFilters",
                    type: code("PokedexFilterState"),
                    default: "EMPTY_POKEDEX_FILTERS",
                    description: "Filtros iniciales (modo no controlado).",
                },
                {
                    name: "onFiltersChange",
                    type: fn("(filters: PokedexFilterState) => void"),
                    description: "Notifica cambios de filtros.",
                },
                {
                    name: "shouldFilter",
                    type: code("boolean"),
                    default: "true",
                    description:
                        "Desactívalo cuando los items ya llegan filtrados (server-side).",
                },
                {
                    name: "filterFn",
                    type: fn(
                        "(item: T, query: string, filters: PokedexFilterState) => boolean",
                    ),
                    default: "matcher por query",
                    description:
                        "Decide si un item coincide con la query + filtros actuales.",
                },
                {
                    name: "pageSize",
                    type: code("number"),
                    description:
                        "Activa paginación incremental con esta ventana. Se resetea al cambiar query o filtros.",
                },
                {
                    name: "loading",
                    type: code("boolean"),
                    default: "false",
                    description:
                        "Se expone por contexto y como data-loading; oculta PokedexEmpty mientras es true.",
                },
                {
                    name: "asChild",
                    type: code("boolean"),
                    default: "false",
                    description: "Fusiona props con el hijo inmediato.",
                },
            ],
        },
        {
            name: "PokedexSearch",
            props: [
                {
                    name: "placeholder",
                    type: code("string"),
                    default: '"Buscar Pokémon…"',
                },
                {
                    name: "onChange",
                    type: fn("(event: React.ChangeEvent<HTMLInputElement>) => void"),
                    description:
                        "Se compone con el binding interno; event.preventDefault() evita actualizar la query.",
                },
            ],
        },
        {
            name: "PokedexClear",
            props: [
                {
                    name: "clears",
                    type: enumOf("Clears", ["query", "filters", "all"]),
                    default: '"all"',
                    description:
                        "Qué resetea: la query, los filtros o ambos. Expuesto como data-clears.",
                },
                {
                    name: "variant",
                    type: enumOf("Variant", BUTTON_VARIANTS),
                    default: '"outline"',
                },
                {
                    name: "size",
                    type: enumOf("Size", BUTTON_SIZES),
                    default: '"sm"',
                },
            ],
        },
        {
            name: "PokedexItems",
            props: [
                {
                    name: "renderItem",
                    type: fn("(item: T, index: number) => React.ReactNode"),
                    description:
                        "Render de cada item. Sin él, renderiza children tal cual.",
                },
                {
                    name: "className",
                    type: code("string"),
                    default: "grid responsive 1→5 col",
                    description:
                        "Layout de la colección; cualquier alternativa (lista, tabla) sobreescribiendo las clases.",
                },
                {
                    name: "asChild",
                    type: code("boolean"),
                    default: "false",
                    description: "Fusiona props con el hijo inmediato.",
                },
            ],
        },
        {
            name: "PokedexLoadMore",
            props: [
                {
                    name: "children",
                    type: code("ReactNode"),
                    default: '"Load more" / "No more"',
                    description: "Contenido del botón; el default cambia según hasMore.",
                },
                {
                    name: "variant",
                    type: enumOf("Variant", BUTTON_VARIANTS),
                    default: '"default"',
                },
                {
                    name: "size",
                    type: enumOf("Size", BUTTON_SIZES),
                    default: '"default"',
                },
            ],
        },
        {
            name: "PokedexCount",
            props: [
                {
                    name: "children",
                    type: fn(
                        "(counts: { visible: number; matched: number; total: number }) => React.ReactNode",
                    ),
                    default: "visible / matched",
                    description: "Render-prop para formatear el conteo.",
                },
                {
                    name: "asChild",
                    type: code("boolean"),
                    default: "false",
                    description: "Fusiona props con el hijo inmediato.",
                },
            ],
        },
    ],
}

export function getComponentApi(
    slug: string,
    component: string,
): ApiComponent | undefined {
    return componentsApi[slug]?.find((c) => c.name === component)
}
