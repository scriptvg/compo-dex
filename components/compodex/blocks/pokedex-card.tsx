import { usePokemonByName } from "@/services/pokemon.service"
import { usePokemonSpeciesByName } from "@/services/pokemon.service"
import { PokemonBadgeTypeGroup, type PokemonBadgeType } from "@/components/compodex/ui/badge-type"
import { PokemonSprite, PokemonSpriteFallback, PokemonSpriteImage } from "@/components/compodex/ui/pokemon-sprite"
import {
  PokemonCard,
  PokemonCardHeader,
  PokemonCardMedia,
  PokemonCardNumber,
  PokemonCardOverlay,
  PokemonCardTitle,
} from "@/components/compodex/ui/pokemon-card"
import { Badge } from "@/components/ui/badge"
import { NamedAPIResource } from "pokenode-ts"

function PokedexCard({ pokemon }: { pokemon: NamedAPIResource }) {
    const { data: pokemonData } = usePokemonByName(pokemon.name)
    const { data: speciesData } = usePokemonSpeciesByName(pokemon.name)

    const sprite =
      pokemonData?.sprites.front_default ??
      pokemonData?.sprites.other?.["official-artwork"]?.front_default ??
      ""

    /** En PokéAPI las formas mega usan el sufijo `-mega` / `-mega-x` / `-mega-y`. */
    const isMega = Boolean(pokemonData?.name?.includes("-mega"))

    // Un Pokémon tiene como máximo 2 tipos (primario + secundario).
    const types =
      pokemonData?.types?.map((t) => t.type.name as PokemonBadgeType) ?? []

    return (
      <PokemonCard
        className="overflow-hidden p-2"
        isMega={isMega}
        type={types[0] ?? "normal"}
        secondary={types[1]}
      >
        <PokemonCardMedia className="h-48">
          <PokemonSprite className="size-full bg-card">
            <PokemonSpriteImage src={sprite} alt={pokemonData?.name ?? pokemon.name} />
            <PokemonSpriteFallback />
          </PokemonSprite>

          <PokemonCardOverlay position="top-left">
            <PokemonCardNumber>
              {pokemonData?.id.toString().padStart(3, "0")}
            </PokemonCardNumber>
          </PokemonCardOverlay>

          <PokemonCardOverlay position="top-right">
            <PokemonBadgeTypeGroup types={types} />
          </PokemonCardOverlay>

          <PokemonCardOverlay position="bottom-left">
            {speciesData?.is_legendary ? (
              <Badge className="rainbow-animated">Legendary</Badge>
            ) : null}
            {speciesData?.is_mythical ? (
              <Badge className="bg-foreground text-background">Mythical</Badge>
            ) : null}
            {isMega ? (
              <Badge className="border border-amber-600/80 bg-amber-600 text-white">
                Mega
              </Badge>
            ) : null}
          </PokemonCardOverlay>
        </PokemonCardMedia>

        <PokemonCardHeader>
          <PokemonCardTitle>
            {pokemonData?.name}
          </PokemonCardTitle>
        </PokemonCardHeader>
      </PokemonCard>
    )
  }

export { PokedexCard }