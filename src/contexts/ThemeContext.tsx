
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type FontSize = "small" | "medium" | "large";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Use saved preference, fallback to light for elderly accessibility
    const savedTheme = localStorage.getItem("stl-theme") as Theme;
    return savedTheme || "light";
  });
  
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    // Use saved font size, fallback to medium
    const savedFontSize = localStorage.getItem("stl-font-size") as FontSize;
    return savedFontSize || "medium";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    localStorage.setItem("stl-theme", theme);
  }, [theme]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove any existing font size classes
    root.classList.remove("font-size-small", "font-size-medium", "font-size-large");
    
    // Add the current font size class
    root.classList.add(`font-size-${fontSize}`);
    
    localStorage.setItem("stl-font-size", fontSize);
  }, [fontSize]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}
