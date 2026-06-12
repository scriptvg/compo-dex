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

export default function PokemonCardDualDemo() {
    return (
        <PokemonCard className="overflow-hidden p-2" type="water" secondary="flying">
            <PokemonCardMedia className="h-48">
                <PokemonSprite className="size-full bg-card">
                    <PokemonSpriteImage src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png" alt="Gyarados" />
                    <PokemonSpriteFallback />
                </PokemonSprite>

                <PokemonCardOverlay position="top-left">
                    <PokemonCardNumber>130</PokemonCardNumber>
                </PokemonCardOverlay>

                <PokemonCardOverlay position="top-right">
                    <PokemonBadgeTypeGroup types={["water", "flying"]} />
                </PokemonCardOverlay>
            </PokemonCardMedia>

            <PokemonCardHeader>
                <PokemonCardTitle>Gyarados</PokemonCardTitle>
            </PokemonCardHeader>
        </PokemonCard>
    )
}
