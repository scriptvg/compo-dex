import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

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
      type: {
        normal: "bg-gray-500 text-white",
        fire: "bg-red-500 text-white",
        water: "bg-blue-500 text-white",
        grass: "bg-green-500 text-white",
        electric: "bg-yellow-500 text-white",
        ice: "bg-cyan-500 text-white",
        fighting: "bg-red-700 text-white",
        poison: "bg-purple-700 text-white",
        ground: "bg-amber-500 text-white",
        flying: "bg-blue-700 text-white",
        psychic: "bg-pink-700 text-white",
        bug: "bg-green-700 text-white",
        rock: "bg-gray-700 text-white",
        ghost: "bg-purple-700 text-white",
        dragon: "bg-purple-700 text-white",
        dark: "bg-gray-700 text-white",
        steel: "bg-gray-700 text-white",
        fairy: "bg-pink-700 text-white",
        unknown: "bg-gray-500 text-white",
        shadow: "bg-gray-700 text-white",

      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type PokemonBadgeType = NonNullable<
  VariantProps<typeof pokemonBadgeTypeVariants>["type"]
>

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
