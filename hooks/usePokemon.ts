// hooks/usePokemon.ts
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getFullPokemonList,
  getPokemonTypes,
  getPokemonGenerations,
  getSpeciesFlagsIndex,
} from "../services/pokemon.service";
import { pokemonApi } from "../services/pokemon.api";

/**
 * Lista paginada simple
 */
export const usePokemonList = (limit: number, offset: number) =>
  useQuery({
    queryKey: ["pokemon-list", limit, offset],
    queryFn: () => pokemonApi.list(offset, limit),
  });

/**
 * Infinite scroll optimizado
 */
export const usePokemonInfiniteList = (limit: number) =>
  useInfiniteQuery({
    queryKey: ["pokemon-list-infinite", limit],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      pokemonApi.list(pageParam, limit),

    getNextPageParam: (lastPage: any, allPages: any[]) => {
      const total = allPages.reduce(
        (acc, page) => acc + page.results.length,
        0
      );

      return total >= lastPage.count ? undefined : total;
    },

    staleTime: 1000 * 60 * 10,
    initialPageParam: 0,
  });

/**
 * Índices (cache largo)
 */
export const usePokemonNameIndex = () =>
  useQuery({
    queryKey: ["pokemon-name-index"],
    queryFn: getFullPokemonList,
    staleTime: 1000 * 60 * 60 * 24,
  });

export const usePokemonTypeList = () =>
  useQuery({
    queryKey: ["pokemon-types"],
    queryFn: getPokemonTypes,
    staleTime: 1000 * 60 * 60 * 24,
  });

export const usePokemonGenerationList = () =>
  useQuery({
    queryKey: ["pokemon-generations"],
    queryFn: getPokemonGenerations,
    staleTime: 1000 * 60 * 60 * 24,
  });

export const usePokemonSpeciesFlags = (enabled: boolean) =>
  useQuery({
    queryKey: ["pokemon-species-flags"],
    queryFn: getSpeciesFlagsIndex,
    enabled,
    staleTime: 1000 * 60 * 60 * 24,
  });

/**
 * Queries individuales
 */
export const usePokemonByName = (name: string) =>
  useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => pokemonApi.getByName(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

export const usePokemonById = (id: number) =>
  useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => pokemonApi.getById(id),
    enabled: !!id,
  });

export const usePokemonSpeciesByName = (name: string) =>
  useQuery({
    queryKey: ["pokemon-species", name],
    queryFn: () => pokemonApi.getSpeciesByName(name),
    enabled: !!name,
  });