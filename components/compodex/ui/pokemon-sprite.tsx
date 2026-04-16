"use client"

import * as React from "react"
import { Avatar as PokemonSpritePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function PokemonSprite({
    className,
    size = "default",
    ...props
}: React.ComponentProps<typeof PokemonSpritePrimitive.Root> & {
    size?: "default" | "sm" | "lg"
    
}) {
    return (
        <PokemonSpritePrimitive.Root
            data-slot="pokemon-sprite"
            data-size={size}
            className={cn(
                "group/pokemon-sprite relative flex size-8 shrink-0 aspect-square select-none after:absolute after:inset-0 after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
                className
            )}
            {...props}
        />
    )
}

function PokemonSpriteImage({
    className,
    ...props
}: React.ComponentProps<typeof PokemonSpritePrimitive.Image>) {
    return (
        <PokemonSpritePrimitive.Image
            data-slot="pokemon-sprite-image"
            className={cn(
                "size-full object-contain",
                className
            )}
            {...props}
        />
    )
}

function PokemonSpriteFallback({
    className,
    ...props
}: React.ComponentProps<typeof PokemonSpritePrimitive.Fallback>) {
    return (
        <PokemonSpritePrimitive.Fallback
            data-slot="pokemon-sprite-fallback"
            className={cn(
                "flex size-full items-center justify-center bg-muted text-sm text-muted-foreground group-data-[size=sm]/pokemon-sprite:text-xs",
                className
            )}
            {...props}
        />
    )
}

function PokemonSpriteBadge({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="pokemon-sprite-badge"
            className={cn(
                "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
                "group-data-[size=sm]/pokemon-sprite:size-2 group-data-[size=sm]/pokemon-sprite:[&>svg]:hidden",
                "group-data-[size=default]/pokemon-sprite:size-2.5 group-data-[size=default]/pokemon-sprite:[&>svg]:size-2",
                "group-data-[size=lg]/pokemon-sprite:size-3 group-data-[size=lg]/pokemon-sprite:[&>svg]:size-2",
                className
            )}
            {...props}
        />
    )
}

function PokemonSpriteGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="pokemon-sprite-group"
            className={cn(
                "group/pokemon-sprite-group flex -space-x-2 *:data-[slot=pokemon-sprite]:ring-2 *:data-[slot=pokemon-sprite]:ring-background",
                className
            )}
            {...props}
        />
    )
}

function PokemonSpriteGroupCount({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="pokemon-sprite-group-count"
            className={cn(
                "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/pokemon-sprite-group:size-10 group-has-data-[size=sm]/pokemon-sprite-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/pokemon-sprite-group:[&>svg]:size-5 group-has-data-[size=sm]/pokemon-sprite-group:[&>svg]:size-3",
                className
            )}
            {...props}
        />
    )
}

export {
    PokemonSprite,
    PokemonSpriteImage,
    PokemonSpriteFallback,
    PokemonSpriteGroup,
    PokemonSpriteGroupCount,
    PokemonSpriteBadge,
}
