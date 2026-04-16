import { usePokemonByName } from "@/services/pokemon.service"
import { usePokemonSpeciesByName } from "@/services/pokemon.service"
import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"
import { PokemonSprite, PokemonSpriteFallback, PokemonSpriteImage } from "@/components/compodex/ui/pokemon-sprite"
import { PokemonCard, PokemonCardHeader, PokemonCardTitle } from "@/components/compodex/ui/pokemon-card"
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

    return (
      <PokemonCard
        className="relative overflow-hidden p-2"
        isMega={isMega}
        type={
          (pokemonData?.types[0]?.type.name ?? "normal") as PokemonBadgeType
        }
        secondary={
          pokemonData?.types[1]?.type.name as PokemonBadgeType | undefined
        }
      >
        
        <PokemonSprite className="h-48 w-full bg-card">
          <PokemonSpriteImage src={sprite} alt={pokemonData?.name ?? pokemon.name} />
          <PokemonSpriteFallback />
        </PokemonSprite>
        <div className="absolute left-4 top-4">
          <Badge className="bg-foreground text-background">{pokemonData?.id.toString().padStart(3, "0")}</Badge>
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
  
        <div className="absolute bottom-16 left-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-1">
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
        </div>
  
        <PokemonCardHeader>
          <PokemonCardTitle>
            {pokemonData?.name}
          </PokemonCardTitle>
        </PokemonCardHeader>
      </PokemonCard>
    )
  }

export { PokedexCard }