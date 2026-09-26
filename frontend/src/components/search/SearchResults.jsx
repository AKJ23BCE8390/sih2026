import {
  FileText,
  User,
  Building2,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const icons = {
  Case: FileText,
  Person: User,
  Organization: Building2,
  Location: MapPin,
  Document: FileText,
};

function SearchResults({ results }) {
  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">

        <p className="text-[var(--color-text-secondary)]">
          No related results found.
        </p>

        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          Try a different query or broaden your search.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-4">

      {results.map((result) => {

        const Icon =
          icons[result.type] || FileText;

        const percentage = Math.round(
          result.score * 100
        );

        return (
          <div
            key={result.id}
            className="
              rounded-xl
              border border-[var(--color-border)]
              bg-[var(--color-surface)]
              p-5
              transition
              hover:border-[var(--color-primary)]/30
            "
          >

            <div className="flex items-start justify-between gap-5">

              <div className="flex min-w-0 gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                  <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                </div>

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="text-xs font-medium text-[var(--color-primary)]">
                      {result.type}
                    </span>

                    <span className="text-xs text-[var(--color-text-muted)]">
                      •
                    </span>

                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {result.reference}
                    </span>

                  </div>

                  <h3 className="mt-1 text-lg font-semibold">
                    {result.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {result.summary}
                  </p>

                </div>

              </div>

              <div className="shrink-0 text-right">

                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  {percentage}%
                </p>

                <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                  similarity
                </p>

              </div>

            </div>

            {/* Metadata */}
            <div className="mt-5 flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-4">

              <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                <MapPin className="h-3.5 w-3.5" />
                {result.location}
              </span>

              <span className="text-xs text-[var(--color-text-muted)]">
                {result.date}
              </span>

            </div>

            {/* Entities */}
            <div className="mt-4">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Matching Entities
              </p>

              <div className="mt-2 flex flex-wrap gap-2">

                {result.entities.map((entity) => (
                  <span
                    key={entity}
                    className="rounded-md bg-[var(--color-surface-hover)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)]"
                  >
                    {entity}
                  </span>
                ))}

              </div>

            </div>

            {/* Why matched */}
            <div className="mt-4">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Match Signals
              </p>

              <div className="mt-2 flex flex-wrap gap-2">

                {result.reasons.map((reason) => (
                  <span
                    key={reason}
                    className="rounded-md bg-[var(--color-primary)]/5 px-2.5 py-1 text-xs text-[var(--color-primary)]"
                  >
                    {reason}
                  </span>
                ))}

              </div>

            </div>

            {/* Action */}
            <div className="mt-5 flex justify-end">

              <button className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">

                View investigation

                <ArrowUpRight className="h-3.5 w-3.5" />

              </button>

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default SearchResults;