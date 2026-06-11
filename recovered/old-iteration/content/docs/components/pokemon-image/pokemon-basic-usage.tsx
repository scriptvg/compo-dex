import {
  PokemonImage,
  PokemonSprite,
  PokemonFallback,
} from "@/components/compo-dex/pokemon-image";

function PokemonImageBasicUsage() {
  const pokemon = {
    name: "Zacian",
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/891.png",
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png",
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png",
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <PokemonImage size="lg">
        <PokemonSprite
          src={pokemon?.sprites?.other?.["official-artwork"]?.front_default}
          alt={pokemon?.name}
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
    </div>
  );
}

export default PokemonImageBasicUsage;

export const code = `import {
  PokemonImage,
  PokemonSprite,
  PokemonFallback,
} from "@/components/compo-dex/pokemon-image";

function PokemonImageBasicUsage() {
  const pokemon = {
    name: "Zacian",
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/891.png",
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png",
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png",
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <PokemonImage size="lg">
        <PokemonSprite
          src={pokemon?.sprites?.other?.["official-artwork"]?.front_default}
          alt={pokemon?.name}
        />
        <PokemonFallback className="absolute inset-0 z-10" />
      </PokemonImage>
    </div>
  );
}`;
