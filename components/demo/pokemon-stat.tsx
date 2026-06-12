"use client"

import {
    PokemonStat,
    PokemonStatBar,
    PokemonStatLabel,
    PokemonStatList,
    type PokemonStatsInput,
} from "@/components/compodex/ui/pokemon-stat"

// Charizard base stats, as a `{ stat: value }` record.
const STATS: PokemonStatsInput = {
    hp: 78,
    attack: 84,
    defense: 78,
    "special-attack": 109,
    "special-defense": 85,
    speed: 100,
}

export default function PokemonStatDemo() {
    return (
        <PokemonStatList stats={STATS} className="w-full max-w-xs">
            {(entry) => (
                <PokemonStat {...entry}>
                    <PokemonStatLabel />
                    <PokemonStatBar />
                </PokemonStat>
            )}
        </PokemonStatList>
    )
}
