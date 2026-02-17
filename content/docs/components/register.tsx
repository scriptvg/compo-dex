import * as React from "react";
import PokemonImageDemo, {
  code as pokemonImageCode,
} from "./pokemon-image/pokemon-image-demo";
import PokemonImageBasicUsage, {
  code as pokemonBasicUsageCode,
} from "./pokemon-image/pokemon-basic-usage";
import { CLInstaller } from "@/components/cli-installer";
import { ExampleFile } from "@/components/example-file";
import { type CodeLanguage } from "@/components/example-context";
import { Badge } from "@/components/ui/badge";

export interface RegistryEntry {
  title: string;
  description: string;
  files?: {
    title: string;
    path: string;
    language: CodeLanguage;
  }[];
  manualSteps: {
    title: string;
    description?: React.ReactNode;
    content?: React.ReactNode;
  }[];
  overview: {
    filename: string;
    path?: string;
    code: string;
    example: React.ReactNode;
  };
  examples: {
    id: string;
    title?: string | React.ReactNode;
    props?: {
      type?: string;
      prop?: string;
      value?: string;
    }[];
    description?: string | React.ReactNode;
    filename: string;
    path?: string;
    code: string;
    example: React.ReactNode;
  }[];
}

export const registry: Record<string, RegistryEntry> = {
  "pokemon-image": {
    title: "Pokemon Image",
    description: "Pokemon Image is a component that displays a Pokemon image.",
    files: [
      {
        title: "pokemon-image.tsx",
        path: "components/compo-dex/pokemon-image.tsx",
        language: "tsx",
      },
    ],
    overview: {
      filename: "pokemon-image-demo",
      code: pokemonImageCode,
      example: <PokemonImageDemo />,
    },
    manualSteps: [
      {
        title: "Install the dependencies",
        description: (
          <CLInstaller
            codes={{
              npm: "npm install radix-ui",
              pnpm: "pnpm add radix-ui",
              /* yarn: "yarn add @repo/ui", */
              /* bun: "bun add @repo/ui", */
            }}
          />
        ),
      },
      {
        title: "Import the component",
        description: (
          <ExampleFile
            path="components/compo-dex/pokemon-image.tsx"
            language="tsx"
            title="pokemon-image-demo"
          />
        ),
      },
      {
        title: "Update the import paths to match your project structure",
      },
    ],
    examples: [
      {
        id: "basic-usage",
        title: "Basic Usage",
        description: "Basic usage of the Pokemon Image component.",
        filename: "pokemon-basic-usage",
        code: pokemonBasicUsageCode,
        example: <PokemonImageBasicUsage />,
      },
      {
        id: "pokemon-image-sizes",
        props: [
          {
            type: "string",
            prop: "size",
            value: "lg",
          },
        ],
        title: "Sizes",
        description: (
          <>
            Use the <Badge>size</Badge> prop to change the size of the
            component.
          </>
        ),
        filename: "pokemon-image-sizes",
        code: pokemonImageCode,
        example: <PokemonImageDemo />,
      },
    ],
  },
  "pokemon-badge": {
    title: "Pokemon Badge",
    description: "Pokemon Badge is a component that displays a Pokemon badge.",
    overview: {
      filename: "pokemon-badge-demo",
      code: pokemonImageCode,
      example: <PokemonImageDemo />,
    },
    manualSteps: [
      {
        title: "Import the component",
        description: (
          <ExampleFile
            path="components/ui/badge.tsx"
            language="tsx"
            title="badge"
          />
        ),
      },
      {
        title: "Update the import paths to match your project structure",
      },
    ],
    examples: [
      {
        id: "basic-usage",
        filename: "pokemon-badge-basic",
        code: `import { Badge } from "@/components/ui/badge";\n\n<Badge>Fire</Badge>`,
        example: (
          <div className="p-4 border rounded-md bg-accent text-center font-bold">
            Pokemon Badge Mockup
          </div>
        ),
      },
    ],
  },
  "pokemon-card": {
    title: "Pokemon Card",
    description: "Pokemon Card is a component that displays a Pokemon card.",
    overview: {
      filename: "pokemon-card-demo",
      code: pokemonImageCode,
      example: <PokemonImageDemo />,
    },
    manualSteps: [
      {
        title: "Import the component",
        description: (
          <ExampleFile
            path="components/ui/card.tsx"
            language="tsx"
            title="card"
          />
        ),
      },
      {
        title: "Update the import paths to match your project structure",
      },
    ],
    examples: [
      {
        id: "card-basic",
        filename: "pokemon-card-basic",
        code: `import { Card } from "@/components/ui/card";\n\n<Card>Pikachu</Card>`,
        example: (
          <div className="p-4 border rounded-md bg-accent text-center font-bold">
            Pokemon Card Mockup
          </div>
        ),
      },
    ],
  },
};
