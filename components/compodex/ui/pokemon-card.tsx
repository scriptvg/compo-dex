import * as React from "react"

import { cn } from "@/lib/utils"
import { PokemonBadgeType } from "./badge-type"
import { cva } from "class-variance-authority"

const pokemonCardVariants = cva(
  "group/pokemon-card flex flex-col gap-4 overflow-hidden rounded-none bg-card py-4 text-xs/relaxed text-card-foreground ring-1 ring-foreground/10 has-data-[slot=pokemon-card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-2 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=pokemon-card-footer]:pb-0 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
  {
    variants: {
      type: {
        normal: "bg-gray-500/40",
        fire: "bg-red-500/40",
        water: "bg-blue-500/40",
        grass: "bg-green-500/40",
        electric: "bg-yellow-500/40",
        ice: "bg-cyan-500/40",
        fighting: "bg-red-500/40",
        poison: "bg-purple-500/40",
        ground: "bg-amber-500/40",
        flying: "bg-indigo-500/40",
        psychic: "bg-pink-500/40",
        bug: "bg-lime-500/40",
        rock: "bg-amber-500/40",
        ghost: "bg-purple-500/50",
        dragon: "bg-indigo-500/40",
        dark: "bg-gray-500/40",
        steel: "bg-gray-500/40",
        fairy: "bg-pink-500/50",
        unknown: "bg-gray-500/50",
        shadow: "bg-gray-500/50",
      },
      secondary: {
        normal: "",
        fire: "",
        water: "",
        grass: "",
        electric: "",
        ice: "",
        fighting: "",
        poison: "",
        ground: "",
        flying: "",
        psychic: "",
        bug: "",
        rock: "",
        ghost: "",
        dragon: "",
        dark: "",
        steel: "",
        fairy: "",
        unknown: "",
        shadow: "",
      }
    },
    compoundVariants: [
      {
        type: "normal",
        secondary: "normal",
        },
      {
        type: "fire",
        secondary: "fire",
      },
      {
        type: "water",
        secondary: "water",
      },
      {
        type: "grass",
        secondary: "poison",
        className: "bg-gradient-to-r from-green-500/50 to-purple-500/50 backdrop-blur-sm",
      },
      {
        type: "electric",
        secondary: "electric",
      },
      {
        type: "ice",
        secondary: "ice",
      },
      {
        type: "fighting",
        secondary: "fighting",
      },
      {
        type: "poison",
        secondary: "poison",
      },
      {
        type: "ground",
        secondary: "ground",
      },
      {
        type: "flying",
        secondary: "flying",
      },
      {
        type: "psychic",
        secondary: "psychic",
      },
      {
        type: "bug",
        secondary: "bug",
      },
      {
        type: "rock",
        secondary: "rock",
      },
      {
        type: "ghost",
        secondary: "ghost",
      },
      {
        type: "dragon",
        secondary: "dragon",
      },
      {
        type: "dark",
        secondary: "dark",
      },
      {
        type: "steel",
        secondary: "steel",
      },
    ],
    defaultVariants: {
      type: "normal",
      secondary: undefined,
    },
  }
)

function PokemonCard({
  className,
  size = "default",
  type = "normal",
  secondary = undefined,
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm", type?: PokemonBadgeType, secondary?: PokemonBadgeType }) {
  return (
    <div
      data-slot="pokemon-card"
      data-size={size}
      className={cn(
        pokemonCardVariants({ type, secondary }),
        className
      )}
      {...props}
    />
  )
}

function PokemonCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="pokemon-card-header"
      className={cn(
        "group/pokemon-card-header bg-card @container/pokemon-card-header grid auto-rows-min items-start gap-1 rounded-none px-4 group-data-[size=sm]/pokemon-card:px-3 has-data-[slot=pokemon-card-action]:grid-cols-[1fr_auto] has-data-[slot=pokemon-card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/pokemon-card:[.border-b]:pb-3 border px-2 py-1",
        className
      )}
      {...props}
    />
  )
}

function PokemonCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="pokemon-card-title"
      className={cn(
        "font-heading text-sm font-medium group-data-[size=sm]/pokemon-card:text-sm capitalize",
        className
      )}
      {...props}
    />
  )
}

export { PokemonCard, PokemonCardHeader, PokemonCardTitle }