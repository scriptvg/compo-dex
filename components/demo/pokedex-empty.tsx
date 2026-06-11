"use client"

import {
  Pokedex,
  PokedexClear,
  PokedexEmpty,
  PokedexItems,
  PokedexSearch,
} from "@/components/compodex/ui/pokedex"
import {
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

const POKEMON = [
  { name: "bulbasaur" },
  { name: "charmander" },
  { name: "squirtle" },
  { name: "pikachu" },
]

export default function PokedexEmptyDemo() {
  return (
    <Pokedex
      items={POKEMON}
      defaultQuery="missingno"
      className="flex w-full max-w-sm flex-col gap-2"
    >
      <PokedexSearch />
      <PokedexItems<(typeof POKEMON)[number]>
        className="flex flex-col gap-1"
        renderItem={(pokemon) => (
          <div className="border px-2 py-1.5 text-xs capitalize">
            {pokemon.name}
          </div>
        )}
      />
      <PokedexEmpty>
        <EmptyHeader>
          <EmptyTitle>Sin resultados</EmptyTitle>
          <EmptyDescription>
            Ningún Pokémon coincide con la búsqueda.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <PokedexClear clears="query">Limpiar búsqueda</PokedexClear>
        </EmptyContent>
      </PokedexEmpty>
    </Pokedex>
  )
}
