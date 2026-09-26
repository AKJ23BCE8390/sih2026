import { useEffect, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { applyTheme } from "../../theme/colors";

function Header() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("veda-bytes-theme");
    return savedTheme === "light" ? "light" : "dark";
  });

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem("veda-bytes-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 px-6 backdrop-blur">

      {/* Search */}
      <div className="relative w-96">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]" />

        <input
          type="text"
          placeholder="Search cases, people, organizations..."
          className="
            w-full rounded-lg border border-[var(--color-border)]
            bg-[var(--color-surface)] py-2.5 pl-10 pr-4
            text-sm text-[var(--color-text)]
            outline-none
            placeholder:text-[var(--color-text-muted)]
            focus:border-[var(--color-primary)]
          "
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="rounded-lg p-2 text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notification */}
        <button className="relative rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]">

          <Bell className="h-5 w-5" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--color-danger)]" />

        </button>

        {/* Investigator */}
        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-sm font-semibold text-[var(--color-primary)]">
            IN
          </div>

          <div className="hidden md:block">

            <p className="text-sm font-medium">
              Investigator
            </p>

            <p className="text-xs text-[var(--color-text-secondary)]">
              Authorized User
            </p>

          </div>

          <ChevronDown className="h-4 w-4 text-[var(--color-text-secondary)]" />

        </div>

      </div>

    </header>
  );
}

export default Header;
