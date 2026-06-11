"use client"

import {
  Pokedex,
  PokedexItems,
  PokedexLoadMore,
} from "@/components/compodex/ui/pokedex"
import {
  PokemonSprite,
  PokemonSpriteFallback,
  PokemonSpriteImage,
} from "@/components/compodex/ui/pokemon-sprite"

const SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

const POKEMON = [
  { id: 1, name: "bulbasaur" },
  { id: 4, name: "charmander" },
  { id: 7, name: "squirtle" },
  { id: 25, name: "pikachu" },
  { id: 39, name: "jigglypuff" },
  { id: 94, name: "gengar" },
  { id: 95, name: "onix" },
  { id: 133, name: "eevee" },
  { id: 149, name: "dragonite" },
  { id: 150, name: "mewtwo" },
]

export default function PokedexGridDemo() {
  return (
    <Pokedex
      items={POKEMON}
      pageSize={6}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <PokedexItems<(typeof POKEMON)[number]>
        className="grid-cols-2 sm:grid-cols-3 gap-2"
        renderItem={(pokemon) => (
          <div className="flex flex-col items-center gap-1 border p-3">
            <PokemonSprite size="lg">
              <PokemonSpriteImage
                src={`${SPRITE_URL}/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <PokemonSpriteFallback>
                {pokemon.name.slice(0, 2).toUpperCase()}
              </PokemonSpriteFallback>
            </PokemonSprite>
            <span className="text-xs capitalize">{pokemon.name}</span>
          </div>
        )}
      />
      <PokedexLoadMore variant="outline" size="sm" className="self-center" />
    </Pokedex>
  )
}
