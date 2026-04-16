"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { Page, PageContent, PageHeader } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { type NamedAPIResource } from "pokenode-ts"
import { usePokemonNameIndex } from "@/services/pokemon.service"
import { PokedexCard } from "@/components/compodex/blocks/pokedex-card"
import { PokedexSearchBar } from "@/components/compodex/blocks/pokedex-search-bar"
import { PokedexFilterMenu } from "@/components/compodex/blocks/pokedex-filter-menu"
import { usePokedex } from "@/contexts/pokedex-context"
import { usePokedexFilteredList } from "@/hooks/use-pokedex-filtered-list"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Badge } from "@/components/ui/badge"

const PAGE_SIZE = 24

function PokedexGrid({
  pokemon,
  renderItem,
}: {
  pokemon: NamedAPIResource[]
  renderItem: (p: NamedAPIResource) => ReactNode
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {pokemon.map((p) => renderItem(p))}
    </div>
  )
}

export default function PokedexPage() {
  const {
    searchNormalized,
    setSearchQuery,
    filters,
    clearFilters,
    hasActiveFilters,
  } = usePokedex()
  const { data: allPokemon, isLoading, isError } = usePokemonNameIndex()
  const { matched, isLoadingFilters } = usePokedexFilteredList(
    allPokemon,
    searchNormalized,
    filters,
  )
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filterKey = useMemo(
    () =>
      [
        filters.selectedGenerations.join(","),
        filters.selectedPrimaryTypes.join(","),
        filters.selectedSecondaryTypes.join(","),
        filters.legendaryOnly,
        filters.mythicalOnly,
      ].join("|"),
    [filters],
  )

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [searchNormalized, filterKey])

  const rows = useMemo(
    () => matched.slice(0, visibleCount),
    [matched, visibleCount],
  )

  const hasMore = visibleCount < matched.length
  const showFilterLoading =
    hasActiveFilters && isLoadingFilters && matched.length === 0

  return (
    <Page className="w-full max-w-full items-stretch">
      <PageHeader className="flex w-full min-w-0 flex-col gap-3 border-b border-dashed px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0 shrink-0">
          <h1 className="text-2xl font-bold">Pokedex</h1>
        </div>
        <div className="flex flex-col min-w-0 flex-1 items-end justify-end gap-2">
          <div className="min-w-0 w-full max-w-sm flex items-center gap-2">
          <PokedexSearchBar />
          <PokedexFilterMenu />
          </div>
          

        </div>

      </PageHeader>
      <PageContent className="flex flex-col gap-4 p-4">
        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : null}

        {isError ? (
          <div className="text-sm text-destructive">Failed to load Pokémon.</div>
        ) : null}

        {showFilterLoading ? (
          <div className="text-sm text-muted-foreground">
            Aplicando filtros…
          </div>
        ) : null}

        {!isLoading && !isError && !showFilterLoading ? (
          matched.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyTitle>
                  {searchNormalized || hasActiveFilters
                    ? "Sin resultados"
                    : "No hay Pokémon para mostrar"}
                </EmptyTitle>
                <EmptyDescription>
                  {searchNormalized || hasActiveFilters
                    ? "Prueba otra búsqueda o ajusta los filtros."
                    : "Vuelve a intentar más tarde."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex flex-row flex-wrap justify-center gap-2">
                {searchNormalized ? (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Limpiar búsqueda
                  </Button>
                ) : null}
                {hasActiveFilters ? (
                  <Button variant="outline" onClick={() => clearFilters()}>
                    Limpiar filtros
                  </Button>
                ) : null}
              </EmptyContent>
            </Empty>
          ) : (
            <PokedexGrid
              pokemon={rows}
              renderItem={(pokemon) => (
                <PokedexCard key={pokemon.name} pokemon={pokemon} />
              )}
            />
          )
        ) : null}

        {!isLoading && !isError && !showFilterLoading && matched.length > 0 ? (
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              disabled={!hasMore}
            >
              {hasMore ? "Load more" : "No more"}
            </Button>
          </div>
        ) : null}
      </PageContent>
    </Page>
  )
}
