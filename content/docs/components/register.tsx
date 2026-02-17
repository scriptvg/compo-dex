import * as React from "react";
import {
  PokemonImage,
  PokemonSprite,
  PokemonFallback,
} from "@/components/compo-dex/pokemon-image";
import PokemonImageDemo, { code as pokemonImageCode } from "./pokemon-image/pokemon-image-demo";

export const registry: Record<
  string,
  {
    example: React.ReactNode;
    code: string;
    title: string;
  }
> = {
  "pokemon-image": {
    code: pokemonImageCode,
    example: <PokemonImageDemo />,
    title: "pokemon-image-demo",
  },

  "pokemon-badge": {
    code: `import { Badge } from "@/components/ui/badge";\n\n<Badge>Fire</Badge>`,
    example: (
      <div className="p-4 border rounded-md bg-accent text-center font-bold">
        Pokemon Badge Mockup
      </div>
    ),
    title: "Pokemon Badge",
  },
  "pokemon-card": {
    code: `import { Card } from "@/components/ui/card";\n\n<Card>Pikachu</Card>`,
    example: (
      <div className="p-4 border rounded-md bg-accent text-center font-bold">
        Pokemon Card Mockup
      </div>
    ),
    title: "Pokemon Card",
  },
};
