"use client"

import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"

export default function PokemonBadgeAsLinkDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <PokemonBadgeType type="fire" asChild>
        <a href="#fire" onClick={(e) => e.preventDefault()}>
          Fire
        </a>
      </PokemonBadgeType>
      <PokemonBadgeType type="water" variant="outline" asChild>
        <a href="#water" onClick={(e) => e.preventDefault()}>
          Water
        </a>
      </PokemonBadgeType>
      <PokemonBadgeType type="grass" variant="ghost" asChild>
        <a href="#grass" onClick={(e) => e.preventDefault()}>
          Grass
        </a>
      </PokemonBadgeType>
      <PokemonBadgeType type="electric" variant="soft" asChild>
        <a href="#electric" onClick={(e) => e.preventDefault()}>
          Electric
        </a>
      </PokemonBadgeType>
    </div>
  )
}
