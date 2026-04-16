"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type PokedexFilterState = {
  /** API names e.g. `generation-i` */
  selectedGenerations: string[]
  /** Primary type slot (slot 1) — multi */
  selectedPrimaryTypes: string[]
  /** Secondary type slot (slot 2) — multi */
  selectedSecondaryTypes: string[]
  legendaryOnly: boolean
  mythicalOnly: boolean
}

export type PokedexContextValue = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchNormalized: string
  filters: PokedexFilterState
  toggleGeneration: (name: string) => void
  /** Reemplaza la selección de generaciones (p. ej. radio “una sola”). */
  setGenerations: (names: string[]) => void
  togglePrimaryType: (name: string) => void
  toggleSecondaryType: (name: string) => void
  setLegendaryOnly: (value: boolean) => void
  setMythicalOnly: (value: boolean) => void
  clearFilters: () => void
  hasActiveFilters: boolean
}

const defaultFilters: PokedexFilterState = {
  selectedGenerations: [],
  selectedPrimaryTypes: [],
  selectedSecondaryTypes: [],
  legendaryOnly: false,
  mythicalOnly: false,
}

const PokedexContext = createContext<PokedexContextValue | null>(null)

function toggleInList(list: string[], name: string): string[] {
  return list.includes(name) ? list.filter((n) => n !== name) : [...list, name]
}

export function PokedexProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<PokedexFilterState>(defaultFilters)

  const searchNormalized = useMemo(
    () => searchQuery.trim().toLowerCase(),
    [searchQuery],
  )

  const toggleGeneration = useCallback((name: string) => {
    setFilters((f) => ({
      ...f,
      selectedGenerations: toggleInList(f.selectedGenerations, name),
    }))
  }, [])

  const setGenerations = useCallback((names: string[]) => {
    setFilters((f) => ({ ...f, selectedGenerations: names }))
  }, [])

  const togglePrimaryType = useCallback((name: string) => {
    setFilters((f) => ({
      ...f,
      selectedPrimaryTypes: toggleInList(f.selectedPrimaryTypes, name),
    }))
  }, [])

  const toggleSecondaryType = useCallback((name: string) => {
    setFilters((f) => ({
      ...f,
      selectedSecondaryTypes: toggleInList(f.selectedSecondaryTypes, name),
    }))
  }, [])

  const setLegendaryOnly = useCallback((value: boolean) => {
    setFilters((f) => ({ ...f, legendaryOnly: value }))
  }, [])

  const setMythicalOnly = useCallback((value: boolean) => {
    setFilters((f) => ({ ...f, mythicalOnly: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  const hasActiveFilters = useMemo(() => {
    return (
      filters.selectedGenerations.length > 0 ||
      filters.selectedPrimaryTypes.length > 0 ||
      filters.selectedSecondaryTypes.length > 0 ||
      filters.legendaryOnly ||
      filters.mythicalOnly
    )
  }, [filters])

  const value = useMemo<PokedexContextValue>(
    () => ({
      searchQuery,
      setSearchQuery,
      searchNormalized,
      filters,
      toggleGeneration,
      setGenerations,
      togglePrimaryType,
      toggleSecondaryType,
      setLegendaryOnly,
      setMythicalOnly,
      clearFilters,
      hasActiveFilters,
    }),
    [
      searchQuery,
      searchNormalized,
      filters,
      toggleGeneration,
      setGenerations,
      togglePrimaryType,
      toggleSecondaryType,
      setLegendaryOnly,
      setMythicalOnly,
      clearFilters,
      hasActiveFilters,
    ],
  )

  return (
    <PokedexContext.Provider value={value}>
      {children}
    </PokedexContext.Provider>
  )
}

export function usePokedex() {
  const ctx = useContext(PokedexContext)
  if (!ctx) {
    throw new Error("usePokedex must be used within PokedexProvider")
  }
  return ctx
}
