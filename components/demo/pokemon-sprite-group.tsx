import {
    PokemonSprite,
    PokemonSpriteImage,
    PokemonSpriteFallback,
    PokemonSpriteGroup,
    PokemonSpriteGroupCount,
} from "@/components/compodex/ui/pokemon-sprite"

const STARTERS = [
    { id: 1, name: "Bulbasaur" },
    { id: 4, name: "Charmander" },
    { id: 7, name: "Squirtle" },
]

export default function PokemonSpriteGroupDemo() {
    return (
        <PokemonSpriteGroup>
            {STARTERS.map((p) => (
                <PokemonSprite key={p.id} size="lg">
                    <PokemonSpriteImage
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                        alt={p.name}
                    />
                    <PokemonSpriteFallback>{p.name[0]}</PokemonSpriteFallback>
                </PokemonSprite>
            ))}
            <PokemonSpriteGroupCount>+9</PokemonSpriteGroupCount>
        </PokemonSpriteGroup>
    )
}
