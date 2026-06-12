import {
    PokemonCard,
    PokemonCardHeader,
    PokemonCardMedia,
    PokemonCardNumber,
    PokemonCardOverlay,
    PokemonCardTitle,
} from "@/components/compodex/ui/pokemon-card"
import { PokemonBadgeTypeGroup } from "@/components/compodex/ui/badge-type"
import { PokemonSprite, PokemonSpriteFallback, PokemonSpriteImage } from "@/components/compodex/ui/pokemon-sprite"



export default function PokemonCardDemo() {
    return (
        <PokemonCard className="overflow-hidden p-2" type="electric">
            <PokemonCardMedia className="h-48">
                <PokemonSprite className="size-full bg-card">
                    <PokemonSpriteImage src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" />
                    <PokemonSpriteFallback />
                </PokemonSprite>

                <PokemonCardOverlay position="top-left">
                    <PokemonCardNumber>025</PokemonCardNumber>
                </PokemonCardOverlay>

                <PokemonCardOverlay position="top-right">
                    <PokemonBadgeTypeGroup types={["electric"]} />
                </PokemonCardOverlay>
            </PokemonCardMedia>

            <PokemonCardHeader>
                <PokemonCardTitle>Pikachu</PokemonCardTitle>
            </PokemonCardHeader>
        </PokemonCard>
    )
}
