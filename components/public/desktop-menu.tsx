import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DesktopMenu() {
  return (
    <div className="gap-2 hidden md:flex">
      <Button variant="ghost" asChild>
        <Link href="/docs">Docs</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/pokedex">Pokedex</Link>
      </Button>
    </div>
  )
}
