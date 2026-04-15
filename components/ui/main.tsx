import { cn } from "@/lib/utils"

function Main({
    className,
    ...props
}: React.ComponentPropsWithRef<"main"> & {
    className?: string
}) {
    return <main className={cn("flex-1 border-x border-dashed container mx-auto", className)} {...props} />
}

export { Main }