import * as React from "react"

import { cn } from "@/lib/utils"
import { PokemonBadgeType } from "./badge-type"
import { cva } from "class-variance-authority"



const pokemonCardVariants = cva(
    "group/pokemon-card flex flex-col gap-4 overflow-hidden rounded-none bg-card py-4 text-xs/relaxed text-card-foreground ring-1 ring-foreground/10 has-data-[slot=pokemon-card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-2 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=pokemon-card-footer]:pb-0 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
    {
        variants: {
            type: {
                normal: "bg-type-normal/50",
                fire: "bg-type-fire/50",
                water: "bg-type-water/50",
                electric: "bg-type-electric/50",
                grass: "bg-type-grass/50",
                ice: "bg-type-ice/50",
                fighting: "bg-type-fighting/50",
                poison: "bg-type-poison/50",
                ground: "bg-type-ground/50",
                flying: "bg-type-flying/50",
                psychic: "bg-type-psychic/50",
                bug: "bg-type-bug/50",
                rock: "bg-type-rock/50",
                ghost: "bg-type-ghost/50",
                dragon: "bg-type-dragon/50",
                dark: "bg-type-dark/50",
                steel: "bg-type-steel/50",
                fairy: "bg-type-fairy/50",
                stellar: "bg-type-stellar/50",
                unknown: "bg-type-unknown/50",
                shadow: "bg-type-shadow/50",
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
                className: "bg-gradient-to-r from-type-normal/50 to-type-flying/50",
            },
            {
                type: "normal",
                secondary: "fairy",
                className: "bg-gradient-to-r from-type-normal/50 to-type-fairy/50",
            },
            {
                type: "fire",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-fire/50 to-type-flying/50",
            },
            {
                type: "water",
                secondary: "fighting",
                className: "bg-gradient-to-r from-type-water/50 to-type-fighting/50",
            },
            {
                type: "water",
                secondary: "ice",
                className: "bg-gradient-to-r from-type-water/50 to-type-ice/50",
            },
            {
                type: "water",
                secondary: "poison",
                className: "bg-gradient-to-r from-type-water/50 to-type-poison/50",
            },
            {
                type: "water",
                secondary: "psychic",
                className: "bg-gradient-to-r from-type-water/50 to-type-psychic/50",
            },
            {
                type: "water",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-water/50 to-type-flying/50",
            },
            {
                type: "water",
                secondary: "electric",
                className: "bg-gradient-to-r from-type-water/50 to-type-electric/50",
            },
            {
                type: "water",
                secondary: "fairy",
                className: "bg-gradient-to-r from-type-water/50 to-type-fairy/50",
            },
            {
                type: "grass",
                secondary: "poison",
                className: "bg-gradient-to-r from-type-grass/50 to-type-poison/50",
            },
            {
                type: "grass",
                secondary: "psychic",
                className: "bg-gradient-to-r from-type-grass/50 to-type-psychic/50",
            },
            {
                type: "grass",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-grass/50 to-type-flying/50",
            },
            {
                type: "electric",
                secondary: "steel",
                className: "bg-gradient-to-r from-type-electric/50 to-type-steel/50",
            },
            {
                type: "electric",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-electric/50 to-type-flying/50",
            },
            {
                type: "ice",
                secondary: "psychic",
                className: "bg-gradient-to-r from-type-ice/50 to-type-psychic/50",
            },
            {
                type: "ice",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-ice/50 to-type-flying/50",
            },
            {
                type: "fighting",
                secondary: "fighting",
            },
            {
                type: "poison",
                secondary: "ground",
                className: "bg-gradient-to-r from-type-poison/50 to-type-ground/50",
            },
            {
                type: "poison",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-poison/50 to-type-flying/50",
            },
            {
                type: "ground",
                secondary: "rock",
                className: "bg-gradient-to-r from-type-ground/50 to-type-rock/50",
            },
            {
                type: "flying",
                secondary: "flying",
            },
            {
                type: "psychic",
                secondary: "fairy",
                className: "bg-gradient-to-r from-type-psychic/50 to-type-fairy/50",
            },
            {
                type: "psychic",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-psychic/50 to-type-flying/50",
            },
            {
                type: "bug",
                secondary: "poison",
                className: "bg-gradient-to-r from-type-bug/50 to-type-poison/50",
            },
            {
                type: "bug",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-bug/50 to-type-flying/50",
            },
            {
                type: "bug",
                secondary: "grass",
                className: "bg-gradient-to-r from-type-bug/50 to-type-grass/50",
            },
            {
                type: "rock",
                secondary: "ground",
                className: "bg-gradient-to-r from-type-rock/50 to-type-ground/50",
            },
            {
                type: "rock",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-rock/50 to-type-flying/50",
            },
            {
                type: "rock",
                secondary: "water",
                className: "bg-gradient-to-r from-type-rock/50 to-type-water/50",
            },
            {
                type: "ghost",
                secondary: "poison",
                className: "bg-gradient-to-r from-type-ghost/50 to-type-poison/50",
            },
            {
                type: "dragon",
                secondary: "flying",
                className: "bg-gradient-to-r from-type-dragon/50 to-type-flying/50",
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

export type PokemonCardProps = React.ComponentProps<"div"> & {
    size?: "default" | "sm"
    isMega?: boolean
    type?: PokemonBadgeType
    secondary?: PokemonBadgeType
}

function PokemonCard({
    className,
    size = "default",
    isMega = false,
    type = "normal",
    secondary = undefined,
    ...props
}: PokemonCardProps) {
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

export type PokemonCardHeaderProps = React.ComponentProps<"div">

function PokemonCardHeader({ className, ...props }: PokemonCardHeaderProps) {
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

export type PokemonCardTitleProps = React.ComponentProps<"div">

function PokemonCardTitle({ className, ...props }: PokemonCardTitleProps) {
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