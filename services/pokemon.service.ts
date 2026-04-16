import { MainClient } from "pokenode-ts";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export const pokeApi = new MainClient();




export const usePokemonList = (limit: number, offset: number) => {
    return useQuery({
        queryKey: ["pokemon-list", limit, offset],
        queryFn: () => pokeApi.pokemon.listPokemons(offset, limit),
    });
}

export const usePokemonInfiniteList = (limit: number) => {
    return useInfiniteQuery({
        // bump version when list API args were fixed (offset/limit order)
        queryKey: ["pokemon-list-infinite", limit, 2],
        queryFn: ({ pageParam }) => pokeApi.pokemon.listPokemons(pageParam, limit),
        initialPageParam: 0,
        staleTime: 1000 * 60 * 10,
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.reduce(
                (sum, page) => sum + page.results.length,
                0,
            );
            if (totalFetched >= lastPage.count || lastPage.results.length === 0) {
                return undefined;
            }
            return totalFetched;
        },
    });
};


export const getPokemonHabitatById = async (id: number) => {
    return pokeApi.pokemon.getPokemonHabitatById(id);
}

export const getPokemonHabitatByName = async (name: string) => {
    return pokeApi.pokemon.getPokemonHabitatByName(name);
}

export const getCharacteristicById = async (id: number) => {
    return pokeApi.pokemon.getCharacteristicById(id);
}

export const getPokemonByName = async (name: string) => {
    return pokeApi.pokemon.getPokemonByName(name);
}

export const usePokemonByName = (name: string) => {
    return useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => getPokemonByName(name),
        enabled: Boolean(name),
        staleTime: 1000 * 60 * 60,
        retry: 1,
    });
}

export const getPokemonById = async (id: number) => {
    return pokeApi.pokemon.getPokemonById(id);
}

export const usePokemonById = (id: number) => {
    return useQuery({
        queryKey: ["pokemon", id],
        queryFn: () => getPokemonById(id),
    });
}

export const getPokemonSpeciesByName = async (name: string) => {
    return pokeApi.pokemon.getPokemonSpeciesByName(name);
}

export const usePokemonSpeciesByName = (name: string) => {
    return useQuery({
        queryKey: ["pokemon-species", name],
        queryFn: () => getPokemonSpeciesByName(name),
        enabled: Boolean(name),
        staleTime: 1000 * 60 * 60,
        retry: 1,
    });
}

export const getPokemonSpeciesById = async (id: number) => {
    return pokeApi.pokemon.getPokemonSpeciesById(id);
}

export const usePokemonSpeciesById = (id: number) => {
    return useQuery({
        queryKey: ["pokemon-species", id],
        queryFn: () => getPokemonSpeciesById(id),
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 60,
        retry: 1,
    });
}