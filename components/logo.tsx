"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Logo({
  className,
  alt = "logo",
  src,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "src"> & {
  src?: React.ComponentProps<typeof Image>["src"];
  alt: string;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a default logo during SSR and until mounted
  const logoSrc = !mounted
    ? "/logo_white.png"
    : src || (theme === "dark" ? "/logo_white.png" : "/logo_dark.png");

  return (
    <Image
      alt={alt}
      className={cn("size-7", className)}
      src={logoSrc}
      height={32}
      width={32}
      {...props}
    />
  );
}
