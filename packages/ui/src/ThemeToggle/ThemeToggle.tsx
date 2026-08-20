import { IconButton } from "../IconButton";
import { useTheme } from "../ThemeProvider";
import { MoonIcon, SunIcon } from "../lib/icons";

export interface ThemeToggleProps {
  className?: string;
  variant?: "ghost" | "outline";
}

/** Button that toggles between light and dark. Requires a <ThemeProvider>. */
export function ThemeToggle({ className, variant = "ghost" }: ThemeToggleProps) {
  const { resolvedTheme, toggle } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <IconButton
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      variant={variant}
      onClick={toggle}
      className={className}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
