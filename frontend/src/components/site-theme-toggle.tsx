"use client";

import { Palette } from "lucide-react";
import { useSiteTheme } from "./site-theme";

export function SiteThemeToggle() {
  const { theme, toggleTheme } = useSiteTheme();
  const nextLabel = theme === "editorial" ? "Heritage Maroon & Gold" : "Editorial Green & Brass";

  return (
    <button
      type="button"
      className="site-theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
      aria-pressed={theme === "heritage"}
    >
      <Palette size={17} aria-hidden="true" />
      <span className="site-theme-toggle-label">{theme === "heritage" ? "Heritage" : "Editorial"}</span>
    </button>
  );
}
