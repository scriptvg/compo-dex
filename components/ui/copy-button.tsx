"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { Button } from "@/components/ui/button"

export function CopyButton({
    value,
    className,
}: {
    value: string
    className?: string
}) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        const success = await copyToClipboard(value)
        if (success) {
            setCopied(true)
            toast.success("Copied to clipboard")
            setTimeout(() => setCopied(false), 2000)
        } else {
            toast.error("Error copying to clipboard")
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon-xs"
            className={cn("text-muted-foreground", className)}
            onClick={handleCopy}
            aria-label="Copy to clipboard"
        >
            <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                    <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Check className="size-3.5" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Copy className="size-3.5" />
                    </motion.span>
                )}
            </AnimatePresence>
        </Button>
    )
}
