import {
    PokemonCard,
    PokemonCardHeader,
    PokemonCardTitle,
} from "@/components/compodex/ui/pokemon-card"
import { PokemonBadgeType } from "@/components/compodex/ui/badge-type"
import { Badge } from "../ui/badge"
import { PokemonSprite, PokemonSpriteFallback, PokemonSpriteImage } from "../compodex/ui/pokemon-sprite"



export default function PokemonCardDemo() {
    return (
        <PokemonCard
            className="relative overflow-hidden p-2"
            type="electric"

        >

            <PokemonSprite className="h-48 w-full bg-card">
                <PokemonSpriteImage src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" />
                <PokemonSpriteFallback />
            </PokemonSprite>
            <div className="absolute left-4 top-4">
                <Badge className="bg-foreground text-background">25</Badge>
            </div>

            <div className="absolute right-4 top-4 flex max-w-[70%] flex-wrap justify-end gap-1">
                <PokemonBadgeType type="electric">Electric</PokemonBadgeType>
            </div>



            <PokemonCardHeader>
                <PokemonCardTitle>
                    Pikachu
                </PokemonCardTitle>
            </PokemonCardHeader>
        </PokemonCard>
    )
}
