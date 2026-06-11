"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { IconLanguage } from "./icon-language"

export type ExampleHeaderProps = React.ComponentProps<"header">

export function ExampleHeader({ className, ...props }: ExampleHeaderProps) {
  return (
    <header
      {...props}
      className={cn(
        "border-b px-2 py-2 flex items-center bg-muted/10 justify-between",
        className
      )}
    />
  )
}

export function ExampleTitle({
  children,
  radius = "none",
  variant = "default",
}: {
  children: React.ReactNode
  radius?: "none" | "sm" | "md" | "lg" | "xl"
  variant?: "default" | "outline" | "secondary"
}) {
  return (
    <div className="flex items-center gap-2">
      <IconLanguage radius={radius} variant={variant} />
      <h1 className="text-sm font-medium">{children}</h1>
    </div>
  )
}

export type ExampleToolbarProps = {
  className?: string
}

export function ExampleToolbar({
  className,
  ...props
}: ExampleToolbarProps & React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props} />
  )
}
