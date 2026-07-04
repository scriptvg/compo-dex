import {
    PokemonCard,
    PokemonCardHeader,
    PokemonCardMedia,
    PokemonCardTitle,
} from "@/components/compodex/ui/pokemon-card"
import {
    PokemonSprite,
    PokemonSpriteFallback,
    PokemonSpriteImage,
} from "@/components/compodex/ui/pokemon-sprite"

const ARTWORK =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

export default function PokemonCardSpriteDemo() {
    return (
        <div className="grid w-full max-w-md grid-cols-2 gap-4">
            {/* With artwork: the sprite fills the media slot */}
            <PokemonCard type="grass" secondary="poison">
                <PokemonCardMedia className="h-40">
                    <PokemonSprite className="size-full bg-card">
                        <PokemonSpriteImage
                            src={`${ARTWORK}/1.png`}
                            alt="Bulbasaur"
                        />
                        <PokemonSpriteFallback />
                    </PokemonSprite>
                </PokemonCardMedia>

                <PokemonCardHeader>
                    <PokemonCardTitle>Bulbasaur</PokemonCardTitle>
                </PokemonCardHeader>
            </PokemonCard>

            {/* Without artwork: the sprite fallback keeps the composition */}
            <PokemonCard type="psychic">
                <PokemonCardMedia className="h-40">
                    <PokemonSprite className="size-full bg-card">
                        <PokemonSpriteImage src="" alt="Mew" />
                        <PokemonSpriteFallback>MEW</PokemonSpriteFallback>
                    </PokemonSprite>
                </PokemonCardMedia>

                <PokemonCardHeader>
                    <PokemonCardTitle>Mew</PokemonCardTitle>
                </PokemonCardHeader>
            </PokemonCard>
        </div>
    )
}
