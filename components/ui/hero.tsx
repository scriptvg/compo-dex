

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function Hero({
  className,
  ...props
}: React.ComponentProps<"section"> & { className?: string }) {
  return (
    <section
      className={cn(
        "mx-auto flex min-h-[calc(100dvh-2rem)] w-full scroll-mt-24 items-center justify-center px-4 sm:px-6 border-b border-dashed",
        className
      )}
      {...props}
    />
  )
}

Hero.Container = function HeroContainer({
  className,
  ...props
}: React.ComponentProps<"div"> & { className?: string }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-3xl py-6 text-center", className)}
      {...props}
    />
  )
}

Hero.Badge = function HeroBadge({
  asChild = true,
  variant = "secondary",
  className,
  ...props
}: React.ComponentProps<typeof Badge> & { className?: string }) {
  return (
    <Badge
      asChild={asChild}
      className={cn("rounded-full border-border py-1", className)}
      variant={variant}
      {...props}
    />
  )
}

Hero.Title = function HeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1"> & { className?: string }) {
  return (
    <h1
      className={cn(
        "font-satoshi mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl",
        className
      )}
      {...props}
    />
  )
}

Hero.Description = function HeroDescription({
  className,
  ...props
}: React.ComponentProps<"p"> & { className?: string }) {
  return (
    <p
      className={cn("mt-6 text-foreground/80 md:text-lg", className)}
      {...props}
    />
  )
}

Hero.CTA = function HeroCTA({
  className,
  ...props
}: React.ComponentProps<"div"> & { className?: string }) {
  return (
    <div
      className={cn(
        "mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4",
        className
      )}
      {...props}
    />
  )
}

export { Hero }
