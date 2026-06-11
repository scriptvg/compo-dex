import * as React from "react"
import { InfoIcon, LightbulbIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const CALLOUT_CONFIG = {
  tip: {
    label: "Tip",
    icon: LightbulbIcon,
    className: "border-primary/30 bg-primary/5 [&_svg]:text-primary",
  },
  note: {
    label: "Note",
    icon: InfoIcon,
    className: "border-border bg-muted/40 [&_svg]:text-muted-foreground",
  },
  warning: {
    label: "Warning",
    icon: TriangleAlertIcon,
    className:
      "border-destructive/30 bg-destructive/5 [&_svg]:text-destructive",
  },
} as const

export type CalloutType = keyof typeof CALLOUT_CONFIG

/** Aviso en línea para las docs (patrón shadcn): resalta consejos, matices y
 * advertencias sin interrumpir la lectura. Uso en MDX:
 * `<Callout type="tip">…</Callout>`. */
export function Callout({
  type = "note",
  title,
  className,
  children,
}: {
  type?: CalloutType
  /** Sobrescribe la etiqueta por defecto (Tip / Note / Warning). */
  title?: string
  className?: string
  children: React.ReactNode
}) {
  const config = CALLOUT_CONFIG[type]
  const Icon = config.icon

  return (
    <div
      data-slot="callout"
      data-type={type}
      role="note"
      className={cn(
        "my-4 flex gap-3 border px-4 py-3 text-sm",
        config.className,
        className
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="[&_p]:leading-6 [&_p:not(:first-child)]:mt-2">
        <p className="font-medium">{title ?? config.label}</p>
        <div className="text-foreground/90">{children}</div>
      </div>
    </div>
  )
}
