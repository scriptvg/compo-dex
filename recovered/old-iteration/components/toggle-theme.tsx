"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <div className="size-6" />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="ghost"
      size="icon"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
