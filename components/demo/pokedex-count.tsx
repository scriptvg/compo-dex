"use client"

import {
  Pokedex,
  PokedexCount,
  PokedexItems,
  PokedexSearch,
} from "@/components/compodex/ui/pokedex"

const POKEMON = [
  { name: "bulbasaur" },
  { name: "ivysaur" },
  { name: "venusaur" },
  { name: "charmander" },
  { name: "charmeleon" },
  { name: "charizard" },
  { name: "squirtle" },
  { name: "wartortle" },
  { name: "blastoise" },
]

export default function PokedexCountDemo() {
  return (
    <Pokedex
      items={POKEMON}
      pageSize={4}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      <PokedexSearch />
      <PokedexCount>
        {({ visible, matched, total }) =>
          `Mostrando ${visible} de ${matched} coincidencias (${total} en total)`
        }
      </PokedexCount>
      <PokedexItems<(typeof POKEMON)[number]>
        className="flex flex-col gap-1"
        renderItem={(pokemon) => (
          <div className="border px-2 py-1.5 text-xs capitalize">
            {pokemon.name}
          </div>
        )}
      />
    </Pokedex>
  )
}
