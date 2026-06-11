import type { ComponentType } from "react";
import PokemonImageDoc from "./pokemon-image/doc.mdx";

export const componentDocs = {
  "pokemon-image": PokemonImageDoc,
} satisfies Record<string, ComponentType>;

export type ComponentDocSlug = keyof typeof componentDocs;
