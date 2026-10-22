"use client";

import { Palette } from "lucide-react";
import { useSiteTheme } from "./site-theme";

export function SiteThemeToggle({ onToggle }: { onToggle?: () => void }) {
  const { theme, toggleTheme } = useSiteTheme();
  const nextLabel = theme === "editorial" ? "Heritage Maroon & Gold" : "Editorial Green & Brass";

  return (
    <button
      type="button"
      className="site-theme-toggle"
      onClick={() => {
        onToggle?.();
        toggleTheme();
      }}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
      aria-pressed={theme === "heritage"}
    >
      <Palette size={17} aria-hidden="true" />
      <span className="site-theme-toggle-label">{theme === "heritage" ? "Heritage" : "Editorial"}</span>
      <span className="site-theme-toggle-short" aria-hidden="true">{theme === "heritage" ? "H" : "E"}</span>
    </button>
  );
}
