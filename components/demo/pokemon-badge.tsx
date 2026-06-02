import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"

export default function PokemonBadgeDemo() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <PokemonBadgeType type="fire">Fire</PokemonBadgeType>
            <PokemonBadgeType type="water">Water</PokemonBadgeType>
            <PokemonBadgeType type="grass">Grass</PokemonBadgeType>
            <PokemonBadgeType type="electric">Electric</PokemonBadgeType>
            <PokemonBadgeType type="psychic">Psychic</PokemonBadgeType>
        </div>
    )
}
