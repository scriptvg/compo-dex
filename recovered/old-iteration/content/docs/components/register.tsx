import * as React from "react";
import PokemonImageDemo, {
  code as pokemonImageCode,
  importCode as pokemonImageImportCode,
  usageCode as pokemonImageUsageCode,
} from "./pokemon-image/pokemon-image-demo";
import PokemonImageBasicUsage, {
  code as pokemonBasicUsageCode,
} from "./pokemon-image/pokemon-basic-usage";
import PokemonImageSize, {
  code as pokemonImageSizeCode,
} from "./pokemon-image/pokemon-image-size";
import { CLInstaller } from "@/components/cli-installer";
import { ExampleFile } from "@/components/example-file";
import { type CodeLanguage } from "@/components/example-context";
import { Badge } from "@/components/ui/badge";

type files = {
  title: string;
  path: string;
  language: CodeLanguage;
};

type manualSteps = {
  title: string;
  description?: React.ReactNode;
  content?: React.ReactNode;
};

type usage = {
  importCode: {
    code: string;
    language: CodeLanguage;
  };
  usageCode: {
    code: string;
    language: CodeLanguage;
  };
};

type overview = {
  filename: string;
  path?: string;
  code: string;
  example: React.ReactNode;
};

type examples = {
  id: string;
  title?: string | React.ReactNode;
  props?: {
    type?: string;
    prop?: string;
    value?: string;
  }[];
  highlightedLines?: number[];
  description?: string | React.ReactNode;
  filename: string;
  path?: string;
  code: string;
  example: React.ReactNode;
};

export interface RegistryEntry {
  title: string;
  description: string;
  files?: files[];
  manualSteps: manualSteps[];
  usage: {
    importCode: {
      code: string;
      language: CodeLanguage;
    };
    usageCode: {
      code: string;
      language: CodeLanguage;
    };
  };
  overview: {
    filename: string;
    path?: string;
    code: string;
    example: React.ReactNode;
  };
  examples: examples[];
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
            title="pokemon-image"
          />
        ),
      },
      {
        title: "Update the import paths to match your project structure",
      },
    ],
    usage: {
      importCode: {
        code: pokemonImageImportCode,
        language: "tsx",
      },
      usageCode: {
        code: pokemonImageUsageCode,
        language: "tsx",
      },
    },
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
        title: "Sizes",
        description: (
          <>
            Use the <Badge>size</Badge> prop to change the size of the
            component.
          </>
        ),
        filename: "pokemon-image-sizes",
        code: pokemonImageSizeCode,
        example: <PokemonImageSize />,
        highlightedLines: [10, 17, 24, 31],
      },
    ],
  },
};
