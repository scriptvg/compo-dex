import {
    PokemonCard,
    PokemonCardHeader,
    PokemonCardMedia,
    PokemonCardNumber,
    PokemonCardOverlay,
    PokemonCardTitle,
} from "@/components/compodex/ui/pokemon-card"
import {
    PokemonSprite,
    PokemonSpriteFallback,
    PokemonSpriteImage,
} from "@/components/compodex/ui/pokemon-sprite"

const ARTWORK =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

export default function PokemonCardSmDemo() {
    return (
        <div className="flex items-end gap-4">
            <PokemonCard className="w-48" type="fire">
                <PokemonCardMedia className="h-40">
                    <PokemonSprite className="size-full bg-card">
                        <PokemonSpriteImage
                            src={`${ARTWORK}/4.png`}
                            alt="Charmander"
                        />
                        <PokemonSpriteFallback />
                    </PokemonSprite>

                    <PokemonCardOverlay position="top-left">
                        <PokemonCardNumber>004</PokemonCardNumber>
                    </PokemonCardOverlay>
                </PokemonCardMedia>

                <PokemonCardHeader>
                    <PokemonCardTitle>Charmander</PokemonCardTitle>
                </PokemonCardHeader>
            </PokemonCard>

            <PokemonCard className="w-36" size="sm" type="fire">
                <PokemonCardMedia className="h-28">
                    <PokemonSprite className="size-full bg-card">
                        <PokemonSpriteImage
                            src={`${ARTWORK}/4.png`}
                            alt="Charmander"
                        />
                        <PokemonSpriteFallback />
                    </PokemonSprite>

                    <PokemonCardOverlay position="top-left">
                        <PokemonCardNumber>004</PokemonCardNumber>
                    </PokemonCardOverlay>
                </PokemonCardMedia>

                <PokemonCardHeader>
                    <PokemonCardTitle>Charmander</PokemonCardTitle>
                </PokemonCardHeader>
            </PokemonCard>
        </div>
    )
}
