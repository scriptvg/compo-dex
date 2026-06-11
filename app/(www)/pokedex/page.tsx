"use client"

import { useState } from "react"
import { Page } from "@/components/layout/page"
import { type NamedAPIResource } from "pokenode-ts"
import { usePokemonNameIndex } from "@/services/pokemon.service"
import {
  EMPTY_POKEDEX_FILTERS,
  Pokedex,
  PokedexClear,
  PokedexEmpty,
  PokedexItems,
  PokedexLoadMore,
  PokedexSearch,
  type PokedexFilterState,
} from "@/components/compodex/ui/pokedex"
import { PokedexCard } from "@/components/compodex/blocks/pokedex-card"
import { PokedexFilterMenu } from "@/components/compodex/blocks/pokedex-filter-menu"
import { usePokedexFilteredList } from "@/hooks/use-pokedex-filtered-list"
import {
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

const PAGE_SIZE = 24

export default function PokedexPage() {
  // Controlled state — the page owns it, the <Pokedex> primitives consume it.
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<PokedexFilterState>(
    EMPTY_POKEDEX_FILTERS,
  )

  const queryNormalized = query.trim().toLowerCase()
  const hasActiveFilters =
    filters.generations.length > 0 ||
    filters.primaryTypes.length > 0 ||
    filters.secondaryTypes.length > 0 ||
    filters.legendaryOnly ||
    filters.mythicalOnly

  // Data layer — exclusive to this app, never part of the primitives.
  const { data: allPokemon, isLoading, isError } = usePokemonNameIndex()
  const { matched, isLoadingFilters } = usePokedexFilteredList(
    allPokemon,
    queryNormalized,
    filters,
  )

  const showFilterLoading =
    hasActiveFilters && isLoadingFilters && matched.length === 0
  const filtered = Boolean(queryNormalized) || hasActiveFilters

  return (
    <Pokedex
      asChild
      items={matched}
      shouldFilter={false}
      pageSize={PAGE_SIZE}
      query={query}
      onQueryChange={setQuery}
      filters={filters}
      onFiltersChange={setFilters}
      loading={isLoading || showFilterLoading}
    >
      <Page className="w-full max-w-full items-stretch">
        <Page.Header className="flex w-full min-w-0 flex-col gap-3 border-b border-dashed px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0 shrink-0">
            <h1 className="text-2xl font-bold">Pokedex</h1>
          </div>
          <div className="flex flex-col min-w-0 flex-1 items-end justify-end gap-2">
            <div className="min-w-0 w-full max-w-sm flex items-center gap-2">
              <PokedexSearch className="min-w-0 w-full" />
              <PokedexFilterMenu />
            </div>
          </div>
        </Page.Header>
        <Page.Content className="flex flex-col gap-4 p-4">
          {isError ? (
            <div className="text-sm text-destructive">
              Failed to load Pokémon.
            </div>
          ) : null}

          {showFilterLoading ? (
            <div className="text-sm text-muted-foreground">
              Aplicando filtros…
            </div>
          ) : null}

          {!isLoading && !isError && !showFilterLoading ? (
            <>
              <PokedexEmpty>
                <EmptyHeader>
                  <EmptyTitle>
                    {filtered ? "Sin resultados" : "No hay Pokémon para mostrar"}
                  </EmptyTitle>
                  <EmptyDescription>
                    {filtered
                      ? "Prueba otra búsqueda o ajusta los filtros."
                      : "Vuelve a intentar más tarde."}
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex flex-row flex-wrap justify-center gap-2">
                  {queryNormalized ? (
                    <PokedexClear clears="query">Limpiar búsqueda</PokedexClear>
                  ) : null}
                  {hasActiveFilters ? (
                    <PokedexClear clears="filters">Limpiar filtros</PokedexClear>
                  ) : null}
                </EmptyContent>
              </PokedexEmpty>
              <PokedexItems<NamedAPIResource>
                renderItem={(pokemon) => <PokedexCard pokemon={pokemon} />}
              />
              <div className="flex justify-center">
                <PokedexLoadMore />
              </div>
            </>
          ) : null}
        </Page.Content>
      </Page>
    </Pokedex>
  )
}
