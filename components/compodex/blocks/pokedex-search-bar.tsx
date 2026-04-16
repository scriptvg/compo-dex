"use client"

import { Search, X } from "lucide-react"
import { usePokedex } from "@/contexts/pokedex-context"
import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export function PokedexSearchBar({ className }: { className?: string }) {
  const { searchQuery, setSearchQuery } = usePokedex()

  return (
    <InputGroup
      className={cn(
        "h-8 min-w-0 w-full max-w-full sm:max-w-sm",
        className,
      )}
    >
      <InputGroupInput
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar Pokémon…"
        aria-label="Buscar Pokémon"
        autoComplete="off"
        className="text-xs placeholder:text-muted-foreground"
      />
      {searchQuery && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Limpiar búsqueda"
            disabled={!searchQuery}
            onClick={() => setSearchQuery("")}
          >
            <X className="size-3.5" />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
