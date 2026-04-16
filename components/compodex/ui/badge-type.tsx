import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/** Background + text classes shared by type badges and type swatches. */
export const POKEMON_TYPE_SURFACE = {
  normal: "bg-stone-400 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-white",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-white",
  fighting: "bg-rose-700 text-white",
  poison: "bg-violet-600 text-white",
  ground: "bg-amber-600 text-white",
  flying: "bg-indigo-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-white",
  rock: "bg-yellow-700 text-white",
  ghost: "bg-purple-800 text-white",
  dragon: "bg-fuchsia-700 text-white",
  dark: "bg-neutral-800 text-white",
  steel: "bg-slate-500 text-white",
  fairy: "bg-pink-300 text-white",
  stellar: "bg-violet-500 text-white",
  unknown: "bg-gray-500 text-white",
  shadow: "bg-gray-800 text-white",
} as const

export type PokemonBadgeType = keyof typeof POKEMON_TYPE_SURFACE

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
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      type: POKEMON_TYPE_SURFACE,
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function PokemonBadgeType({
  type = "normal",
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof pokemonBadgeTypeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="pokemon-badge-type"
      data-type={type}
      data-variant={variant}
      className={cn(pokemonBadgeTypeVariants({ variant, type }), className)}
      {...props}
    />
  )
}

export { PokemonBadgeType, pokemonBadgeTypeVariants }
