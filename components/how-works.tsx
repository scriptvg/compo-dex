import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Layers, Sliders } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Bring your data",
    description:
      "Fetch Pokémon data from any source: PokéAPI, GraphQL, local JSON, or your own backend.",
  },
  {
    icon: Layers,
    title: "Compose UI blocks",
    description:
      "Map raw data into domain-specific components like stats, types, evolutions, and sprites.",
  },
  {
    icon: Sliders,
    title: "Customize freely",
    description:
      "Control styling, layout, routing, and state without fighting abstractions.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-6 border-b border-dashed">
      <div className="mx-auto  px-6">
        <Badge variant="secondary">How it works</Badge>

        <h2 className="mt-4 font-semibold text-4xl tracking-[-0.03em] md:text-[2.5rem]">
          Built for real Pokémon data flows
        </h2>

        <p className="mt-2 text-lg text-muted-foreground">
          A simple, predictable flow that scales from a single card to a full
          Pokédex.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className=" shadow-none">
              <CardHeader>
                <step.icon className="size-5 text-muted-foreground" />
                <h3 className="mt-3 font-semibold text-lg">{step.title}</h3>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                {step.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
