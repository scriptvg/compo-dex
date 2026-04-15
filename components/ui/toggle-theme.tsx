"use client"

import { Button } from "./button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { toggleThemeWithViewTransition } from "@/lib/theme-view-transition"
import * as React from "react"


export function ToggleTheme() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])



    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleThemeWithViewTransition(resolvedTheme, setTheme)}
            disabled={!mounted}
        >
            <AnimatePresence mode="wait">
                {mounted && resolvedTheme === "dark" ? (
                        <motion.span
                            key="dark"
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0, rotate: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            <Sun />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="light"
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0, rotate: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            <Moon />
                        </motion.span>
                    )}
            </AnimatePresence>
        </Button>
    )
}