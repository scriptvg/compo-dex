import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"

export default function PokemonBadgeVariantsDemo() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <PokemonBadgeType type="fire">default</PokemonBadgeType>
            <PokemonBadgeType variant="outline">outline</PokemonBadgeType>
            <PokemonBadgeType variant="secondary">secondary</PokemonBadgeType>
            <PokemonBadgeType variant="ghost">ghost</PokemonBadgeType>
        </div>
    )
}
