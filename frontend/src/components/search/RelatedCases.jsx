import { FileText, ArrowRight } from "lucide-react";

function RelatedCases({ cases }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">

      <div className="border-b border-[var(--color-border)] p-5">

        <h2 className="font-semibold">
          Related Investigations
        </h2>

        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
          Cases connected to the current search context
        </p>

      </div>

      <div className="divide-y divide-slate-800">

        {cases.map((item) => (

          <div
            key={item.reference}
            className="group flex items-center gap-3 p-4 hover:bg-[var(--color-surface-hover)]/30"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <FileText className="h-4 w-4 text-[var(--color-primary)]" />
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-medium">
                {item.title}
              </p>

              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {item.reference}
              </p>

            </div>

            <span className="text-xs text-[var(--color-primary)]">
              {Math.round(item.score * 100)}%
            </span>

            <ArrowRight className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />

          </div>

        ))}

      </div>

    </div>
  );
}

export default RelatedCases;