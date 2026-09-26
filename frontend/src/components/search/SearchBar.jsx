import {
  Search,
  X,
} from "lucide-react";

function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
}) {
  return (
    <div className="relative">

      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-secondary)]" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        placeholder="Search cases, people, organizations, locations or evidence..."
        className="
          w-full rounded-xl
          border border-[var(--color-border)]
          bg-[var(--color-background)]
          py-4 pl-12 pr-24
          text-sm text-[var(--color-text)]
          outline-none
          placeholder:text-[var(--color-text-muted)]
          focus:border-[var(--color-primary)]
        "
      />

      {value && (
        <button
          onClick={onClear}
          className="absolute right-14 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <button
        onClick={onSearch}
        className="
          absolute right-2 top-1/2
          -translate-y-1/2
          rounded-lg
          bg-[var(--color-primary)]
          px-3 py-2
          text-xs font-semibold
          text-[var(--color-background)]
          hover:bg-[var(--color-primary-hover)]
        "
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;
