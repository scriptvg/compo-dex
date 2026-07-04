import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface LibraryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  preview?: React.ReactNode
  icon?: React.ReactNode
  linkText?: string
  linkHref?: string
}

export function LibraryCard({
  title,
  description,
  preview,
  icon,
  linkText = "Learn more",
  linkHref = "#",
  className,
  ...props
}: LibraryCardProps) {
  return (
    <div
      className={cn(
        "group relative h-[420px] overflow-hidden bg-secondary/80",
        className
      )}
      {...props}
    >
      {/* Background glow */}
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 bg-secondary/80 blur-[120px]" />

      {/* Preview */}
      {preview && (
        <div className="absolute inset-x-0 top-6 border-border/50 shadow-2xl">
          <div
            style={{
              transform:
                "perspective(1600px) rotateX(55deg) rotateZ(-12deg) scale(1.2)",
              transformOrigin: "top center",
            }}
          >
            {preview}
          </div>
        </div>
      )}

      {/* Gradient overlay: fully opaque below the preview's bottom edge (~34%
          from the bottom) so its hard cut dissolves over the image itself,
          instead of a weak fade across the whole card that leaves a seam. */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary from-35% to-transparent to-75%" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 z-10 flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          {icon ?? (
            <Image
              src="/logo_dark.png"
              alt="Logo"
              width={40}
              height={40}
              className="size-10 rounded-md dark:invert"
            />
          )}

          <h3 className="text-2xl font-bold">{title}</h3>
        </div>

        <p className="max-w-xs text-sm text-muted-foreground">
          {description}
        </p>

        <Link
          href={linkHref}
          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
        >
          {linkText}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
