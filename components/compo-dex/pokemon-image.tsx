/**
 * @name PokemonImage
 * @description Display Pokémon images with support for different official artwork variants and fallbacks.
 * @base radix
 * @component true
 * @pattern compound components
 * @api https://www.radix-ui.com/primitives/docs/components/avatar#api-reference
 * @doc https://www.radix-ui.com/primitives/docs/components/avatar
 */

import * as React from "react";
import { cn } from "@/lib/utils"; /* utils */
import { cva } from "class-variance-authority"; /* cva */
import { Avatar as AvatarPrimitive } from "radix-ui"; /* radix-ui */

const pokemonImageVariants = cva(
  "relative aspect-square overflow-hidden group/pokemon-image rounded-none bg-muted/40",
  {
    variants: {
      size: {
        sm: "size-12",
        md: "size-32",
        lg: "size-40",
        xl: "size-48",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function PokemonImage({
  className,
  size = "md",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="pokemon-image"
      className={cn(pokemonImageVariants({ size }), className)}
      {...props}
    />
  );
}

function PokemonSprite({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn(
        "h-full w-full object-contain transition-opacity duration-300",
        className,
      )}
      {...props}
    />
  );
}

function PokemonFallback({
  className,
  isError = false,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  isError?: boolean;
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="pokemon-fallback"
      className={cn(
        "bg-muted text-muted-foreground rounded-md flex size-full items-center justify-center text-sm group-data-[size=sm]/pokemon-image:text-xs",
        isError && "bg-red-500",
        className,
      )}
      {...props}
    />
  );
}

export { PokemonImage, PokemonSprite, PokemonFallback };
