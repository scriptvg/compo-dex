import {
    PokemonSprite,
    PokemonSpriteImage,
    PokemonSpriteFallback,
} from "@/components/compodex/ui/pokemon-sprite"

export default function PokemonSpriteDemo() {
    return (
        <PokemonSprite size="lg">
            <PokemonSpriteImage
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="Pikachu"
            />
            <PokemonSpriteFallback>PK</PokemonSpriteFallback>
        </PokemonSprite>
    )
}
