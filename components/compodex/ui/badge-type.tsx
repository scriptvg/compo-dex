import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Background + text classes shared by type badges and type swatches.
 * Backed by the `--color-type-*` theme tokens (see `pokemon-type-colors`
 * in the registry).
 */
export const POKEMON_TYPE_SURFACE = {
  normal: "bg-type-normal text-white",
  fire: "bg-type-fire text-white",
  water: "bg-type-water text-white",
  electric: "bg-type-electric text-white",
  grass: "bg-type-grass text-white",
  ice: "bg-type-ice text-white",
  fighting: "bg-type-fighting text-white",
  poison: "bg-type-poison text-white",
  ground: "bg-type-ground text-white",
  flying: "bg-type-flying text-white",
  psychic: "bg-type-psychic text-white",
  bug: "bg-type-bug text-white",
  rock: "bg-type-rock text-white",
  ghost: "bg-type-ghost text-white",
  dragon: "bg-type-dragon text-white",
  dark: "bg-type-dark text-white",
  steel: "bg-type-steel text-white",
  fairy: "bg-type-fairy text-white",
  stellar: "bg-type-stellar text-white",
  unknown: "bg-type-unknown text-white",
  shadow: "bg-type-shadow text-white",
} as const

export type PokemonBadgeType = keyof typeof POKEMON_TYPE_SURFACE

/**
 * Color value per type, fed into the `--pokemon-type` CSS variable so every
 * variant (solid/soft/outline/ghost) derives its color from a single source:
 * the `--color-type-*` theme tokens.
 */
export const POKEMON_TYPE_COLOR = {
  normal: "var(--color-type-normal)",
  fire: "var(--color-type-fire)",
  water: "var(--color-type-water)",
  electric: "var(--color-type-electric)",
  grass: "var(--color-type-grass)",
  ice: "var(--color-type-ice)",
  fighting: "var(--color-type-fighting)",
  poison: "var(--color-type-poison)",
  ground: "var(--color-type-ground)",
  flying: "var(--color-type-flying)",
  psychic: "var(--color-type-psychic)",
  bug: "var(--color-type-bug)",
  rock: "var(--color-type-rock)",
  ghost: "var(--color-type-ghost)",
  dragon: "var(--color-type-dragon)",
  dark: "var(--color-type-dark)",
  steel: "var(--color-type-steel)",
  fairy: "var(--color-type-fairy)",
  stellar: "var(--color-type-stellar)",
  unknown: "var(--color-type-unknown)",
  shadow: "var(--color-type-shadow)",
} as const satisfies Record<PokemonBadgeType, string>

/** Display order (main types first, then special). */
export const POKEMON_TYPE_ORDER = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
  "stellar",
  "unknown",
  "shadow",
] as const satisfies readonly PokemonBadgeType[]

const pokemonBadgeTypeVariants = cva(
  "group/badge-type inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-none border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        solid:
          "border-transparent bg-(--pokemon-type) text-white [a]:hover:bg-(--pokemon-type)/80",
        soft: "border-transparent bg-(--pokemon-type)/10 text-(--pokemon-type) [a]:hover:bg-(--pokemon-type)/20",
        outline:
          "border-(--pokemon-type) text-(--pokemon-type) [a]:hover:bg-(--pokemon-type)/10",
        ghost:
          "border-transparent text-(--pokemon-type) [a]:hover:bg-(--pokemon-type)/10",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
)

export type PokemonBadgeTypeProps = React.ComponentProps<"span"> &
  VariantProps<typeof pokemonBadgeTypeVariants> & {
    type?: PokemonBadgeType
    asChild?: boolean
  }

function PokemonBadgeType({
  type = "normal",
  className,
  variant = "solid",
  asChild = false,
  style,
  ...props
}: PokemonBadgeTypeProps) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="pokemon-badge-type"
      data-type={type}
      data-variant={variant}
      className={cn(pokemonBadgeTypeVariants({ variant }), className)}
      style={
        {
          "--pokemon-type": POKEMON_TYPE_COLOR[type],
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { PokemonBadgeType, pokemonBadgeTypeVariants }
