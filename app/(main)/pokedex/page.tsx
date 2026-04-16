"use client"

import { useMemo, type ReactNode } from "react"
import { Page, PageContent, PageHeader } from "@/components/layout/page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type NamedAPIResource } from "pokenode-ts"
import { usePokemonInfiniteList, usePokemonByName, usePokemonSpeciesByName } from "@/services/pokemon.service"
import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"
import { PokemonSprite, PokemonSpriteFallback, PokemonSpriteImage } from "@/components/compodex/ui/pokemon-sprite"
import { PokemonCard, PokemonCardHeader, PokemonCardTitle } from "@/components/compodex/ui/pokemon-card"

const PAGE_SIZE = 24



function uniquePokemonByName(pages: { results: NamedAPIResource[] }[]) {
  const seen = new Set<string>()
  const out: NamedAPIResource[] = []
  for (const page of pages) {
    for (const p of page.results) {
      if (seen.has(p.name)) continue
      seen.add(p.name)
      out.push(p)
    }
  }
  return out
}

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

function PokedexCard({ pokemon }: { pokemon: NamedAPIResource }) {
  const { data: pokemonData } = usePokemonByName(pokemon.name)
  const { data: speciesData } = usePokemonSpeciesByName(pokemon.name)

  const sprite =
    pokemonData?.sprites.front_default ??
    pokemonData?.sprites.other?.["official-artwork"]?.front_default ??
    ""

  const species = pokemonData?.species.name

  return (
    <PokemonCard className="relative p-2 overflow-hidden" type={pokemonData?.types[0].type.name as PokemonBadgeType} secondary={pokemonData?.types[1]?.type.name as PokemonBadgeType}>
      
      <PokemonSprite className="h-48 w-full bg-card">
        <PokemonSpriteImage src={sprite} alt={pokemonData?.name ?? pokemon.name} />
        <PokemonSpriteFallback />
      </PokemonSprite>
      <div className="absolute left-4 top-4">
        <Badge variant="secondary">{pokemonData?.id.toString().padStart(3, "0")}</Badge>
      </div>

      <div className="absolute right-4 top-4 flex max-w-[70%] flex-wrap justify-end gap-1">
        {pokemonData?.types?.map((t) => (
          <PokemonBadgeType
            key={t.type.name}
            type={t.type.name as PokemonBadgeType}
          >
            {t.type.name}
          </PokemonBadgeType>
        ))}
      </div>

      <div className="absolute bottom-16 left-4">
        {speciesData?.is_legendary ? <Badge variant="outline" className="">Legendary</Badge>
         : speciesData?.is_mythical ? <Badge variant="outline" className="">Mythical</Badge> : null}
      </div>

{/*       <div className="absolute bottom-16 right-4">
        <Badge variant="outline" className="">
          {speciesData?.generation.name}
        </Badge>
      </div> */}

      <PokemonCardHeader>
        <PokemonCardTitle>
          {pokemonData?.name}
        </PokemonCardTitle>
      </PokemonCardHeader>
    </PokemonCard>
  )
}

export default function PokedexPage() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonInfiniteList(PAGE_SIZE)

  const rows = useMemo(
    () => (data?.pages ? uniquePokemonByName(data.pages) : []),
    [data],
  )

  return (
    <Page>
      <PageHeader className="w-full border-b border-dashed px-4 py-2">
        <h1 className="text-2xl font-bold">Pokedex</h1>
      </PageHeader>
      <PageContent className="flex flex-col gap-4 p-4">
        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : null}

        {isError ? (
          <div className="text-sm text-destructive">Failed to load Pokémon.</div>
        ) : null}

        {!isLoading && !isError ? (
          <PokedexGrid
            pokemon={rows}
            renderItem={(pokemon) => (
              <PokedexCard key={pokemon.name} pokemon={pokemon} />
            )}
          />
        ) : null}

        {!isLoading && !isError ? (
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more…" : hasNextPage ? "Load more" : "No more"}
            </Button>
          </div>
        ) : null}
      </PageContent>
    </Page>
  )
}
