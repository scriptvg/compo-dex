import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"

export default function PokemonBadgeVariantsDemo() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <PokemonBadgeType type="fire">fire</PokemonBadgeType>
            <PokemonBadgeType type="water">water</PokemonBadgeType>
            <PokemonBadgeType type="grass">grass</PokemonBadgeType>
            <PokemonBadgeType type="electric">electric</PokemonBadgeType>
        </div>
    )
}
