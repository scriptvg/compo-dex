import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Zap,
  ChartPie,
  FolderSync,
  Goal,
  BookCheck,
  Users,
} from "lucide-react";
import { Badge } from "./ui/badge";

const features = [
  {
    icon: Zap,
    title: "Pokémon profiles",
    description: "Composable layouts for stats, abilities, forms, and sprites.",
  },
  {
    icon: ChartPie,
    title: "Stat visualizations",
    description:
      "Normalized bars, comparisons, and visual breakdowns built for real data.",
  },
  {
    icon: FolderSync,
    title: "Evolution chains",
    description:
      "Supports branching paths, conditions, and alternate evolutions.",
  },
  {
    icon: Goal,
    title: "Type system",
    description:
      "Consistent type colors, semantic variants, and interaction states.",
  },
  {
    icon: BookCheck,
    title: "Headless-first",
    description: "Bring your own data, logic, routing, and state management.",
  },
  {
    icon: Users,
    title: "Scales with your app",
    description: "From a single Pokémon page to a full Pokédex index.",
  },
];

export function Features() {
  return (
    <section className="py-4 border-b border-dashed ">
      <div className="mx-auto w-full px-4">
        <header className="mb-12 space-y-4">
          <Badge variant="secondary">Features</Badge>
          <div>
            <h2 className="font-semibold  text-4xl tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.2]">
              Everything you need to build a real Pokédex
            </h2>
            <p className=" text-lg text-muted-foreground sm:text-xl">
              Purpose-built components for data-heavy Pokémon applications.
            </p>
          </div>
        </header>
        <div className="grid gap-x-6 gap-y-8  md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex flex-col overflow-hidden  pb-0 shadow-none"
            >
              <CardHeader>
                <feature.icon className="size-5 text-muted-foreground" />
                <h4 className="mt-3 font-semibold text-xl tracking-tight">
                  {feature.title}
                </h4>
                <p className="mt-1 text-[17px] text-muted-foreground">
                  {feature.description}
                </p>
              </CardHeader>
              <CardContent className="mt-auto px-0 pb-0">
                <div className="ml-6 h-40 bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
