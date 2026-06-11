import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";



function FeatureCard({className, ...props}: React.ComponentProps<typeof Card> & {
    className?: string;
}) {
    return <Card className={cn("flex flex-col overflow-hidden ring-0 border border-dashed pb-0 shadow-none", className)} {...props} />
}

function FeatureCardHeader({className, ...props}: React.ComponentProps<typeof CardHeader> & {
    className?: string;
}) {
    return <CardHeader className={cn(className)} {...props} />
}

function FeatureCardTitle({className, ...props}: React.ComponentProps<typeof CardTitle> & {
    className?: string;
}) {
    return <CardTitle className={cn("mt-3 font-semibold text-xl tracking-tight", className)} {...props} />
}

function FeatureCardDescription({className, ...props}: React.ComponentProps<typeof CardDescription> & {
    className?: string;
}) {
    return <CardDescription className={cn("mt-1 text-[17px] text-muted-foreground", className)} {...props} />
}

function FeatureCardContent({className, ...props}: React.ComponentProps<typeof CardContent> & {
    className?: string;
}) {
    return <CardContent className={cn("mt-auto px-0 pb-0", className)} {...props} />
}

export { FeatureCard, FeatureCardHeader, FeatureCardContent, FeatureCardTitle, FeatureCardDescription };


/* function FeatureCardExample() {
    return (
        <FeatureCard>
            <FeatureCardHeader>

                <FeatureCardTitle>
                    Title
                </FeatureCardTitle>
                <FeatureCardDescription>
                    Description
                </FeatureCardDescription>
            </FeatureCardHeader>
            <FeatureCardContent>
                <div className="ml-6 h-40 bg-muted" />
            </FeatureCardContent>
        </FeatureCard>
    )
}

export { FeatureCardExample }; */