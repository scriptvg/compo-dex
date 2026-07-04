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
import { Badge } from "@/components/ui/badge"

const ARTWORK =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

export default function PokemonCardBadgesDemo() {
    return (
        <PokemonCard className="w-full max-w-56" type="dragon" secondary="flying">
            <PokemonCardMedia className="h-48">
                <PokemonSprite className="size-full bg-card">
                    <PokemonSpriteImage
                        src={`${ARTWORK}/149.png`}
                        alt="Dragonite"
                    />
                    <PokemonSpriteFallback />
                </PokemonSprite>

                <PokemonCardOverlay position="top-left">
                    <PokemonCardNumber>149</PokemonCardNumber>
                </PokemonCardOverlay>

                <PokemonCardOverlay position="top-right">
                    <PokemonBadgeTypeGroup types={["dragon", "flying"]} />
                </PokemonCardOverlay>

                <PokemonCardOverlay position="bottom-left">
                    <Badge className="bg-foreground text-background">
                        Pseudo-legendary
                    </Badge>
                </PokemonCardOverlay>
            </PokemonCardMedia>

            <PokemonCardHeader>
                <PokemonCardTitle>Dragonite</PokemonCardTitle>
            </PokemonCardHeader>
        </PokemonCard>
    )
}
