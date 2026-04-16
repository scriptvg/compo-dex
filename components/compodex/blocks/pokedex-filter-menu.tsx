"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePokedex } from "@/contexts/pokedex-context"
import {
  POKEMON_TYPE_ORDER,
  PokemonBadgeType,
  type PokemonBadgeType as PokemonBadgeTypeName,
} from "@/components/compodex/ui/badge-type"
import {
  usePokemonGenerationNameList,
  usePokemonTypeNameList,
} from "@/services/pokemon.service"
import { Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const GENERATION_LABEL: Record<string, string> = {
  "generation-i": "Gen I",
  "generation-ii": "Gen II",
  "generation-iii": "Gen III",
  "generation-iv": "Gen IV",
  "generation-v": "Gen V",
  "generation-vi": "Gen VI",
  "generation-vii": "Gen VII",
  "generation-viii": "Gen VIII",
  "generation-ix": "Gen IX",
}

function sortTypeNames(names: string[]): string[] {
  const order = POKEMON_TYPE_ORDER as readonly string[]
  return [...names].sort((a, b) => {
    const ia = order.indexOf(a)
    const ib = order.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
}

function badgeTypeOrUnknown(name: string): PokemonBadgeTypeName {
  return (POKEMON_TYPE_ORDER as readonly string[]).includes(name)
    ? (name as PokemonBadgeTypeName)
    : "unknown"
}

function capitalize(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1)
}

export function PokedexFilterMenu({ className }: { className?: string }) {
  const {
    filters,
    toggleGeneration,
    setGenerations,
    togglePrimaryType,
    toggleSecondaryType,
    setLegendaryOnly,
    setMythicalOnly,
    clearFilters,
    hasActiveFilters,
  } = usePokedex()

  const { data: typeNames = [], isLoading: typesLoading } =
    usePokemonTypeNameList()
  const { data: generationNames = [], isLoading: gensLoading } =
    usePokemonGenerationNameList()

  const sortedTypes = sortTypeNames(typeNames)

  const generationRadioValue =
    filters.selectedGenerations.length === 0
      ? "__all__"
      : filters.selectedGenerations.length === 1
        ? filters.selectedGenerations[0]
        : "__multi__"

  return (
    <>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "relative shrink-0",
            hasActiveFilters && "border-primary ring-1 ring-primary/30",
            className,
          )}
          aria-label="Filtros del Pokédex"
        >
          <Filter className="size-3.5" />
          {hasActiveFilters ? (
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-none bg-primary ring-2 ring-background" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-56 max-w-[min(100vw-2rem,22rem)]"
      >
        <DropdownMenuLabel className="text-foreground">
          Filtros
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Generación</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-[min(70vh,24rem)] overflow-y-auto">
            <DropdownMenuLabel className="text-muted-foreground">
              Una generación
            </DropdownMenuLabel>
            {gensLoading ? (
              <DropdownMenuItem disabled>Cargando…</DropdownMenuItem>
            ) : (
              <DropdownMenuRadioGroup
                value={generationRadioValue}
                onValueChange={(v) => {
                  if (v === "__all__") setGenerations([])
                  else if (v === "__multi__") return
                  else setGenerations([v])
                }}
              >
                <DropdownMenuRadioItem value="__all__">Todas</DropdownMenuRadioItem>
                {generationNames.map((name) => (
                  <DropdownMenuRadioItem key={`gen-r-${name}`} value={name}>
                    {GENERATION_LABEL[name] ?? name}
                  </DropdownMenuRadioItem>
                ))}
                <DropdownMenuRadioItem value="__multi__" disabled>
                  Varias (casillas abajo)
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-muted-foreground">
              Varias generaciones — unión (OR)
            </DropdownMenuLabel>
            {gensLoading ? (
              <DropdownMenuItem disabled>Cargando…</DropdownMenuItem>
            ) : (
              generationNames.map((name) => (
                <DropdownMenuCheckboxItem
                  key={`gen-c-${name}`}
                  checked={filters.selectedGenerations.includes(name)}
                  onCheckedChange={() => toggleGeneration(name)}
                >
                  {GENERATION_LABEL[name] ?? name}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Tipo principal</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-64 overflow-y-auto">
            <DropdownMenuLabel className="text-muted-foreground">
              Multi — unión (OR), ranura 1
            </DropdownMenuLabel>
            {typesLoading ? (
              <DropdownMenuItem disabled>Cargando…</DropdownMenuItem>
            ) : (
              sortedTypes.map((name) => (
                <DropdownMenuCheckboxItem
                  key={`p-${name}`}
                  checked={filters.selectedPrimaryTypes.includes(name)}
                  onCheckedChange={() => togglePrimaryType(name)}
                  className="gap-2"
                >
                  <PokemonBadgeType type={badgeTypeOrUnknown(name)}>
                    {capitalize(name)}
                  </PokemonBadgeType>
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Tipo secundario</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-64 overflow-y-auto">
            <DropdownMenuLabel className="text-muted-foreground">
              Multi — unión (OR), ranura 2
            </DropdownMenuLabel>
            {typesLoading ? (
              <DropdownMenuItem disabled>Cargando…</DropdownMenuItem>
            ) : (
              sortedTypes.map((name) => (
                <DropdownMenuCheckboxItem
                  key={`s-${name}`}
                  checked={filters.selectedSecondaryTypes.includes(name)}
                  onCheckedChange={() => toggleSecondaryType(name)}
                  className="gap-2"
                >
                  <PokemonBadgeType type={badgeTypeOrUnknown(name)}>
                    {capitalize(name)}
                  </PokemonBadgeType>
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filters.legendaryOnly}
          onCheckedChange={(v) => setLegendaryOnly(Boolean(v))}
        >
          Solo legendarios
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filters.mythicalOnly}
          onCheckedChange={(v) => setMythicalOnly(Boolean(v))}
        >
          Solo míticos
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={!hasActiveFilters}
          onSelect={() => clearFilters()}
        >
          Limpiar filtros
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}
