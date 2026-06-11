"use client"

import { SiRadixui } from "react-icons/si"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * Selector de implementación a nivel de página (no por preview): define qué
 * referencia se muestra para todo el componente. Por ahora solo Radix UI está
 * activo; Base UI queda desactivado hasta que exista su MDX/implementación.
 */
export function FrameworkTabs({ className }: { className?: string }) {
    return (
        <Tabs defaultValue="radix" className={cn("not-prose", className)}>
            <div className="flex items-center justify-between ">
                <TabsList variant="line">
                    <TabsTrigger value="radix">Radix UI</TabsTrigger>
                    <TabsTrigger value="base" disabled>
                        Base UI
                    </TabsTrigger>
                </TabsList>
                <SiRadixui
                    aria-hidden
                    className="size-4 shrink-0 text-muted-foreground"
                />
            </div>
        </Tabs>
    )
}
