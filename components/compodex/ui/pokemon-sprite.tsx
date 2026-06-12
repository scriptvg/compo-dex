"use client"

import * as React from "react"
import { Avatar as PokemonSpritePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/** Square size scale. `default` is size-8; `card` is sized to drop into a
 *  `<PokemonCardMedia>` slot. */
export type PokemonSpriteSize =
  | "xs"
  | "sm"
  | "default"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "card"

export type PokemonSpriteProps = React.ComponentProps<
  typeof PokemonSpritePrimitive.Root
> & {
  size?: PokemonSpriteSize
}

function PokemonSprite({
  className,
  size = "default",
  ...props
}: PokemonSpriteProps) {
  return (
    <PokemonSpritePrimitive.Root
      data-slot="pokemon-sprite"
      data-size={size}
      className={cn(
        "group/pokemon-sprite relative flex aspect-square size-8 shrink-0 select-none after:absolute after:inset-0 after:mix-blend-darken dark:after:mix-blend-lighten",
        "data-[size=2xl]:size-36 data-[size=card]:size-40 data-[size=lg]:size-20 data-[size=md]:size-10 data-[size=sm]:size-6 data-[size=xl]:size-28 data-[size=xs]:size-5",
        className
      )}
      {...props}
    />
  )
}

export type PokemonSpriteImageProps = React.ComponentProps<
  typeof PokemonSpritePrimitive.Image
>

function PokemonSpriteImage({ className, ...props }: PokemonSpriteImageProps) {
  return (
    <PokemonSpritePrimitive.Image
      data-slot="pokemon-sprite-image"
      className={cn("size-full object-contain", className)}
      {...props}
    />
  )
}

export type PokemonSpriteFallbackProps = React.ComponentProps<
  typeof PokemonSpritePrimitive.Fallback
>

function PokemonSpriteFallback({
  className,
  ...props
}: PokemonSpriteFallbackProps) {
  return (
    <PokemonSpritePrimitive.Fallback
      data-slot="pokemon-sprite-fallback"
      className={cn(
        "flex size-full items-center justify-center bg-muted text-sm text-muted-foreground",
        "group-data-[size=2xl]/pokemon-sprite:text-4xl group-data-[size=card]/pokemon-sprite:text-5xl group-data-[size=lg]/pokemon-sprite:text-xl group-data-[size=sm]/pokemon-sprite:text-xs group-data-[size=xl]/pokemon-sprite:text-3xl group-data-[size=xs]/pokemon-sprite:text-[0.625rem]",
        className
      )}
      {...props}
    />
  )
}

export type PokemonSpriteBadgeProps = React.ComponentProps<"span">

function PokemonSpriteBadge({ className, ...props }: PokemonSpriteBadgeProps) {
  return (
    <span
      data-slot="pokemon-sprite-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=xs]/pokemon-sprite:size-1.5 group-data-[size=xs]/pokemon-sprite:[&>svg]:hidden",
        "group-data-[size=sm]/pokemon-sprite:size-2 group-data-[size=sm]/pokemon-sprite:[&>svg]:hidden",
        "group-data-[size=default]/pokemon-sprite:size-2.5 group-data-[size=default]/pokemon-sprite:[&>svg]:size-2",
        "group-data-[size=md]/pokemon-sprite:size-3 group-data-[size=md]/pokemon-sprite:[&>svg]:size-2",
        "group-data-[size=lg]/pokemon-sprite:size-4 group-data-[size=lg]/pokemon-sprite:[&>svg]:size-2.5",
        "group-data-[size=xl]/pokemon-sprite:size-5 group-data-[size=xl]/pokemon-sprite:[&>svg]:size-3",
        "group-data-[size=2xl]/pokemon-sprite:size-6 group-data-[size=2xl]/pokemon-sprite:[&>svg]:size-3.5",
        "group-data-[size=card]/pokemon-sprite:size-6 group-data-[size=card]/pokemon-sprite:[&>svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

export type PokemonSpriteGroupProps = React.ComponentProps<"div">

function PokemonSpriteGroup({ className, ...props }: PokemonSpriteGroupProps) {
  return (
    <div
      data-slot="pokemon-sprite-group"
      className={cn(
        "group/pokemon-sprite-group flex -space-x-2 *:data-[slot=pokemon-sprite]:rounded-full *:data-[slot=pokemon-sprite]:bg-muted *:data-[slot=pokemon-sprite]:p-1 *:data-[slot=pokemon-sprite]:ring-2 *:data-[slot=pokemon-sprite]:ring-background",
        className
      )}
      {...props}
    />
  )
}

export type PokemonSpriteGroupCountProps = React.ComponentProps<"div">

function PokemonSpriteGroupCount({
  className,
  ...props
}: PokemonSpriteGroupCountProps) {
  return (
    <div
      data-slot="pokemon-sprite-group-count"
      className={cn(
        // Mirrors the sprite size used in the group so the count chip
        // lines up with the avatars next to it.
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground ring-2 ring-background [&>svg]:size-4",
        "group-has-data-[size=xs]/pokemon-sprite-group:size-5 group-has-data-[size=xs]/pokemon-sprite-group:text-[0.625rem]",
        "group-has-data-[size=sm]/pokemon-sprite-group:size-6 group-has-data-[size=sm]/pokemon-sprite-group:text-xs group-has-data-[size=sm]/pokemon-sprite-group:[&>svg]:size-3",
        "group-has-data-[size=md]/pokemon-sprite-group:size-10 group-has-data-[size=md]/pokemon-sprite-group:text-sm",
        "group-has-data-[size=lg]/pokemon-sprite-group:size-20 group-has-data-[size=lg]/pokemon-sprite-group:text-2xl group-has-data-[size=lg]/pokemon-sprite-group:[&>svg]:size-5",
        "group-has-data-[size=xl]/pokemon-sprite-group:size-28 group-has-data-[size=xl]/pokemon-sprite-group:text-3xl group-has-data-[size=xl]/pokemon-sprite-group:[&>svg]:size-6",
        "group-has-data-[size=2xl]/pokemon-sprite-group:size-36 group-has-data-[size=2xl]/pokemon-sprite-group:text-4xl",
        "group-has-data-[size=card]/pokemon-sprite-group:size-40 group-has-data-[size=card]/pokemon-sprite-group:text-4xl",
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
