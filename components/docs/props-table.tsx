"use client"

import * as React from "react"
import { InfoIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { getComponentApi, type ApiProp } from "@/lib/components-api"
import { EnumType } from "@/components/docs/enum-type"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-none bg-muted px-1.5 py-0.5 font-mono text-xs whitespace-nowrap text-foreground">
      {children}
    </code>
  )
}

/** Nombre de la prop + popover ⓘ con su descripción (patrón Radix):
 * la tabla queda en Prop / Type / Default sin perder la información. */
function PropName({ prop }: { prop: ApiProp }) {
  if (!prop.description) {
    return <InlineCode>{prop.name}</InlineCode>
  }

  return (
    <span className="inline-flex items-center gap-1">
      <InlineCode>{prop.name}</InlineCode>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={`Descripción de ${prop.name}`}
              className="cursor-help text-muted-foreground transition-colors hover:text-foreground"
            >
              <InfoIcon className="size-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-pretty">
            {prop.description}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  )
}

/** Keyword `function` con la firma completa en popover (patrón Radix):
 * las firmas largas no rompen el ancho de la tabla. */
function FunctionType({ signature }: { signature: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Ver la firma de la función"
            className="cursor-help rounded-none bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-primary"
          >
            function
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-md">
          <code className="font-mono text-xs whitespace-pre-wrap">
            {signature}
          </code>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function PropType({ prop }: { prop: ApiProp }) {
  if (prop.type.kind === "enum") {
    return <EnumType name={prop.type.name} values={prop.type.values} />
  }
  if (prop.type.kind === "function") {
    return <FunctionType signature={prop.type.signature} />
  }
  return <InlineCode>{prop.type.text}</InlineCode>
}

export type PropsTableProps = {
  /** Slug del componente documentado en `lib/components-api.ts`. */
  of: string
  /** Nombre del export cuya tabla se renderiza, p. ej. `PokedexSearch`. */
  component: string
  className?: string
}

/** Tabla de props data-driven: lee `lib/components-api.ts` (única fuente de
 * verdad) y renderiza Prop / Type / Default, con la descripción en un
 * popover ⓘ junto al nombre. */
export function PropsTable({ of, component, className }: PropsTableProps) {
  const api = getComponentApi(of, component)

  if (!api) {
    return (
      <p className="text-sm text-destructive">
        PropsTable: no hay API registrada para «{of}/{component}» en
        lib/components-api.ts.
      </p>
    )
  }

  return (
    <div className={cn("my-4 w-full overflow-x-auto border", className)}>
      <Table className="w-full border-collapse text-sm">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="border-b text-left font-medium">
              Prop
            </TableHead>
            <TableHead className="border-b text-left font-medium">
              Type
            </TableHead>
            <TableHead className="border-b text-left font-medium">
              Default
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {api.props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell>
                <PropName prop={prop} />
              </TableCell>
              <TableCell>
                <PropType prop={prop} />
              </TableCell>
              <TableCell>
                {prop.default ? (
                  <InlineCode>{prop.default}</InlineCode>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
