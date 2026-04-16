"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { cn } from "@/lib/utils";

interface CLICommandProps {
    command: string;
    className?: string;
}



function CLICommand({ command, className }: CLICommandProps) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        setCopied(true);
        const success = await copyToClipboard(command);
        if (success) {
            toast.success("Copied to clipboard");
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } else {
            toast.error("Error copying to clipboard");
        }
    }
    return (
        <CodeBlock className={cn("relative mx-auto mt-6 w-full max-w-lg border-border", className)}>
            <Button variant="ghost" size="icon-xs" className="absolute top-1.5 right-1.5 z-10" onClick={handleCopy} aria-label="Copy to clipboard">
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.span 
                        key="copied"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} 
                        transition={{ duration: 0.6, ease: "easeInOut" }}>
                            <Check className="size-4" />
                        </motion.span>
                    ) : (
                        <motion.span 
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}>
                            <Copy className="size-4" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </Button>
            <ScrollArea className="h-full w-full">
                <CodeBlockCode language="bash" code={command} />
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </CodeBlock>
    )
}

export { CLICommand };