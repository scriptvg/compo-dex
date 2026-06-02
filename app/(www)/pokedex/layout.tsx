import type { ReactNode } from "react"
import { PokedexProvider } from "@/contexts/pokedex-context"

export default function PokedexLayout({ children }: { children: ReactNode }) {
  return <PokedexProvider>{children}</PokedexProvider>
}
