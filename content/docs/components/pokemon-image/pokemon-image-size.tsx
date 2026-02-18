import {
  PokemonImage,
  PokemonSprite,
  PokemonFallback,
} from "@/components/compo-dex/pokemon-image";

function PokemonImageSize() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <PokemonImage size="sm">
        <PokemonSprite
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Bulbasaur"
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
      <PokemonImage size="md">
        <PokemonSprite
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Bulbasaur"
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
      <PokemonImage size="lg">
        <PokemonSprite
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Bulbasaur"
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
      <PokemonImage size="xl">
        <PokemonSprite
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Bulbasaur"
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
    </div>
  );
}

export default PokemonImageSize;

export const code = `import {
  PokemonImage,
  PokemonSprite,
  PokemonFallback,
} from "@/components/compo-dex/pokemon-image";

function PokemonImageSize() {
  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <PokemonImage size="sm">
        <PokemonSprite
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Bulbasaur"
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
      <PokemonImage size="md">
        <PokemonSprite
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Bulbasaur"
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
      <PokemonImage size="lg">
        <PokemonSprite
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Bulbasaur"
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
      <PokemonImage size="xl">
        <PokemonSprite
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Bulbasaur"
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
    </div>
  );
}`;