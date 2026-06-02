import {
    PokemonCard,
    PokemonCardHeader,
    PokemonCardTitle,
} from "@/components/compodex/ui/pokemon-card"
import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"
import { PokemonSprite, PokemonSpriteFallback, PokemonSpriteImage } from "@/components/compodex/ui/pokemon-sprite"
import { Badge } from "@/components/ui/badge"

export default function PokemonCardDualDemo() {
    return (
        <PokemonCard
        className="relative overflow-hidden p-2"
        type="water"
        secondary="flying"
    >

        <PokemonSprite className="h-48 w-full bg-card">
            <PokemonSpriteImage src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png" alt="Gyarados" />
            <PokemonSpriteFallback />
        </PokemonSprite>
        <div className="absolute left-4 top-4">
            <Badge className="bg-foreground text-background">130</Badge>
        </div>

        <div className="absolute right-4 top-4 flex max-w-[70%] flex-wrap justify-end gap-1">
            <PokemonBadgeType type="water">Water</PokemonBadgeType>
            <PokemonBadgeType type="flying">Flying</PokemonBadgeType>
        </div>



        <PokemonCardHeader>
            <PokemonCardTitle>
                Gyarados
            </PokemonCardTitle>
        </PokemonCardHeader>
    </PokemonCard>
    )
}
