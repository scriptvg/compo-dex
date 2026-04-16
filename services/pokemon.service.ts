import { MainClient, type NamedAPIResource } from "pokenode-ts";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export const pokeApi = new MainClient();

function uniquePokemonByNameList(results: NamedAPIResource[]) {
    const seen = new Set<string>();
    const out: NamedAPIResource[] = [];
    for (const p of results) {
        if (seen.has(p.name)) continue;
        seen.add(p.name);
        out.push(p);
    }
    return out;
}




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

/** Full national Pokédex name list (two small API calls) for search / client filters. */
export const usePokemonNameIndex = () => {
    return useQuery({
        queryKey: ["pokemon-name-index"],
        queryFn: async () => {
            const head = await pokeApi.pokemon.listPokemons(0, 1);
            const page = await pokeApi.pokemon.listPokemons(0, head.count);
            return uniquePokemonByNameList(page.results);
        },
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const usePokemonTypeNameList = () => {
    return useQuery({
        queryKey: ["pokemon-type-name-list"],
        queryFn: async () => {
            const head = await pokeApi.pokemon.listTypes(0, 1);
            const page = await pokeApi.pokemon.listTypes(0, head.count);
            return page.results.map((r) => r.name);
        },
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const usePokemonGenerationNameList = () => {
    return useQuery({
        queryKey: ["pokemon-generation-name-list"],
        queryFn: async () => {
            const head = await pokeApi.game.listGenerations(0, 1);
            const page = await pokeApi.game.listGenerations(0, head.count);
            return page.results.map((r) => r.name);
        },
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export type PokemonSpeciesFlags = { legendary: boolean; mythical: boolean };

async function fetchPokemonSpeciesFlagsIndex(): Promise<
    Map<string, PokemonSpeciesFlags>
> {
    const head = await pokeApi.pokemon.listPokemonSpecies(0, 1);
    const page = await pokeApi.pokemon.listPokemonSpecies(0, head.count);
    const map = new Map<string, PokemonSpeciesFlags>();
    const chunkSize = 64;
    for (let i = 0; i < page.results.length; i += chunkSize) {
        const chunk = page.results.slice(i, i + chunkSize);
        const details = await Promise.all(
            chunk.map((r) => pokeApi.pokemon.getPokemonSpeciesByName(r.name)),
        );
        for (const s of details) {
            map.set(s.name, {
                legendary: s.is_legendary,
                mythical: s.is_mythical,
            });
        }
    }
    return map;
}

/** Legendary / mythical flags per species name. Fetches only when enabled (heavy first load). */
export const usePokemonSpeciesFlagsIndex = (enabled: boolean) => {
    return useQuery({
        queryKey: ["pokemon-species-flags-index"],
        queryFn: fetchPokemonSpeciesFlagsIndex,
        staleTime: 1000 * 60 * 60 * 24,
        enabled,
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