"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

export type SiteTheme = "editorial" | "heritage";

type SiteThemeContextValue = {
  theme: SiteTheme;
  toggleTheme: () => void;
};

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);
const THEME_COOKIE = "penu-site-theme";

export function SiteThemeProvider({ theme: initialTheme, children }: { theme: SiteTheme; children: ReactNode }) {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "editorial" ? "heritage" : "editorial";
    setTheme(nextTheme);
    document.cookie = `${THEME_COOKIE}=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  }, [theme]);

  return (
    <SiteThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme} className="site-theme-root">
        {children}
      </div>
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const context = useContext(SiteThemeContext);
  if (!context) throw new Error("useSiteTheme must be used within SiteThemeProvider.");
  return context;
}
