import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"

export default function PokemonBadgeVariantsTypeDemo() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <PokemonBadgeType type="fire" variant="solid">
                solid
            </PokemonBadgeType>
            <PokemonBadgeType type="water" variant="outline">
                outline
            </PokemonBadgeType>
            <PokemonBadgeType type="grass" variant="soft">
                soft
            </PokemonBadgeType>
            <PokemonBadgeType type="electric" variant="ghost">
                ghost
            </PokemonBadgeType>
        </div>
    )
}
