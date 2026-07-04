import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { POKEMON_TYPE_COLOR, type PokemonBadgeType } from "./badge-type"

/**
 * Card surface for a single Pokémon.
 *
 * A Pokémon has exactly one primary type and an optional secondary type —
 * never more — so the surface is modelled with those two slots:
 *   • one type  → solid tint of that type
 *   • two types → primary → secondary gradient
 *
 * Color comes from the `--color-type-*` theme tokens (same source as
 * `PokemonBadgeType`), so all 441 type pairings are covered with no
 * per-combination CSS. `data-type` / `data-secondary` are exposed for
 * consumers that want to drive their own state styling.
 */
const POKEMON_CARD_BASE =
  "group/pokemon-card relative flex flex-col gap-4 overflow-hidden rounded-none bg-card p-2 text-xs/relaxed text-card-foreground ring-1 ring-foreground/10 data-[size=sm]:gap-2 data-[size=sm]:p-1.5"

function tint(type: PokemonBadgeType) {
  return `color-mix(in oklab, ${POKEMON_TYPE_COLOR[type]} 50%, transparent)`
}

export type PokemonCardProps = React.ComponentProps<"article"> & {
  size?: "default" | "sm"
  /** Mega-evolved form: replaces the type surface with the animated rainbow. */
  mega?: boolean
  /** Primary type — always present. Drives the card surface. */
  type?: PokemonBadgeType
  /** Optional secondary type. When set, the surface is a primary → secondary gradient. */
  secondary?: PokemonBadgeType
}

function PokemonCard({
  className,
  size = "default",
  mega = false,
  type = "normal",
  secondary,
  style,
  ...props
}: PokemonCardProps) {
  // Mega forms use the animated rainbow surface (its own `background`),
  // so we only set a type surface when the card isn't a Mega.
  const surface = mega
    ? undefined
    : secondary
      ? `linear-gradient(to right, ${tint(type)}, ${tint(secondary)})`
      : tint(type)

  return (
    <article
      data-slot="pokemon-card"
      data-size={size}
      data-type={type}
      data-secondary={secondary}
      className={cn(
        POKEMON_CARD_BASE,
        mega && "rainbow-animated",
        className
      )}
      style={surface ? { background: surface, ...style } : style}
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
        "group/pokemon-card-header @container/pokemon-card-header grid auto-rows-min items-start gap-1 rounded-none border bg-card px-2 py-1 group-data-[size=sm]/pokemon-card:px-1.5 group-data-[size=sm]/pokemon-card:py-0.5 has-data-[slot=pokemon-card-action]:grid-cols-[1fr_auto] has-data-[slot=pokemon-card-description]:grid-rows-[auto_auto]",
        className
      )}
      {...props}
    />
  )
}

export type PokemonCardTitleProps = React.ComponentProps<"h3">

function PokemonCardTitle({ className, ...props }: PokemonCardTitleProps) {
  return (
    <h3
      data-slot="pokemon-card-title"
      className={cn(
        "font-heading text-sm font-medium group-data-[size=sm]/pokemon-card:text-sm capitalize",
        className
      )}
      {...props}
    />
  )
}

export type PokemonCardDescriptionProps = React.ComponentProps<"p">

function PokemonCardDescription({
  className,
  ...props
}: PokemonCardDescriptionProps) {
  return (
    <p
      data-slot="pokemon-card-description"
      className={cn("text-xs/relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export type PokemonCardActionProps = React.ComponentProps<"div">

function PokemonCardAction({ className, ...props }: PokemonCardActionProps) {
  return (
    <div
      data-slot="pokemon-card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

export type PokemonCardContentProps = React.ComponentProps<"div">

function PokemonCardContent({ className, ...props }: PokemonCardContentProps) {
  return (
    <div
      data-slot="pokemon-card-content"
      className={cn(
        "px-2 group-data-[size=sm]/pokemon-card:px-1.5",
        className
      )}
      {...props}
    />
  )
}

export type PokemonCardFooterProps = React.ComponentProps<"div">

function PokemonCardFooter({ className, ...props }: PokemonCardFooterProps) {
  return (
    <div
      data-slot="pokemon-card-footer"
      className={cn(
        "flex items-center rounded-none border bg-card px-2 py-1 group-data-[size=sm]/pokemon-card:px-1.5 group-data-[size=sm]/pokemon-card:py-0.5",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------- Media ---------------------------------- */

export type PokemonCardMediaProps = React.ComponentProps<"div">

/**
 * Relative figure area for the sprite. Holds the artwork and acts as the
 * positioning context for any `<PokemonCardOverlay>` placed inside it.
 */
function PokemonCardMedia({ className, ...props }: PokemonCardMediaProps) {
  return (
    <div
      data-slot="pokemon-card-media"
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden bg-card",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------- Overlay --------------------------------- */

const pokemonCardOverlayVariants = cva("absolute z-10 flex flex-wrap gap-1", {
  variants: {
    position: {
      "top-left": "left-2 top-2 max-w-[70%] justify-start",
      "top-right": "right-2 top-2 max-w-[70%] justify-end",
      "bottom-left": "bottom-2 left-2 max-w-[calc(100%-1rem)] justify-start",
      "bottom-right": "bottom-2 right-2 max-w-[70%] justify-end",
    },
  },
  defaultVariants: {
    position: "top-left",
  },
})

export type PokemonCardOverlayProps = React.ComponentProps<"div"> & {
  /** Corner the overlay anchors to. Defaults to `top-left`. */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

/**
 * Absolutely-positioned slot for chips over the artwork (dex number, type
 * badges, status flags). Anchors to a corner of the nearest positioned
 * ancestor — `<PokemonCardMedia>` when present, otherwise the card.
 */
function PokemonCardOverlay({
  className,
  position = "top-left",
  ...props
}: PokemonCardOverlayProps) {
  return (
    <div
      data-slot="pokemon-card-overlay"
      data-position={position}
      className={cn(pokemonCardOverlayVariants({ position }), className)}
      {...props}
    />
  )
}

/* -------------------------------- Number --------------------------------- */

export type PokemonCardNumberProps = React.ComponentProps<"span">

/** Dex-number chip (e.g. `#025`). Formatting is up to the consumer. */
function PokemonCardNumber({ className, ...props }: PokemonCardNumberProps) {
  return (
    <span
      data-slot="pokemon-card-number"
      className={cn(
        "inline-flex h-5 items-center justify-center rounded-none bg-foreground px-2 py-0.5 text-xs font-medium tabular-nums text-background",
        className
      )}
      {...props}
    />
  )
}

export {
  PokemonCard,
  PokemonCardHeader,
  PokemonCardTitle,
  PokemonCardDescription,
  PokemonCardAction,
  PokemonCardContent,
  PokemonCardFooter,
  PokemonCardMedia,
  PokemonCardOverlay,
  PokemonCardNumber,
}
