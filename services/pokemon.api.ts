// services/pokemon.api.ts
import { MainClient } from "pokenode-ts";

export const pokeApi = new MainClient();

/**
 * Capa de acceso a datos (NO lógica de negocio aquí)
 */
export const pokemonApi = {
  list: (offset: number, limit: number) =>
    pokeApi.pokemon.listPokemons(offset, limit),

  getByName: (name: string) =>
    pokeApi.pokemon.getPokemonByName(name),

  getById: (id: number) =>
    pokeApi.pokemon.getPokemonById(id),

  getSpeciesByName: (name: string) =>
    pokeApi.pokemon.getPokemonSpeciesByName(name),

  getSpeciesById: (id: number) =>
    pokeApi.pokemon.getPokemonSpeciesById(id),

  listSpecies: (offset: number, limit: number) =>
    pokeApi.pokemon.listPokemonSpecies(offset, limit),

  listTypes: (offset: number, limit: number) =>
    pokeApi.pokemon.listTypes(offset, limit),

  listGenerations: (offset: number, limit: number) =>
    pokeApi.game.listGenerations(offset, limit),
};