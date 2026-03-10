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
    return <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-[var(--foreground)] backdrop-blur transition hover:border-primary/60 hover:text-primary"
    >
      {isDark ? <HiMiniSun /> : <HiMiniMoon />}
    </button>
  );
}
