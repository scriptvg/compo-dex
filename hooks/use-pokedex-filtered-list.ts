"use client"

import { useQueries } from "@tanstack/react-query"
import { type NamedAPIResource } from "pokenode-ts"
import type { PokedexFilterState } from "@/contexts/pokedex-context"
import {
  pokeApi,
  usePokemonSpeciesFlagsIndex,
} from "@/services/pokemon.service"

function unionSets(sets: Set<string>[]): Set<string> {
  const out = new Set<string>()
  for (const s of sets) {
    for (const n of s) out.add(n)
  }
  return out
}

async function fetchPrimaryTypeNames(typeName: string): Promise<Set<string>> {
  const t = await pokeApi.pokemon.getTypeByName(typeName)
  return new Set(
    t.pokemon.filter((p) => p.slot === 1).map((p) => p.pokemon.name),
  )
}

async function fetchSecondaryTypeNames(typeName: string): Promise<Set<string>> {
  const t = await pokeApi.pokemon.getTypeByName(typeName)
  return new Set(
    t.pokemon.filter((p) => p.slot === 2).map((p) => p.pokemon.name),
  )
}

export function usePokedexFilteredList(
  allPokemon: NamedAPIResource[] | undefined,
  searchNormalized: string,
  filters: PokedexFilterState,
) {
  const needFlags = filters.legendaryOnly || filters.mythicalOnly
  const { data: speciesFlags, isPending: flagsPending } =
    usePokemonSpeciesFlagsIndex(needFlags)

  const generationQueries = useQueries({
    queries: filters.selectedGenerations.map((name) => ({
      queryKey: ["pokedex-filter", "generation", name] as const,
      queryFn: () => pokeApi.game.getGenerationByName(name),
      staleTime: 1000 * 60 * 60 * 24,
      enabled: Boolean(allPokemon?.length && filters.selectedGenerations.length),
    })),
  })

  const primaryTypeQueries = useQueries({
    queries: filters.selectedPrimaryTypes.map((name) => ({
      queryKey: ["pokedex-filter", "type-primary", name] as const,
      queryFn: () => fetchPrimaryTypeNames(name),
      staleTime: 1000 * 60 * 60 * 24,
      enabled: Boolean(allPokemon?.length && filters.selectedPrimaryTypes.length),
    })),
  })

  const secondaryTypeQueries = useQueries({
    queries: filters.selectedSecondaryTypes.map((name) => ({
      queryKey: ["pokedex-filter", "type-secondary", name] as const,
      queryFn: () => fetchSecondaryTypeNames(name),
      staleTime: 1000 * 60 * 60 * 24,
      enabled: Boolean(
        allPokemon?.length && filters.selectedSecondaryTypes.length,
      ),
    })),
  })

  const genPending = generationQueries.some((q) => q.isPending)
  const primaryPending = primaryTypeQueries.some((q) => q.isPending)
  const secondaryPending = secondaryTypeQueries.some((q) => q.isPending)

  const isLoadingFilters =
    genPending ||
    primaryPending ||
    secondaryPending ||
    (needFlags && flagsPending)

  if (!allPokemon?.length) {
    return { matched: [] as NamedAPIResource[], isLoadingFilters }
  }

  let list = allPokemon
  if (searchNormalized) {
    list = list.filter((p) => p.name.includes(searchNormalized))
  }

  if (filters.selectedGenerations.length > 0) {
    const genSet = new Set<string>()
    for (const q of generationQueries) {
      const species = q.data?.pokemon_species
      if (!species) continue
      for (const s of species) genSet.add(s.name)
    }
    if (genSet.size === 0) {
      return { matched: [], isLoadingFilters }
    }
    list = list.filter((p) => genSet.has(p.name))
  }

  if (filters.selectedPrimaryTypes.length > 0) {
    const sets = primaryTypeQueries
      .map((q) => q.data)
      .filter((s): s is Set<string> => s instanceof Set)
    if (sets.length === 0) {
      return { matched: [], isLoadingFilters }
    }
    const primaryUnion = unionSets(sets)
    list = list.filter((p) => primaryUnion.has(p.name))
  }

  if (filters.selectedSecondaryTypes.length > 0) {
    const sets = secondaryTypeQueries
      .map((q) => q.data)
      .filter((s): s is Set<string> => s instanceof Set)
    if (sets.length === 0) {
      return { matched: [], isLoadingFilters }
    }
    const secondaryUnion = unionSets(sets)
    list = list.filter((p) => secondaryUnion.has(p.name))
  }

  if (needFlags) {
    if (!speciesFlags) {
      return { matched: [], isLoadingFilters }
    }
    list = list.filter((p) => {
      const f = speciesFlags.get(p.name)
      if (!f) return false
      if (filters.legendaryOnly && filters.mythicalOnly) {
        return f.legendary || f.mythical
      }
      if (filters.legendaryOnly) return f.legendary
      if (filters.mythicalOnly) return f.mythical
      return true
    })
  }

  return { matched: list, isLoadingFilters }
}
