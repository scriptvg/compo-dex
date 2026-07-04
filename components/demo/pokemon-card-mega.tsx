import {
    PokemonCard,
    PokemonCardHeader,
    PokemonCardMedia,
    PokemonCardNumber,
    PokemonCardOverlay,
    PokemonCardTitle,
} from "@/components/compodex/ui/pokemon-card"
import { PokemonBadgeTypeGroup } from "@/components/compodex/ui/badge-type"
import {
    PokemonSprite,
    PokemonSpriteFallback,
    PokemonSpriteImage,
} from "@/components/compodex/ui/pokemon-sprite"

const ARTWORK =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

export default function PokemonCardMegaDemo() {
    return (
        <PokemonCard className="w-full max-w-56" mega>
            <PokemonCardMedia className="h-48">
                <PokemonSprite className="size-full bg-card">
                    <PokemonSpriteImage
                        src={`${ARTWORK}/10034.png`}
                        alt="Mega Charizard X"
                    />
                    <PokemonSpriteFallback />
                </PokemonSprite>

                <PokemonCardOverlay position="top-left">
                    <PokemonCardNumber>006</PokemonCardNumber>
                </PokemonCardOverlay>

                <PokemonCardOverlay position="top-right">
                    <PokemonBadgeTypeGroup types={["fire", "dragon"]} />
                </PokemonCardOverlay>
            </PokemonCardMedia>

            <PokemonCardHeader>
                <PokemonCardTitle>Mega Charizard X</PokemonCardTitle>
            </PokemonCardHeader>
        </PokemonCard>
    )
}
