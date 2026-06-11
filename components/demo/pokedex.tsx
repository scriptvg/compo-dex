"use client"

import {
  Pokedex,
  PokedexCount,
  PokedexEmpty,
  PokedexItems,
  PokedexLoadMore,
  PokedexSearch,
} from "@/components/compodex/ui/pokedex"
import {
  PokemonBadgeType,
  type PokemonBadgeType as TypeName,
} from "@/components/compodex/ui/badge-type"
import { EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

type DemoPokemon = { name: string; types: TypeName[] }

const POKEMON: DemoPokemon[] = [
  { name: "bulbasaur", types: ["grass", "poison"] },
  { name: "charmander", types: ["fire"] },
  { name: "squirtle", types: ["water"] },
  { name: "pikachu", types: ["electric"] },
  { name: "jigglypuff", types: ["normal", "fairy"] },
  { name: "gengar", types: ["ghost", "poison"] },
  { name: "onix", types: ["rock", "ground"] },
  { name: "dragonite", types: ["dragon", "flying"] },
  { name: "mewtwo", types: ["psychic"] },
]

export default function PokedexDemo() {
  return (
    <Pokedex
      items={POKEMON}
      pageSize={5}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <PokedexSearch className="min-w-0 flex-1" />
        <PokedexCount />
      </div>
      <PokedexItems<DemoPokemon>
        className="flex flex-col gap-1"
        renderItem={(pokemon) => (
          <div className="flex items-center justify-between border px-2 py-1.5">
            <span className="text-xs capitalize">{pokemon.name}</span>
            <span className="flex gap-1">
              {pokemon.types.map((type) => (
                <PokemonBadgeType key={type} type={type}>
                  {type}
                </PokemonBadgeType>
              ))}
            </span>
          </div>
        )}
      />
      <PokedexEmpty>
        <EmptyHeader>
          <EmptyTitle>Sin resultados</EmptyTitle>
          <EmptyDescription>Prueba otra búsqueda.</EmptyDescription>
        </EmptyHeader>
      </PokedexEmpty>
      <PokedexLoadMore variant="outline" size="sm">
        Cargar más
      </PokedexLoadMore>
    </Pokedex>
  )
}
