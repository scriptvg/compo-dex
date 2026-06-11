    "use client"

    import Link from "next/link";
    import { Badge } from "@/components/ui/badge";
    import { ArrowUpRight, CirclePlay } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { CLICommand } from "@/components/ui/cli-command";
    import { cn } from "@/lib/utils";
    import { Slot as SlotPrimitive } from "radix-ui";
    import { cva, VariantProps } from "class-variance-authority";


    function Hero({
        className,
        ...props
    }: React.ComponentProps<"section"> & { className?: string }) {
        return (
            <section className={cn("flex min-h-[calc(100dvh-2rem)] mx-auto border-b border-dashed w-full items-center justify-center px-4 sm:px-6 scroll-mt-24", className)} {...props} />
        );
    }

    const heroMediaVariants = cva(
        "flex items-center justify-center",
        {
            variants: {
                variant: {
                    default: "bg-transparent",
                    image: "size-10 overflow-hidden rounded-none group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
                    video: "size-10 overflow-hidden rounded-none group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_video]:size-full [&_video]:object-cover",
                    audio: "size-10 overflow-hidden rounded-none group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_audio]:size-full [&_audio]:object-cover",
                    document: "size-10 overflow-hidden rounded-none group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_document]:size-full [&_document]:object-cover",
                    code: "size-10 overflow-hidden rounded-none group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_code]:size-full [&_code]:object-cover",
                    table: "size-10 overflow-hidden rounded-none group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_table]:size-full [&_table]:object-cover",
                    chart: "size-10 overflow-hidden rounded-none group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_chart]:size-full [&_chart]:object-cover",
                    map: "size-10 overflow-hidden rounded-none group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_map]:size-full [&_map]:object-cover",
                },
                defaultVariants: {
                    variant: "default",
                }
            }
        }
    )
    function HeroMedia({
        className,
        variant = "default",
        ...props
    }: React.ComponentProps<"div"> & VariantProps<typeof heroMediaVariants>) {
        return (
            <div
                data-slot="hero-media"
                data-variant={variant}
                className={cn(heroMediaVariants({ variant }), className)}
                {...props}
            />
        )
    }

    function HeroContainer({
        className,
        ...props
    }: React.ComponentProps<"div"> & { className?: string }) {
        return (
            <div className={cn("max-w-3xl text-center mx-auto py-6 w-full", className)} {...props} />
        )
    }


    function HeroBadge({
        asChild = true,
        variant = "secondary",
        className,
        ...props
    }: React.ComponentProps<typeof Badge> & { className?: string }) {
        return (
            <Badge asChild={asChild} className={cn("rounded-full border-border py-1", className)} variant={variant} {...props} />
        )
    }

    const heroTitleVariants = cva("mt-6 font-satoshi font-semibold text-4xl tracking-tight sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl", {
        variants: {
            variant: {
                default: "",
            }
        }
    })

    function HeroTitle({
        className,
        asChild = false,
        variant = "default",
        ...props
    }: React.ComponentProps<"h1"> & { asChild?: boolean } & VariantProps<typeof heroTitleVariants> & { className?: string }) {
        const Comp = asChild ? SlotPrimitive.Root : "h1";
        return (
            <Comp data-slot="hero-title" className={cn(heroTitleVariants({ variant }), className)} {...props} />
        )
    }

    function HeroDescription({
        className,
        ...props
    }: React.ComponentProps<"p"> & { className?: string }) {
        return (
            <p className={cn("mt-6 text-foreground/80 md:text-lg", className)} {...props} />
        )
    }

    function HeroCTA({
        className,
        ...props
    }: React.ComponentProps<"div"> & { className?: string }) {
        return (
            <div className={cn("mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4", className)} {...props} />
        )
    }

    export { Hero, HeroContainer, HeroBadge, HeroTitle, HeroDescription, HeroCTA }