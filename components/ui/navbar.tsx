/**
 * @name Navbar
 * @description Navbar component
 * @requires cn from @/lib/utils
 * 
 * @author Allan Velez
 * 
 */
import { cn } from "@/lib/utils"

/**
 * @name Navbar
 * @description Navbar component
 * 
 */

interface NavbarProps extends React.ComponentPropsWithRef<"header"> {
    className?: string;
}

function Navbar({className, ...props}: NavbarProps) {
    return (
        <header data-slot="navbar" className={
            cn("border-b border-dashed", className)
        } {...props}/>
    )
}

/**
 * @name NavbarContainer
 * @description Container for the header
 * 
 */

interface NavbarContainerProps extends React.ComponentPropsWithRef<"div"> {
    className?: string;
}

function NavbarContainer({className, ...props}: NavbarContainerProps) {
    return (
        <div data-slot="header-container" className={cn(
            "container mx-auto border-x border-dashed px-2 py-1 flex items-center justify-between w-full",
             className
            )} {...props}/>
    )
}

export { Navbar, NavbarContainer }