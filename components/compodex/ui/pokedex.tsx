"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { SearchIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

/* -------------------------------------------------------------------------
 * Pokedex — controllable primitives for Pokedex UIs, composed on shadcn/ui.
 *
 * The root owns search, filter, and pagination state (each one controllable
 * via value/defaultValue/onChange) and exposes it through context — that
 * layer is headless. The visible parts are assembled from shadcn/ui
 * (InputGroup, Button, Empty) so they drop into any shadcn project.
 * Data always comes in through `items`; fetching, caching, and data-aware
 * filtering belong to the consumer app.
 * ----------------------------------------------------------------------- */

/* ----------------------------- Filter state ------------------------------ */

/** Pokedex domain filter shape. Option lists (types, generations) are provided by the app. */
export type PokedexFilterState = {
  /** API generation names, e.g. `generation-i`. */
  generations: string[]
  /** Type names allowed in slot 1 — union (OR). */
  primaryTypes: string[]
  /** Type names allowed in slot 2 — union (OR). */
  secondaryTypes: string[]
  legendaryOnly: boolean
  mythicalOnly: boolean
}

export const EMPTY_POKEDEX_FILTERS: PokedexFilterState = {
  generations: [],
  primaryTypes: [],
  secondaryTypes: [],
  legendaryOnly: false,
  mythicalOnly: false,
}

function toggleInList(list: string[], name: string): string[] {
  return list.includes(name) ? list.filter((n) => n !== name) : [...list, name]
}

/* ------------------------- Controllable state ---------------------------- */

function useControllableState<V>(
  value: V | undefined,
  defaultValue: V,
  onChange?: (next: V) => void
) {
  const [internal, setInternal] = React.useState<V>(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? (value as V) : internal

  // Latest-value refs, synced outside render (Radix's useCallbackRef pattern).
  const currentRef = React.useRef(current)
  const onChangeRef = React.useRef(onChange)
  React.useInsertionEffect(() => {
    currentRef.current = current
    onChangeRef.current = onChange
  })

  const setValue = React.useCallback(
    (next: V | ((prev: V) => V)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: V) => V)(currentRef.current)
          : next
      if (Object.is(resolved, currentRef.current)) return
      currentRef.current = resolved
      if (!isControlled) setInternal(resolved)
      onChangeRef.current?.(resolved)
    },
    [isControlled]
  )

  return [current, setValue] as const
}

/* -------------------------------- Context -------------------------------- */

export type PokedexContextValue<T> = {
  /** All items, as provided. */
  items: T[]
  /** Items after `filterFn` (or `items` when `shouldFilter` is false). */
  matchedItems: T[]
  /** Matched items capped by the current pagination window. */
  visibleItems: T[]
  getItemKey: (item: T, index: number) => React.Key
  // search
  query: string
  /** Trimmed + lowercased query, for matching. */
  queryNormalized: string
  setQuery: (query: string) => void
  // filters
  filters: PokedexFilterState
  setFilters: (
    filters:
      | PokedexFilterState
      | ((prev: PokedexFilterState) => PokedexFilterState)
  ) => void
  toggleGeneration: (name: string) => void
  /** Replaces the generation selection (e.g. single-choice radio). */
  setGenerations: (names: string[]) => void
  togglePrimaryType: (name: string) => void
  toggleSecondaryType: (name: string) => void
  setLegendaryOnly: (value: boolean) => void
  setMythicalOnly: (value: boolean) => void
  clearFilters: () => void
  hasActiveFilters: boolean
  // pagination
  /** `null` when pagination is disabled (no `pageSize`). */
  pageSize: number | null
  visibleCount: number
  hasMore: boolean
  loadMore: () => void
  // status
  loading: boolean
}

const PokedexContext = React.createContext<PokedexContextValue<unknown> | null>(
  null
)

export function usePokedex<T = unknown>(): PokedexContextValue<T> {
  const ctx = React.useContext(PokedexContext)
  if (!ctx) {
    throw new Error("usePokedex must be used within <Pokedex>")
  }
  return ctx as unknown as PokedexContextValue<T>
}

/* --------------------------------- Root ---------------------------------- */

function defaultGetItemName(item: unknown): string {
  const name = (item as { name?: unknown } | null)?.name
  return typeof name === "string" ? name : ""
}

export type PokedexProps<T> = Omit<
  React.ComponentProps<"div">,
  "defaultValue"
> & {
  asChild?: boolean
  /** The data to render. Fetch it however you like — the root never fetches. */
  items?: T[]
  /** Stable key per item. Defaults to `item.name` when present, else the index. */
  getItemKey?: (item: T, index: number) => React.Key
  /** Name used by the default query matcher. Defaults to `item.name`. */
  getItemName?: (item: T) => string
  // search (controllable)
  query?: string
  defaultQuery?: string
  onQueryChange?: (query: string) => void
  // filters (controllable)
  filters?: PokedexFilterState
  defaultFilters?: PokedexFilterState
  onFiltersChange?: (filters: PokedexFilterState) => void
  /**
   * Set to `false` when items are already filtered upstream
   * (server-side search, external index, ...).
   */
  shouldFilter?: boolean
  /**
   * Decides whether an item matches the current query + filters.
   * The default only matches the normalized query against `getItemName`;
   * data-aware filters (generation, types, legendary...) need app data,
   * so provide your own `filterFn` (or pre-filter and use `shouldFilter={false}`).
   */
  filterFn?: (item: T, query: string, filters: PokedexFilterState) => boolean
  /** Enables incremental pagination: show this many items, grow via `loadMore`. */
  pageSize?: number
  /** Surfaced through context and as a `data-loading` attribute; `PokedexEmpty` hides while true. */
  loading?: boolean
}

function Pokedex<T>({
  asChild,
  items = [],
  getItemKey,
  getItemName = defaultGetItemName,
  query: queryProp,
  defaultQuery = "",
  onQueryChange,
  filters: filtersProp,
  defaultFilters = EMPTY_POKEDEX_FILTERS,
  onFiltersChange,
  shouldFilter = true,
  filterFn,
  pageSize: pageSizeProp,
  loading = false,
  ...props
}: PokedexProps<T>) {
  const [query, setQuery] = useControllableState(
    queryProp,
    defaultQuery,
    onQueryChange
  )
  const [filters, setFilters] = useControllableState(
    filtersProp,
    defaultFilters,
    onFiltersChange
  )

  const queryNormalized = React.useMemo(
    () => query.trim().toLowerCase(),
    [query]
  )

  const defaultFilterFn = React.useCallback(
    (item: T, q: string) =>
      q === "" || getItemName(item).toLowerCase().includes(q),
    [getItemName]
  )

  const matchedItems = React.useMemo(() => {
    if (!shouldFilter) return items
    const match = filterFn ?? defaultFilterFn
    return items.filter((item) => match(item, queryNormalized, filters))
  }, [items, shouldFilter, filterFn, defaultFilterFn, queryNormalized, filters])

  // pagination — resets whenever the query or the filters change
  const pageSize = pageSizeProp ?? null
  const [visibleCount, setVisibleCount] = React.useState(pageSize ?? 0)
  const resetKey = React.useMemo(
    () => JSON.stringify([queryNormalized, filters]),
    [queryNormalized, filters]
  )
  // "Adjusting state during render" pattern — resets the window without an effect.
  const [prevResetKey, setPrevResetKey] = React.useState(resetKey)
  if (prevResetKey !== resetKey) {
    setPrevResetKey(resetKey)
    if (pageSize !== null) setVisibleCount(pageSize)
  }

  const loadMore = React.useCallback(() => {
    if (pageSize !== null) setVisibleCount((count) => count + pageSize)
  }, [pageSize])

  const visibleItems = React.useMemo(
    () => (pageSize === null ? matchedItems : matchedItems.slice(0, visibleCount)),
    [matchedItems, pageSize, visibleCount]
  )

  const hasMore = pageSize !== null && visibleCount < matchedItems.length

  const hasActiveFilters =
    filters.generations.length > 0 ||
    filters.primaryTypes.length > 0 ||
    filters.secondaryTypes.length > 0 ||
    filters.legendaryOnly ||
    filters.mythicalOnly

  const resolvedGetItemKey = React.useMemo(
    () =>
      getItemKey ??
      ((item: T, index: number) => {
        const name = getItemName(item)
        return name === "" ? index : name
      }),
    [getItemKey, getItemName]
  )

  const toggleGeneration = React.useCallback(
    (name: string) =>
      setFilters((f) => ({ ...f, generations: toggleInList(f.generations, name) })),
    [setFilters]
  )
  const setGenerations = React.useCallback(
    (names: string[]) => setFilters((f) => ({ ...f, generations: names })),
    [setFilters]
  )
  const togglePrimaryType = React.useCallback(
    (name: string) =>
      setFilters((f) => ({
        ...f,
        primaryTypes: toggleInList(f.primaryTypes, name),
      })),
    [setFilters]
  )
  const toggleSecondaryType = React.useCallback(
    (name: string) =>
      setFilters((f) => ({
        ...f,
        secondaryTypes: toggleInList(f.secondaryTypes, name),
      })),
    [setFilters]
  )
  const setLegendaryOnly = React.useCallback(
    (value: boolean) => setFilters((f) => ({ ...f, legendaryOnly: value })),
    [setFilters]
  )
  const setMythicalOnly = React.useCallback(
    (value: boolean) => setFilters((f) => ({ ...f, mythicalOnly: value })),
    [setFilters]
  )
  const clearFilters = React.useCallback(
    () => setFilters(EMPTY_POKEDEX_FILTERS),
    [setFilters]
  )

  const value = React.useMemo<PokedexContextValue<T>>(
    () => ({
      items,
      matchedItems,
      visibleItems,
      getItemKey: resolvedGetItemKey,
      query,
      queryNormalized,
      setQuery,
      filters,
      setFilters,
      toggleGeneration,
      setGenerations,
      togglePrimaryType,
      toggleSecondaryType,
      setLegendaryOnly,
      setMythicalOnly,
      clearFilters,
      hasActiveFilters,
      pageSize,
      visibleCount,
      hasMore,
      loadMore,
      loading,
    }),
    [
      items,
      matchedItems,
      visibleItems,
      resolvedGetItemKey,
      query,
      queryNormalized,
      setQuery,
      filters,
      setFilters,
      toggleGeneration,
      setGenerations,
      togglePrimaryType,
      toggleSecondaryType,
      setLegendaryOnly,
      setMythicalOnly,
      clearFilters,
      hasActiveFilters,
      pageSize,
      visibleCount,
      hasMore,
      loadMore,
      loading,
    ]
  )

  const Comp = asChild ? Slot.Root : "div"

  return (
    <PokedexContext.Provider value={value as PokedexContextValue<unknown>}>
      <Comp data-slot="pokedex" data-loading={loading || undefined} {...props} />
    </PokedexContext.Provider>
  )
}

/* -------------------------------- Search --------------------------------- */

export type PokedexSearchProps = React.ComponentProps<typeof InputGroupInput>

function PokedexSearch({
  className,
  placeholder = "Buscar Pokémon…",
  onChange,
  onKeyDown,
  ...props
}: PokedexSearchProps) {
  const { query, setQuery } = usePokedex()

  return (
    <InputGroup data-slot="pokedex-search" className={cn("h-8", className)}>
      <InputGroupInput
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        className="text-xs placeholder:text-muted-foreground"
        value={query}
        onChange={(event) => {
          onChange?.(event)
          if (!event.defaultPrevented) setQuery(event.currentTarget.value)
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          // Escape clears the query first; a second press bubbles up
          // (e.g. to close a containing dialog).
          if (!event.defaultPrevented && event.key === "Escape" && query !== "") {
            event.preventDefault()
            event.stopPropagation()
            setQuery("")
          }
        }}
        {...props}
      />
      <InputGroupAddon>
        <SearchIcon className="size-3.5 shrink-0 opacity-50" />
      </InputGroupAddon>
      {query && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Limpiar búsqueda"
            onClick={() => setQuery("")}
          >
            <XIcon className="size-3.5" />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

/* --------------------------------- Clear ---------------------------------- */

export type PokedexClearProps = React.ComponentProps<typeof Button> & {
  /** What this button resets. Defaults to both query and filters. */
  clears?: "query" | "filters" | "all"
}

function PokedexClear({
  clears = "all",
  disabled,
  onClick,
  ...props
}: PokedexClearProps) {
  const { query, hasActiveFilters, setQuery, clearFilters } = usePokedex()

  const clearable =
    (clears !== "filters" && query !== "") ||
    (clears !== "query" && hasActiveFilters)

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      data-slot="pokedex-clear"
      data-clears={clears}
      disabled={disabled ?? !clearable}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (clears !== "filters") setQuery("")
        if (clears !== "query") clearFilters()
      }}
      {...props}
    />
  )
}

/* --------------------------------- Items ---------------------------------- */

export type PokedexItemsProps<T> = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  asChild?: boolean
  /** Render one item. Override `className` to switch the default grid for any layout. */
  renderItem?: (item: T, index: number) => React.ReactNode
  children?: React.ReactNode
}

function PokedexItems<T>({
  asChild,
  className,
  renderItem,
  children,
  ...props
}: PokedexItemsProps<T>) {
  const { visibleItems, getItemKey } = usePokedex<T>()
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="pokedex-items"
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
      {...props}
    >
      {renderItem
        ? visibleItems.map((item, index) => (
            <React.Fragment key={getItemKey(item, index)}>
              {renderItem(item, index)}
            </React.Fragment>
          ))
        : children}
    </Comp>
  )
}

/* --------------------------------- Empty ---------------------------------- */

export type PokedexEmptyProps = React.ComponentProps<typeof Empty>

function PokedexEmpty({ className, ...props }: PokedexEmptyProps) {
  const { matchedItems, loading, queryNormalized, hasActiveFilters } =
    usePokedex()

  if (loading || matchedItems.length > 0) return null

  return (
    <Empty
      data-slot="pokedex-empty"
      data-reason={
        queryNormalized !== "" || hasActiveFilters ? "no-match" : "no-items"
      }
      className={cn("border", className)}
      {...props}
    />
  )
}

/* -------------------------------- LoadMore -------------------------------- */

export type PokedexLoadMoreProps = React.ComponentProps<typeof Button>

function PokedexLoadMore({
  disabled,
  onClick,
  children,
  ...props
}: PokedexLoadMoreProps) {
  const { pageSize, hasMore, loadMore, matchedItems } = usePokedex()

  if (pageSize === null || matchedItems.length === 0) return null

  return (
    <Button
      type="button"
      data-slot="pokedex-load-more"
      data-state={hasMore ? "idle" : "exhausted"}
      disabled={disabled ?? !hasMore}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) loadMore()
      }}
      {...props}
    >
      {children ?? (hasMore ? "Load more" : "No more")}
    </Button>
  )
}

/* --------------------------------- Count ---------------------------------- */

export type PokedexCountProps = Omit<
  React.ComponentProps<"span">,
  "children"
> & {
  asChild?: boolean
  /** Custom formatter; defaults to `visible / matched`. */
  children?: (counts: {
    visible: number
    matched: number
    total: number
  }) => React.ReactNode
}

function PokedexCount({
  asChild,
  className,
  children,
  ...props
}: PokedexCountProps) {
  const { visibleItems, matchedItems, items } = usePokedex()
  const Comp = asChild ? Slot.Root : "span"

  const counts = {
    visible: visibleItems.length,
    matched: matchedItems.length,
    total: items.length,
  }

  return (
    <Comp
      data-slot="pokedex-count"
      className={cn(
        "text-xs whitespace-nowrap text-muted-foreground tabular-nums",
        className
      )}
      {...props}
    >
      {children ? children(counts) : `${counts.visible} / ${counts.matched}`}
    </Comp>
  )
}

export {
  Pokedex,
  PokedexSearch,
  PokedexClear,
  PokedexItems,
  PokedexEmpty,
  PokedexLoadMore,
  PokedexCount,
}
