import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icon, LucideIcon } from "lucide-react";

function HowWorkCard({className, ...props}: React.ComponentProps<typeof Card> & {
    className?: string;
}) {
    return <Card className={cn("shadow-none", className)} {...props} />
}

function HowWorkCardHeader({className, ...props}: React.ComponentProps<typeof CardHeader> & {
    className?: string;
}) {
    return <CardHeader className={cn(className)} {...props} />
}

function HowWorkCardIcon({icon, className, ...props}: {
    icon: LucideIcon;
    className?: string;
}) {
    const Icon = icon;
    return <Icon className={cn("size-5 text-muted-foreground", className)} {...props} />
}

function HowWorkCardTitle({className, ...props}: React.ComponentProps<typeof CardTitle> & {
    className?: string;
}) {
    return <CardTitle className={cn("mt-3 font-semibold text-lg", className)} {...props} />
}

function HowWorkCardDescription({className, ...props}: React.ComponentProps<typeof CardDescription> & {
    className?: string;
}) {
    return <CardDescription className={cn(className)} {...props} />
}

function HowWorkCardContent({className, ...props}: React.ComponentProps<typeof CardContent> & {
    className?: string;
}) {
    return <CardContent className={cn("text-muted-foreground text-sm", className)} {...props} />
}

export { HowWorkCard, HowWorkCardHeader, HowWorkCardIcon, HowWorkCardTitle, HowWorkCardDescription, HowWorkCardContent };



/**
 * <HowWorkCard>
 *  <HowWorkCardHeader>
 *   <HowWorkCardIcon icon={icon} />
 *   <HowWorkCardTitle>{title}</HowWorkCardTitle>
 *  </HowWorkCardHeader>
 *  <HowWorkCardDescription>{description}</HowWorkCardDescription>
 *  <HowWorkCardContent>{content}</HowWorkCardContent>
 * </HowWorkCard>
 */