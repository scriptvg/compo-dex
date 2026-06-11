import { cn } from "@/lib/utils";

interface PageProps extends React.ComponentProps<"div"> {
    className?: string;
};

function Page({ className, ...props }: PageProps) {
    return (<div data-slot="page" {...props} className={cn("flex flex-col items-center justify-center", className)} />)
}

function PageHeader({ className, ...props }: React.ComponentProps<"header"> & { className?: string }) {
    return (<header data-slot="page-header" {...props} className={cn("flex flex-col", className)} />)
}

function PageContent({ className, ...props }: React.ComponentProps<"div"> & { className?: string }) {
    return (<div data-slot="page-content" {...props} className={cn("flex flex-col w-full h-full", className)} />)
}

export { Page, PageHeader, PageContent };