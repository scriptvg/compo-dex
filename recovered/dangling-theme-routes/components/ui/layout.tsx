import { cn } from "@/lib/utils"

export function Layout({
    className,
    ...props
}: React.ComponentPropsWithRef<"div"> & {
    className?: string
}) {
    return <div className={cn("flex flex-col min-h-svh", className)} {...props} />
}