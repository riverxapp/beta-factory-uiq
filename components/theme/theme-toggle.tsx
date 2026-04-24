"use client";

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle({
  className,
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative h-9 w-9", className)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all",
          theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all",
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
