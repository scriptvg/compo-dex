import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"

export default function PokemonBadgeVariantsDemo() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <PokemonBadgeType type="fire">solid</PokemonBadgeType>
            <PokemonBadgeType type="water">soft</PokemonBadgeType>
            <PokemonBadgeType type="grass">outline</PokemonBadgeType>
            <PokemonBadgeType type="electric">ghost</PokemonBadgeType>
        </div>
    )
}
