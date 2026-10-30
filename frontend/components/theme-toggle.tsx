import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="surface-control h-9 w-9 rounded-full" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="surface-control inline-flex h-9 w-9 items-center justify-center rounded-full text-base text-[var(--foreground)] transition hover:border-primary/50 hover:text-ink"
    >
      {isDark ? <HiMiniSun /> : <HiMiniMoon />}
    </button>
  );
}
