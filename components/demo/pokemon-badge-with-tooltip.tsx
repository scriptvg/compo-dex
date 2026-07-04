import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TYPE_INFO = {
  fire: {
    weakness: ["Water", "Ground", "Rock"],
    strongAgainst: ["Grass", "Bug", "Steel"],
  },
  water: {
    weakness: ["Electric", "Grass"],
    strongAgainst: ["Fire", "Ground", "Rock"],
  },
  grass: {
    weakness: ["Fire", "Ice", "Poison", "Flying"],
    strongAgainst: ["Water", "Ground", "Rock"],
  },
  electric: {
    weakness: ["Ground"],
    strongAgainst: ["Water", "Flying"],
  },
  psychic: {
    weakness: ["Ghost", "Dark"],
    strongAgainst: ["Fighting", "Poison"],
  },
} as const

export default function PokemonBadgeWithTooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-2">
        {(["fire", "water", "grass", "electric", "psychic"] as const).map(
          (type) => (
            <Tooltip key={type}>
              <TooltipTrigger asChild>
                <button className="cursor-help rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none">
                  <PokemonBadgeType type={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </PokemonBadgeType>
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-2 text-sm z-60">
                  <div className="space-y-2">
                    <div className="text-xs">
                      <p className="mb-1 font-semibold text-muted-foreground">
                        Weak to:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {TYPE_INFO[type].weakness.map((t) => (
                          <PokemonBadgeType
                            key={t}
                            type={t.toLowerCase() as PokemonBadgeType}
                            
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </PokemonBadgeType>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs">
                      <p className="mb-1 font-semibold text-muted-foreground">
                        Strong vs:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {TYPE_INFO[type].strongAgainst.map((t) => (
                          <PokemonBadgeType
                            key={t}
                            type={t.toLowerCase() as PokemonBadgeType}
                            
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </PokemonBadgeType>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          )
        )}
      </div>
    </TooltipProvider>
  )
}
