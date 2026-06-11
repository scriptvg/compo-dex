import { cn } from "@/lib/utils"

/** Contenedor de pasos numerados (instalación manual). Reinicia el contador. */
export function Steps({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("mt-4 flex flex-col [counter-reset:step]", className)}
            {...props}
        />
    )
}

/** Un paso. Muestra un número automático y una línea vertical de conexión. */
export function Step({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                // ml-3.5 deja sitio para la línea conectora bajo el centro del número.
                "relative ml-3.5 border-l border-dashed pb-8 pl-6 [counter-increment:step] last:border-l-transparent last:pb-0",
                className,
            )}
            {...props}
        >
            <span
                aria-hidden
                className="absolute top-0 left-0 flex size-7 -translate-x-1/2 items-center justify-center border bg-background text-xs font-medium tabular-nums before:content-[counter(step)]"
            />
            <div className="flex flex-col gap-2 pt-0.5">{children}</div>
        </div>
    )
}
