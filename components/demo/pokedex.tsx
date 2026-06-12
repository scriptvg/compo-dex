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
import {
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "../ui/item"
import {
  PokemonSprite,
  PokemonSpriteFallback,
  PokemonSpriteImage,
} from "../compodex/ui/pokemon-sprite"
import { ScrollArea } from "../ui/scroll-area"


const SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

type DemoPokemon = {
  id: number
  name: string
  info: string
  types: TypeName[]
  sprite?: string
}

const POKEMON: DemoPokemon[] = [
  {
    id: 1,
    name: "bulbasaur",
    info: "Bulbasaur (Japanese: フシギダネ Fushigidane) is a dual-type Grass/Poison Pokémon introduced in Generation I.",
    types: ["grass", "poison"],
    sprite: `${SPRITE_URL}/1.png`,
  },
  {
    id: 4,
    name: "charmander",
    info: "Charmander (Japanese: ヒトカゲ Hitokage) is a Fire-type Pokémon introduced in Generation I.",
    types: ["fire"],
    sprite: `${SPRITE_URL}/4.png`,
  },
  {
    id: 7,
    name: "squirtle",
    info: "Squirtle (Japanese: カメール Kamēru) is a Water-type Pokémon introduced in Generation I.",
    types: ["water"],
    sprite: `${SPRITE_URL}/7.png`,
  },
  {
    id: 25,
    name: "pikachu",
    info: "Pikachu (Japanese: ピカチュウ Pikachū) is an Electric-type Pokémon introduced in Generation I.",
    types: ["electric"],
    sprite: `${SPRITE_URL}/25.png`,
  },
  {
    id: 39,
    name: "jigglypuff",
    info: "Jigglypuff (Japanese: ポッポ Poppo) is a Normal/Fairy-type Pokémon introduced in Generation I.",
    types: ["normal", "fairy"],
    sprite: `${SPRITE_URL}/39.png`,
  },
  {
    id: 94,
    name: "gengar",
    info: "Gengar (Japanese: ゲンガー Genga) is a Ghost/Poison-type Pokémon introduced in Generation I.",
    types: ["ghost", "poison"],
    sprite: `${SPRITE_URL}/94.png`,
  },
  {
    id: 95,
    name: "onix",
    info: "Onix (Japanese: オニック Oniik) is a Rock/Ground-type Pokémon introduced in Generation I.",
    types: ["rock", "ground"],
    sprite: `${SPRITE_URL}/95.png`,
  },
  {
    id: 133,
    name: "eevee",
    info: "Eevee (Japanese: エブイ Ebu) is a Normal-type Pokémon introduced in Generation I.",
    types: ["normal"],
    sprite: `${SPRITE_URL}/133.png`,
  },
  {
    id: 149,
    name: "dragonite",
    info: "Dragonite (Japanese: ドラゴンイット Dragonītu) is a Dragon/Flying-type Pokémon introduced in Generation III.",
    types: ["dragon", "flying"],
    sprite: `${SPRITE_URL}/149.png`,
  },
  {
    id: 150,
    name: "mewtwo",
    info: "Mewtwo (Japanese: メウト Mewtu) is a Psychic-type Pokémon introduced in Generation V.",
    types: ["psychic"],
    sprite: `${SPRITE_URL}/150.png`,
  },
]

export default function PokedexDemo() {
  return (
    <Pokedex
      items={POKEMON}
      pageSize={5}
      className="flex w-full  flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <PokedexSearch className="min-w-0 flex-1" />
        <PokedexCount  />
      </div>

        <PokedexItems<DemoPokemon>
          className="flex flex-col gap-1"
          renderItem={(pokemon) => (
            <Item variant="outline">
              <ItemMedia variant="image">
                <PokemonSprite className="size-full border">
                  <PokemonSpriteImage src={pokemon.sprite} />
                  <PokemonSpriteFallback />
                </PokemonSprite>
              </ItemMedia>
              <ItemContent>
                <ItemTitle >{pokemon.name}</ItemTitle>
                <ItemDescription className="w-30 max-w-45 truncate">{pokemon.info}</ItemDescription>
              </ItemContent>
              <ItemActions className="flex gap-1">
                {pokemon.types.map((type) => (
                  <PokemonBadgeType key={type} type={type}>
                    {type}
                  </PokemonBadgeType>
                ))}
              </ItemActions>
            </Item>
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

/*  */
