import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Zap,
    ChartPie,
    FolderSync,
    Goal,
    BookCheck,
    Users,
    LucideIcon,
    Icon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FeatureCard, FeatureCardHeader, FeatureCardContent, FeatureCardTitle, FeatureCardDescription } from "@/components/ui/feature-card";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

function FeatureItem({
    icon,
    title,
    description,
}: Feature) {
    const Icon = icon;
    return (
        <FeatureCard
        >
            <FeatureCardHeader>
                <Icon className="size-5 text-muted-foreground" />
                <FeatureCardTitle>
                    {title}
                </FeatureCardTitle>
                <FeatureCardDescription>
                    {description}
                </FeatureCardDescription>
            </FeatureCardHeader>
            <FeatureCardContent>
                <div className="ml-6 h-40 bg-muted" />
            </FeatureCardContent>
        </FeatureCard>
    )
}

interface FeaturesListProps {
    features: Feature[];
    renderItem: (feature: Feature) => React.ReactNode;
}

function FeaturesList({ features, renderItem }: FeaturesListProps) {
    return (
        <div className="grid gap-x-6 gap-y-8  md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
                renderItem(feature)
            ))}
        </div>
    )

}

export interface FeaturesSectionProps {
    title: string;
    badge: string;
    description: string;
    features: Feature[];
}

function FeaturesSectionHeader({ badge, title, description }: { badge: string; title: string; description: string }) {
    return (
        <header className="mb-12 space-y-4">
            <Badge variant="secondary" >{badge}</Badge>
            <div>
                <h2 className="font-semibold  text-4xl tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.2]">{title}</h2>
                <p className=" text-lg text-muted-foreground sm:text-xl">
                    {description}
                </p>
            </div>
        </header>
    )
}



export function FeaturesSection({
    badge = "Features",
    title = "Everything you need to build a real Pokédex",
    description = "Purpose-built components for data-heavy Pokémon applications.",
    features = [],
}: FeaturesSectionProps) {
    return (
        <section className="py-6 border-b w-full border-dashed ">
            <div className=" w-full px-4">
                <FeaturesSectionHeader badge={badge} title={title} description={description} />
                <FeaturesList features={features} renderItem={(feature) => (
                    <FeatureItem key={feature.title} {...feature} />
                )} />
            </div>
        </section>
    );
}
