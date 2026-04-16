"use client"

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLICommand } from "@/components/ui/cli-command";
import { cn } from "@/lib/utils";


function Hero({
    className,
    ...props
}: React.ComponentProps<"section"> & { className?: string }) {
    return (
        <section className={cn("flex min-h-[calc(100dvh-2rem)] mx-auto border-b border-dashed w-full items-center justify-center px-4 sm:px-6 scroll-mt-24", className)} {...props}/>
    );
}

function HeroContainer({
    className,
    ...props
}: React.ComponentProps<"div"> & { className?: string }) {
    return (
        <div className={cn("max-w-3xl text-center mx-auto py-6 w-full", className)} {...props}/>
    )
}


function HeroBadge({ 
    asChild = true,
    variant = "secondary",
    className,
    ...props
 }: React.ComponentProps<typeof Badge> & { className?: string }) {
    return (    
        <Badge asChild={asChild} className={cn("rounded-full border-border py-1", className)} variant={variant} {...props}/>
    )
}

function HeroTitle({
    className,
    ...props
}: React.ComponentProps<"h1"> & { className?: string }) {
    return (
        <h1 className={cn("mt-6 font-satoshi font-semibold text-4xl tracking-tight sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl", className)} {...props}/>
    )
}

function HeroDescription({
    className,
    ...props
}: React.ComponentProps<"p"> & { className?: string }) {
    return (
        <p className={cn("mt-6 text-foreground/80 md:text-lg", className)} {...props}/>
    )
}

function HeroCTA({
    className,
    ...props
}: React.ComponentProps<"div"> & { className?: string }) {
    return (
        <div className={cn("mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4", className)} {...props}/>
    )
}

export { Hero, HeroContainer, HeroBadge, HeroTitle, HeroDescription, HeroCTA }