"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface EnumTypeProps {
  /** All possible values of the enum / union prop. */
  values: readonly string[]
  /**
   * Named type/enum to render as the trigger (e.g. `PokemonBadgeType`). When
   * set, only the name is shown and the tooltip reveals the concrete values it
   * expands to. When omitted, falls back to showing `preview` values inline.
   */
  name?: string
  /** How many values to render inline before collapsing the rest into the tooltip. */
  preview?: number
  className?: string
}

function EnumToken({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  return (
    <code
      className={cn(
        "rounded-none bg-muted px-1.5 py-0.5 font-mono text-xs whitespace-nowrap text-foreground",
        className
      )}
    >
      &quot;{value}&quot;
    </code>
  )
}

/**
 * Renders an enum/union prop type for the docs API tables: shows the first
 * `preview` values inline and collapses the remainder behind a hover tooltip
 * that lists every option. Keeps long unions (e.g. 21 Pokémon types) readable.
 */
export function EnumType({ values, name, preview = 3, className }: EnumTypeProps) {
  const valuesTooltip = (
    <TooltipContent className="flex max-w-xs flex-wrap gap-1">
      {values.map((value) => (
        <EnumToken
          key={value}
          value={value}
          className="bg-background/15 text-background"
        />
      ))}
    </TooltipContent>
  )

  // Named mode: show the type name, reveal the concrete values on hover.
  if (name) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={`Ver los ${values.length} valores de ${name}`}
              className={cn(
                "cursor-help rounded-none bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-primary",
                className
              )}
            >
              {name}
            </button>
          </TooltipTrigger>
          {valuesTooltip}
        </Tooltip>
      </TooltipProvider>
    )
  }

  // Inline mode: show `preview` values, collapse the rest behind the tooltip.
  const shown = values.slice(0, preview)
  const hidden = values.length - shown.length

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-1", className)}>
      {shown.map((value) => (
        <EnumToken key={value} value={value} />
      ))}

      {hidden > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`Ver las ${values.length} opciones`}
                className="cursor-help rounded-none bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground"
              >
                +{hidden}
              </button>
            </TooltipTrigger>
            {valuesTooltip}
          </Tooltip>
        </TooltipProvider>
      )}
    </span>
  )
}
