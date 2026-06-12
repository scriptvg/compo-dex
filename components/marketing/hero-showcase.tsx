import {
  PokemonBadgeType,
  PokemonBadgeTypeGroup,
} from "@/components/compodex/ui/badge-type"
import {
  PokemonCard,
  PokemonCardHeader,
  PokemonCardMedia,
  PokemonCardNumber,
  PokemonCardOverlay,
  PokemonCardTitle,
} from "@/components/compodex/ui/pokemon-card"
import {
  PokemonSprite,
  PokemonSpriteFallback,
  PokemonSpriteGroup,
  PokemonSpriteGroupCount,
  PokemonSpriteImage,
} from "@/components/compodex/ui/pokemon-sprite"
import {
  PokemonStat,
  PokemonStatBar,
  PokemonStatLabel,
  PokemonStatList,
  type PokemonStatEntry,
} from "@/components/compodex/ui/pokemon-stat"
import { cn } from "@/lib/utils"

const POKEMON_TYPES = [
  "electric",
  "fire",
  "water",
  "grass",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "steel",
  "fairy",
]

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

const PARTY = [
  { id: 25, name: "Pikachu" },
  { id: 6, name: "Charizard" },
  { id: 9, name: "Blastoise" },
  { id: 3, name: "Venusaur" },
  { id: 5, name: "Charmarder" },
  { id: 54, name: "Psyduck" },
]

// A trimmed Charizard spread keeps the stats tile short.
const STATS: PokemonStatEntry[] = [
  { stat: "hp", value: 78 },
  { stat: "attack", value: 84 },
  { stat: "speed", value: 100 },
]

function Tile({
  label,
  className,
  children,
}: {
  label?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 bg-card p-3 text-left ring-1 ring-foreground/10",
        className
      )}
    >
      {label ? (
        <span className="text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
      ) : null}
      {children}
    </div>
  )
}

/**
 * Bento showcase for the hero: the real CompoDex components composed together
 * (dual-type card, type badges across variants, base-stat bars, the Mega
 * rainbow surface, and a sprite group) so the landing page demos the kit
 * instead of describing it.
 */
export function HeroShowcase({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4 [&_*]:select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* Flagship dual-type card */}
      <PokemonCard type="water" secondary="flying" className="row-span-2 p-2">
        <PokemonCardMedia className="h-full min-h-44 flex-1">
          <PokemonSprite size="card" className="bg-card">
            <PokemonSpriteImage src={`${ARTWORK}/130.png`} alt="Gyarados" />
            <PokemonSpriteFallback>GY</PokemonSpriteFallback>
          </PokemonSprite>

          <PokemonCardOverlay position="top-left">
            <PokemonCardNumber>#130</PokemonCardNumber>
          </PokemonCardOverlay>
          <PokemonCardOverlay position="top-right">
            <PokemonBadgeTypeGroup types={["water", "flying"]} />
          </PokemonCardOverlay>
        </PokemonCardMedia>

        <PokemonCardHeader>
          <PokemonCardTitle>Gyarados</PokemonCardTitle>
        </PokemonCardHeader>
      </PokemonCard>

      <div className="flex flex-col gap-4">
        {/* Type badges across every variant */}
        <div className="">
          <Tile label="Type badges">
            <div className="flex flex-wrap items-center gap-1">
              {POKEMON_TYPES.map((type) => (
                <PokemonBadgeType
                  key={type}
                  type={type as PokemonBadgeType}
                  variant="solid"
                >
                  {type}
                </PokemonBadgeType>
              ))}
            </div>
          </Tile>
        </div>

        {/* Mega rainbow surface */}
        <div className="">
          <PokemonCard isMega className="justify-center p-2">
            <PokemonCardHeader className="flex-1">
              <PokemonCardTitle className="drop-shadow">
                Mega Evolution
              </PokemonCardTitle>
              <span className="text-[0.625rem] font-medium tracking-wide uppercase">
                Animated surface
              </span>
            </PokemonCardHeader>
          </PokemonCard>
        </div>

        {/* Sprite group */}
        <div className="">
          <Tile label="Sprites">
            <PokemonSpriteGroup>
              {PARTY.map((p) => (
                <PokemonSprite key={p.id} size="md" className="bg-card">
                  <PokemonSpriteImage src={`${ARTWORK}/${p.id}.png`} alt={p.name} />
                  <PokemonSpriteFallback>{p.name[0]}</PokemonSpriteFallback>
                </PokemonSprite>
              ))}
              <PokemonSpriteGroupCount>+147</PokemonSpriteGroupCount>
            </PokemonSpriteGroup>
          </Tile>
        </div>
      </div>

      {/* Base stats */}
      <Tile label="Base stats" className="col-span-2">
        <PokemonStatList className="gap-2">
          {STATS.map((entry) => (
            <PokemonStat key={entry.stat} {...entry}>
              <PokemonStatLabel />
              <PokemonStatBar />
            </PokemonStat>
          ))}
        </PokemonStatList>
      </Tile>
    </div>
  )
}
