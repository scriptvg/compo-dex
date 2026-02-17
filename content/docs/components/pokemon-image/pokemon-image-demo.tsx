import {
  PokemonImage,
  PokemonSprite,
  PokemonFallback,
} from "@/components/compo-dex/pokemon-image";

function PokemonImageDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <PokemonImage>
        <PokemonSprite src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" />
        <PokemonFallback />
      </PokemonImage>
    </div>
  );
}

export default PokemonImageDemo;

export const code = `
import {
  PokemonImage,
  PokemonSprite,
  PokemonFallback,
} from "@/components/compo-dex/pokemon-image";

function PokemonImageDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <PokemonImage>
        <PokemonSprite src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" />
        <PokemonFallback />
      </PokemonImage>
    </div>
  );
}

export default PokemonImageDemo;
`;
