import {
    POKEMON_TYPE_ORDER,
    POKEMON_TYPE_SURFACE,
} from "@/components/compodex/ui/badge-type"
import { Page, PageContent, PageHeader } from "@/components/layout/page"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function PokeColoresPage() {


    const POKEMON_TYPE_COMBINATIONS = [
        "normal-flying",
        "normal-poison",
        "normal-ground",
        "normal-rock",
        "normal-ghost",
        "normal-dragon",
        "normal-dark",
        "normal-steel",
        "normal-fairy",
        "normal-unknown",
        "normal-shadow",
    ] as const

    const POKEMON_TYPE_COMBINATIONS_SURFACE = {
        "normal-flying": "bg-gradient-to-r from-stone-400/50 to-indigo-400/50",
        "normal-poison": "bg-gradient-to-r from-stone-400/50 to-purple-600/50",
        "normal-ground": "bg-gradient-to-r from-stone-400/50 to-amber-600/50",
        "normal-rock": "bg-gradient-to-r from-stone-400/50 to-yellow-700/50",
        "normal-ghost": "bg-gradient-to-r from-stone-400/50 to-purple-800/50",
        "normal-dragon": "bg-gradient-to-r from-stone-400/50 to-fuchsia-700/50",
        "normal-dark": "bg-gradient-to-r from-stone-400/50 to-neutral-800/50",
        "normal-steel": "bg-gradient-to-r from-stone-400/50 to-slate-500/50",
        "normal-fairy": "bg-gradient-to-r from-stone-400/50 to-pink-300/50",
        "normal-unknown": "bg-gradient-to-r from-stone-400/50 to-gray-500/50",
        "normal-shadow": "bg-gradient-to-r from-stone-400/50 to-gray-800/50",
    } as const
    return (
        <Page className="w-full items-stretch">
            <PageHeader className="w-full border-b border-dashed px-4 py-4">
                <h1 className="text-2xl font-bold">Colores por tipo</h1>
                <p className="text-sm text-muted-foreground">
                    Misma paleta que usa{" "}
                    <code className="font-mono text-xs">Compodex</code>.
                </p>
            </PageHeader>
            <PageContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {POKEMON_TYPE_ORDER.map((type) => (
                        <Card
                            key={type}
                            className="p-0"
                        >
                            <div className={cn(
                                "min-h-36 justify-end border-0 py-0 ring-1 ring-black/10 dark:ring-white/15",
                                POKEMON_TYPE_SURFACE[type]
                            )} />
                            <CardHeader className="gap-2 pb-4">
                                <CardTitle className="font-heading capitalize text-inherit">
                                    {type}
                                </CardTitle>
                                <CardDescription className="font-mono text-[0.65rem] text-current/80">
                                    {POKEMON_TYPE_SURFACE[type]}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

            </PageContent>
            <Separator />
            <PageHeader className="w-full border-b border-dashed px-4 py-4">
                <h1 className="text-2xl font-bold">Combinaciones de tipos</h1>
                <p className="text-sm text-muted-foreground">
                    Combinaciones de tipos de Pokémon usando la paleta de colores de Compodex.
                </p>
            </PageHeader>
            <PageContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {POKEMON_TYPE_COMBINATIONS.map((combination) => (
                        <Card key={combination} className="p-0">
                            <div className={cn(
                                "min-h-36 justify-end border-0 py-0 ring-1 ring-black/10 dark:ring-white/15",
                                POKEMON_TYPE_COMBINATIONS_SURFACE[combination]
                            )} />
                            <CardHeader className="gap-2 pb-4">
                                <CardTitle className="font-heading capitalize text-inherit">
                                    {combination}
                                </CardTitle>
                                <CardDescription className="font-mono text-[0.65rem] text-current/80">
                                    {POKEMON_TYPE_COMBINATIONS_SURFACE[combination]}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </PageContent>
        </Page>
    )
}
