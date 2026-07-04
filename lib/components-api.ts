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

const STAT_NAMES = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
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
                    name: "mega",
                    type: code("boolean"),
                    default: "false",
                    description:
                        "Reemplaza la superficie de tipo por el arcoíris animado del modo Mega.",
                },
            ],
        },
        {
            name: "PokemonCardMedia",
            props: [
                {
                    name: "...props",
                    type: code('React.ComponentProps<"div">'),
                    description:
                        "Slot relativo que posiciona el artwork y ancla los PokemonCardOverlay hijos.",
                },
            ],
        },
        {
            name: "PokemonCardOverlay",
            props: [
                {
                    name: "position",
                    type: enumOf("Position", [
                        "top-left",
                        "top-right",
                        "bottom-left",
                        "bottom-right",
                    ]),
                    default: '"top-left"',
                    description:
                        "Esquina a la que se ancla el overlay. Expuesto como data-position.",
                },
            ],
        },
        {
            name: "PokemonCardNumber",
            props: [
                {
                    name: "...props",
                    type: code('React.ComponentProps<"span">'),
                    description:
                        "Chip del número de Pokédex (p. ej. #025). El formato lo decide el consumidor.",
                },
            ],
        },
        {
            name: "PokemonCardHeader",
            props: [
                {
                    name: "...props",
                    type: code('React.ComponentProps<"div">'),
                    description:
                        "Banda blanca del nombre; ajusta su grid cuando hay Action o Description.",
                },
            ],
        },
        {
            name: "PokemonCardTitle",
            props: [
                {
                    name: "...props",
                    type: code('React.ComponentProps<"h3">'),
                    description: "Título de la tarjeta, renderizado como <h3>.",
                },
            ],
        },
        {
            name: "PokemonCardDescription",
            props: [
                {
                    name: "...props",
                    type: code('React.ComponentProps<"p">'),
                    description: "Texto de apoyo en tono muted.",
                },
            ],
        },
        {
            name: "PokemonCardContent",
            props: [
                {
                    name: "...props",
                    type: code('React.ComponentProps<"div">'),
                    description: "Slot de contenido libre de la tarjeta.",
                },
            ],
        },
        {
            name: "PokemonCardFooter",
            props: [
                {
                    name: "...props",
                    type: code('React.ComponentProps<"div">'),
                    description: "Banda inferior, con el mismo tratamiento que el header.",
                },
            ],
        },
        {
            name: "PokemonCardAction",
            props: [
                {
                    name: "...props",
                    type: code('React.ComponentProps<"div">'),
                    description:
                        "Slot de acción alineado a la derecha dentro del header.",
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
    "pokemon-stat": [
        {
            name: "PokemonStat",
            props: [
                {
                    name: "stat",
                    type: enumOf("PokemonStatName", STAT_NAMES),
                    description:
                        "Stat conocido: autocompleta label y color. Expuesto como data-stat.",
                },
                {
                    name: "value",
                    type: code("number"),
                    description: "Valor base del stat (requerido).",
                },
                {
                    name: "max",
                    type: code("number"),
                    default: "255",
                    description:
                        "Escala contra la que se calcula el llenado de la barra (POKEMON_STAT_MAX).",
                },
                {
                    name: "label",
                    type: code("string"),
                    default: "nombre del stat",
                    description: "Sobreescribe la etiqueta visible.",
                },
                {
                    name: "color",
                    type: code("string"),
                    default: "color del stat / --primary",
                    description:
                        "Sobreescribe el color de la barra. Se expone como --stat-color.",
                },
            ],
        },
        {
            name: "PokemonStatBar",
            props: [
                {
                    name: "...props",
                    type: code("React.ComponentProps<typeof Progress>"),
                    description:
                        "Es el Progress de shadcn recoloreado por stat; acepta todas sus props. value, aria-labelledby y aria-valuetext los aporta el contexto.",
                },
            ],
        },
        {
            name: "PokemonStatList",
            props: [
                {
                    name: "stats",
                    type: code("PokemonStatsInput"),
                    description:
                        "Datos a renderizar: array de PokemonStatEntry o record { stat: value } (ordenado por POKEMON_STAT_ORDER).",
                },
                {
                    name: "children",
                    type: fn(
                        "((entry: PokemonStatEntry, index: number) => React.ReactNode) | React.ReactNode",
                    ),
                    description:
                        "Render prop: recibe cada entry y devuelve su fila. Pasa un nodo normal para componer <PokemonStat> a mano.",
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
