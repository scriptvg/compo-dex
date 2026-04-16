import * as React from "react"

import { cn } from "@/lib/utils"
import { PokemonBadgeType } from "./badge-type"
import { cva } from "class-variance-authority"



const pokemonCardVariants = cva(
    "group/pokemon-card flex flex-col gap-4 overflow-hidden rounded-none bg-card py-4 text-xs/relaxed text-card-foreground ring-1 ring-foreground/10 has-data-[slot=pokemon-card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-2 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=pokemon-card-footer]:pb-0 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
    {
        variants: {
            type: {
                normal: "bg-stone-400/50",
                fire: "bg-red-500/50",
                water: "bg-blue-500/50",
                electric: "bg-yellow-400/50",
                grass: "bg-green-500/50",
                ice: "bg-cyan-300/50",
                fighting: "bg-rose-700/50",
                poison: "bg-violet-600/50",
                ground: "bg-amber-600/50",
                flying: "bg-indigo-400/50",
                psychic: "bg-pink-500/50",
                bug: "bg-lime-500/50",
                rock: "bg-yellow-700/50",
                ghost: "bg-purple-800/50",
                dragon: "bg-fuchsia-700/50",
                dark: "bg-neutral-800/50",
                steel: "bg-slate-500/50",
                fairy: "bg-pink-300/50",
                stellar: "bg-violet-500/50",
                unknown: "bg-gray-500/50",
                shadow: "bg-gray-800/50",
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
                stellar: "",
                unknown: "",
                shadow: "",
            },
            isMega: {
                true: "rainbow-animated",
                false: "",
            }
        },
        compoundVariants: [
            {
                type: "normal",
                secondary: "flying",
                className: "bg-gradient-to-r from-stone-400/50 to-indigo-400/50",
            },
            {
                type: "normal",
                secondary: "fairy",
                className: "bg-gradient-to-r from-stone-400/50 to-pink-300/50",
            },
            {
                type: "fire",
                secondary: "flying",
                className: "bg-gradient-to-r from-red-500/50 to-indigo-400/50",
            },
            {
                type: "water",
                secondary: "fighting",
                className: "bg-gradient-to-r from-blue-500/50 to-rose-700/50",
            },
            {
                type: "water",
                secondary: "ice",
                className: "bg-gradient-to-r from-blue-500/50 to-cyan-300/50",
            },
            {
                type: "water",
                secondary: "poison",
                className: "bg-gradient-to-r from-blue-500/50 to-purple-600/50",
            },
            {
                type: "water",
                secondary: "psychic",
                className: "bg-gradient-to-r from-blue-500/50 to-pink-500/50",
            },
            {
                type: "water",
                secondary: "flying",
                className: "bg-gradient-to-r from-blue-500/50 to-indigo-400/50",
            },
            {
                type: "water",
                secondary: "electric",
                className: "bg-gradient-to-r from-blue-500/50 to-yellow-400/50",
            },
            {
                type: "water",
                secondary: "fairy",
                className: "bg-gradient-to-r from-blue-500/50 to-pink-300/50",
            },
            {
                type: "grass",
                secondary: "poison",
                className: "bg-gradient-to-r from-green-500/50 to-purple-600/50",
            },
            {
                type: "grass",
                secondary: "psychic",
                className: "bg-gradient-to-r from-green-500/50 to-pink-500/50",
            },
            {
                type: "grass",
                secondary: "flying",
                className: "bg-gradient-to-r from-green-500/50 to-indigo-400/50",
            },
            {
                type: "electric",
                secondary: "steel",
                className: "bg-gradient-to-r from-yellow-400/50 to-slate-500/50",
            },
            {
                type: "electric",
                secondary: "flying",
                className: "bg-gradient-to-r from-yellow-400/50 to-indigo-400/50",
            },
            {
                type: "ice",
                secondary: "psychic",
                className: "bg-gradient-to-r from-cyan-300/50 to-pink-500/50",
            },
            {
                type: "ice",
                secondary: "flying",
                className: "bg-gradient-to-r from-cyan-300/50 to-indigo-400/50",
            },
            {
                type: "fighting",
                secondary: "fighting",
            },
            {
                type: "poison",
                secondary: "ground",
                className: "bg-gradient-to-r from-violet-600/50 to-amber-600/50",
            },
            {
                type: "poison",
                secondary: "flying",
                className: "bg-gradient-to-r from-violet-600/50 to-indigo-400/50",
            },
            {
                type: "ground",
                secondary: "rock",
                className: "bg-gradient-to-r from-amber-600/50 to-yellow-700/50",
            },
            {
                type: "flying",
                secondary: "flying",
            },
            {
                type: "psychic",
                secondary: "fairy",
                className: "bg-gradient-to-r from-pink-500/50 to-pink-300/50",
            },
            {
                type: "psychic",
                secondary: "flying",
                className: "bg-gradient-to-r from-pink-500/50 to-indigo-400/50",
            },
            {
                type: "bug",
                secondary: "poison",
                className: "bg-gradient-to-r from-lime-500/50 to-purple-600/50",
            },
            {
                type: "bug",
                secondary: "flying",
                className: "bg-gradient-to-r from-lime-500/50 to-indigo-400/50",
            },
            {
                type: "bug",
                secondary: "grass",
                className: "bg-gradient-to-r from-lime-500/50 to-green-500/50",
            },
            {
                type: "rock",
                secondary: "ground",
                className: "bg-gradient-to-r from-yellow-700/50 to-amber-600/50",
            },
            {
                type: "rock",
                secondary: "flying",
                className: "bg-gradient-to-r from-yellow-700/50 to-indigo-400/50",
            },
            {
                type: "rock",
                secondary: "water",
                className: "bg-gradient-to-r from-yellow-700/50 to-blue-500/50",
            },
            {
                type: "ghost",
                secondary: "poison",
                className: "bg-gradient-to-r from-purple-800/50 to-violet-600/50",
            },
            {
                type: "dragon",
                secondary: "flying",
                className: "bg-gradient-to-r from-fuchsia-700/50 to-indigo-400/50",
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
    isMega = false,
    type = "normal",
    secondary = undefined,
    ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm", isMega?: boolean, type?: PokemonBadgeType, secondary?: PokemonBadgeType }) {
    return (
        <div
            data-slot="pokemon-card"
            data-size={size}
            className={cn(
                pokemonCardVariants({ type, secondary, isMega }),
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