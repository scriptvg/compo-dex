// services/pokemon.service.ts
import { pokemonApi } from "./pokemon.api";
import { uniqueByName } from "@/lib/pokemon-utils";

export type PokemonSpeciesFlags = {
  legendary: boolean;
  mythical: boolean;
};

/**
 * Obtiene lista completa (dos llamadas optimizadas)
 */
export async function getFullPokemonList() {
  const head = await pokemonApi.list(0, 1);
  const page = await pokemonApi.list(0, head.count);

  return uniqueByName(page.results);
}

/**
 * Index de tipos
 */
export async function getPokemonTypes() {
  const head = await pokemonApi.listTypes(0, 1);
  const page = await pokemonApi.listTypes(0, head.count);

  return page.results.map((r) => r.name);
}

/**
 * Index de generaciones
 */
export async function getPokemonGenerations() {
  const head = await pokemonApi.listGenerations(0, 1);
  const page = await pokemonApi.listGenerations(0, head.count);

  return page.results.map((r) => r.name);
}

/**
 * Index pesado (legendarios / míticos)
 */
export async function getSpeciesFlagsIndex(): Promise<
  Map<string, PokemonSpeciesFlags>
> {
  const head = await pokemonApi.listSpecies(0, 1);
  const page = await pokemonApi.listSpecies(0, head.count);

  const map = new Map<string, PokemonSpeciesFlags>();
  const chunkSize = 64;

  for (let i = 0; i < page.results.length; i += chunkSize) {
    const chunk = page.results.slice(i, i + chunkSize);

    const details = await Promise.all(
      chunk.map((r) => pokemonApi.getSpeciesByName(r.name))
    );

    details.forEach((s) => {
      map.set(s.name, {
        legendary: s.is_legendary,
        mythical: s.is_mythical,
      });
    });
  }

  return map;
}