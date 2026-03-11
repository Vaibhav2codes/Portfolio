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
    return <div className="surface-control h-10 w-10 rounded-full" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="surface-control inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-[var(--foreground)] backdrop-blur transition hover:border-primary/60 hover:text-primary"
    >
      {isDark ? <HiMiniSun /> : <HiMiniMoon />}
    </button>
  );
}
