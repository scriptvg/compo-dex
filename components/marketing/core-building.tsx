import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from "next/link"
import PokemonSpriteDemo from "../demo/pokemon-sprite"

const components = [
  {
    name: "Pokemon Image",
    description: "Responsive Pokémon images with multiple size presets.",
    href: "/docs/components/pokemon-image",
    example: (
      <div className="flex aspect-video h-full w-full items-center justify-center p-4">
        <PokemonSpriteDemo />
      </div>
    ),
  },
  {
    name: "Pokemon Badge",
    description: "Semantic Pokémon type badges with consistent variants.",
    href: "/docs/components/pokemon-badge",
    example: (
      <div className="flex h-full items-center justify-center gap-2">
        <div className="aspect-video h-full w-full">
          {/*           <PokemonBadge type="grass">grass</PokemonBadge>
          <PokemonBadge type="fire" variant="secondary">fire</PokemonBadge>
          <PokemonBadge type="water" variant="ghost">water</PokemonBadge>
          <PokemonBadge type="electric" variant="outline">electric</PokemonBadge> */}
        </div>
      </div>
    ),
  },
  {
    name: "Pokemon Stats",
    description: "Normalized stat bars for clear comparisons.",
    href: "/docs/components/stat-bar",
    example: (
      <div className="flex h-full items-center justify-center gap-2">
        <div className="aspect-video h-full w-full">
          {/*                     <PokemonStat maxValue={200} language="en">
            <PokemonStatRoot >
              <PokemonStatLabel name="HP" value={70} />
              <PokemonStatBar value={70} />
            </PokemonStatRoot>
            <PokemonStatRoot>
              <PokemonStatLabel name="Attack" value={170} />
              <PokemonStatBar value={170} />
            </PokemonStatRoot>
          </PokemonStat> */}
        </div>
      </div>
    ),
  },
  {
    name: "Pokemon Chart",
    description: "Radar charts for visual Pokémon stat distribution.",
    href: "/docs/components/pokemon-chart",
    example: (
      <div className="flex h-full w-full flex-col items-center justify-center pt-1">
        <div className="aspect-video h-full w-full">
          {/*           <PokemonChart
            className="w-full min-h-[150px]!"

            stats={[
              { name: "hp", value: 80 },
              { name: "attack", value: 120 },
              { name: "defense", value: 70 },
              { name: "special-attack", value: 110 },
              { name: "special-defense", value: 80 },
              { name: "speed", value: 100 },
            ]}
            mode="radar"
            language="en"
          /> */}
        </div>
      </div>
    ),
  },
  {
    name: "Evolution Chain",
    description: "Composable evolution trees with primitive support.",
    href: "/docs/components/pokemon-evolution",
    example: (
      <div className="flex h-full w-full items-center justify-center bg-muted/5">
        <div className="aspect-video h-full w-full">
          {/*  <EvolutionRoot className="p-0 gap-2">
            <EvolutionContent className="gap-2 lg:gap-4">
              <EvolutionNode
                size="md"
                name="Charmeleon"
                image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
                types={["fire"]}
              />
              <EvolutionGroup className="gap-2">
                <EvolutionBranch className="gap-2 lg:gap-4">
                  <EvolutionTrigger className="min-w-[40px] lg:min-w-[60px]" type="level" value={36} />
                  <EvolutionNode
                    size="md"
                    name="Charizard"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
                    types={["fire", "flying"]}
                  />
                </EvolutionBranch>
              </EvolutionGroup>
            </EvolutionContent>
          </EvolutionRoot> */}
        </div>
      </div>
    ),
  },
  {
    name: "Pokemon Ability",
    description: "Readable layouts for Pokémon abilities and effects.",
    href: "/docs/components/pokemon-ability",
    example: (
      <div className="flex h-full w-full items-center justify-center bg-muted/5">
        <div className="aspect-video h-full w-full">
          {/* <PokemonAbilityExample /> */}
        </div>
      </div>
    ),
  },
  {
    name: "Pokemon Card",
    description: "Card components for displaying Pokémon information.",
    href: "/docs/components/pokemon-card",
    example: (
      <div className="flex h-full w-full items-center justify-center bg-muted/5">
        <div className="aspect-video h-full w-full" />
      </div>
    ),
  },
]

export function CoreBuilding() {
  return (
    <section className="border-b border-dashed py-6">
      <div className="mx-auto w-full px-6">
        <Badge variant="secondary" className="mb-4">
          Components
        </Badge>
        <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.2]">
          Core building blocks
        </h2>
        <p className="mt-2 text-lg text-muted-foreground sm:text-xl">
          A curated set of composable components designed specifically for
          Pokémon data.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {components.map((component) => (
            <Card
              key={component.name}
              className="group h-full overflow-hidden pt-0 shadow-none transition-colors hover:border-muted-foreground/20"
            >
              <CardContent className="p-0">
                <div className="h-60! border-b bg-background">
                  {component.example}
                </div>
              </CardContent>
              <Link href={component.href} key={component.name}>
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg font-semibold tracking-tight">
                      {component.name}
                    </h4>
                    <Badge variant="secondary">Composable</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {component.description}
                  </p>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
