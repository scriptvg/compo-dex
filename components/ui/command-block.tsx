"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { CodeBlockCode } from "@/components/ui/code-block"
import { CopyButton } from "@/components/ui/copy-button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const
type PackageManager = (typeof MANAGERS)[number]

/** `dlx/exec` por gestor, p. ej. `shadcn@latest add accordion`. */
function buildExec(manager: PackageManager, target: string): string {
    switch (manager) {
        case "pnpm":
            return `pnpm dlx ${target}`
        case "npm":
            return `npx ${target}`
        case "yarn":
            return `yarn dlx ${target}`
        case "bun":
            return `bunx ${target}`
    }
}

/** Instalación de dependencias por gestor, p. ej. `class-variance-authority`. */
function buildInstall(manager: PackageManager, packages: string): string {
    switch (manager) {
        case "pnpm":
            return `pnpm add ${packages}`
        case "npm":
            return `npm install ${packages}`
        case "yarn":
            return `yarn add ${packages}`
        case "bun":
            return `bun add ${packages}`
    }
}

export function CommandBlock({
    command,
    install,
    className,
}: {
    /** Target `dlx/exec` tras el runner, p. ej. `shadcn@latest add accordion`. */
    command?: string
    /** Paquetes a instalar como dependencias, p. ej. `radix-ui clsx`. */
    install?: string
    className?: string
}) {
    const [manager, setManager] = useState<PackageManager>("pnpm")
    const build = (m: PackageManager) =>
        install != null ? buildInstall(m, install) : buildExec(m, command ?? "")
    const full = build(manager)

    return (
        <Tabs
            value={manager}
            onValueChange={(value) => setManager(value as PackageManager)}
            className={cn(
                "not-prose relative gap-0 overflow-hidden border border-border bg-card text-card-foreground",
                className,
            )}
        >
            <div className="flex items-center justify-between gap-2 border-b  px-3 ">
                <div className="flex items-center gap-3">
                    <span
                        aria-hidden
                        className="flex size-5 shrink-0 items-center justify-center bg-muted font-mono text-[10px] text-muted-foreground"
                    >
                        {">_"}
                    </span>
                    <TabsList variant="line">
                        {MANAGERS.map((m) => (
                            <TabsTrigger key={m} value={m}>
                                {m}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                <CopyButton value={full} />
            </div>

            {MANAGERS.map((m) => (
                <TabsContent key={m} value={m}>
                    <ScrollArea className="w-full">
                        <CodeBlockCode
                            code={build(m)}
                            language="bash"
                            className="overflow-x-visible [&>pre]:!bg-transparent [&>pre]:px-4 [&>pre]:py-3"
                        />
                    </ScrollArea>
                </TabsContent>
            ))}
        </Tabs>
    )
}
