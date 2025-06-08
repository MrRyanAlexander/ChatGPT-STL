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
  
  // Determine current effective theme for icon display, even if theme is 'system'
  let effectiveTheme = theme;
  if (theme === 'system' && mounted) {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }


  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch
    // This button will use default button styling which relies on CSS variables defined in :root
    return <Button variant="outline" size="icon" disabled className="w-10 h-10"><Sun className="h-[1.2rem] w-[1.2rem]" /></Button>;
  }

  return (
    <Button
      variant="default"
      size="icon"
      onClick={toggleTheme}
      className="bg-accent hover:bg-accent/80 text-accent-foreground focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
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
