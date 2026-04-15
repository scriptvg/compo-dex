import { cn } from "@/lib/utils"

function Header({className, ...props}: React.ComponentPropsWithRef<"header"> & {className?: string}) {
    return (
        <header className={
            cn("border-b border-dashed", className)
        } {...props}/>
    )
}

function HeaderContainer({className, ...props}: React.ComponentPropsWithRef<"div"> & {className?: string}) {
    return (
        <div className={
            cn("container mx-auto border-x border-dashed px-2 py-1 flex items-center justify-between", className)
        } {...props}/>
    )
}

export { Header, HeaderContainer }