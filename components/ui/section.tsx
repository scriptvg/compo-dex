import { cn } from "@/lib/utils";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, VariantProps } from "class-variance-authority";

const sectionVariants = cva("py-6 border-b border-dashed", {
    variants: {
        variant: {
            default: "",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

function Section({
    className,
    variant = "default",
    asChild = false,
    ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants> & { className?: string, asChild?: boolean }) {
    const Comp = asChild ? SlotPrimitive.Root : "section";
    return (
        <Comp
            data-slot="section"
            data-variant={variant}
            className={cn(sectionVariants({ variant }), className)}
            {...props}
        />
    )
}

export { Section };