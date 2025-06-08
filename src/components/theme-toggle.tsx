"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" || theme === "system" && window.matchMedia('(prefers-color-scheme: light)').matches ? "dark" : "light");
  };
  
  let effectiveTheme = theme;
  if (theme === 'system' && mounted) {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled className="w-10 h-10"><Sun className="h-[1.2rem] w-[1.2rem]" /></Button>;
  }

  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      className="border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring"
      aria-label={effectiveTheme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {effectiveTheme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
