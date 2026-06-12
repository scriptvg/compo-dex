"use client"

import { useEffect, useState } from "react"
import { FiGithub } from "react-icons/fi"

import { Button } from "@/components/ui/button"

const REPO = "scriptvg/compo-dex"

function formatStars(n: number): string {
    if (n >= 1000) {
        return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`
    }
    return String(n)
}

export function GithubStars({ className }: { className?: string }) {
    const [stars, setStars] = useState<number | null>(null)

    useEffect(() => {
        let active = true

        void (async () => {
            const cached = sessionStorage.getItem("gh-stars")
            if (cached !== null) {
                if (active) setStars(Number(cached))
                return
            }
            try {
                const res = await fetch(`https://api.github.com/repos/${REPO}`)
                const data = res.ok ? await res.json() : null
                if (!active || typeof data?.stargazers_count !== "number") return
                setStars(data.stargazers_count)
                sessionStorage.setItem("gh-stars", String(data.stargazers_count))
            } catch {
                // Silenciamos: el botón sigue enlazando al repo aunque falle el conteo.
            }
        })()

        return () => {
            active = false
        }
    }, [])

    return (
        <Button variant="ghost"  asChild className={className}>
            <a
                href={`https://github.com/${REPO}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub repository"
            >
                <FiGithub className="size-4" />
                <span className="tabular-nums">
                    {stars !== null ? formatStars(stars) : "—"}
                </span>
            </a>
        </Button>
    )
}
