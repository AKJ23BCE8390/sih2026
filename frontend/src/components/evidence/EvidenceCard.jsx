import {
  FileText,
  Database,
  ScanText,
  ShieldCheck,
  Clock,
  ChevronRight,
} from "lucide-react";
import { statusColorVars } from "../../theme/colors";

const typeIcons = {
  FINANCIAL_RECORD: Database,
  POLICE_REPORT: ShieldCheck,
  SCANNED_DOCUMENT: ScanText,
  GOVERNMENT_RECORD: FileText,
  OPEN_SOURCE: FileText,
};

export default function EvidenceCard({
  evidence,
  onSelect,
}) {
  const Icon =
    typeIcons[evidence.type] || FileText;

  return (
    <button
      onClick={() => onSelect(evidence)}
      className="group w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-left transition hover:border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3 text-[var(--color-accent)]">
          <Icon size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">
                {evidence.title}
              </h3>

              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {evidence.id} · {evidence.type}
              </p>
            </div>

            <span
              className="rounded-full border px-2.5 py-1 text-[10px] font-medium"
              style={{
                color: statusColorVars[evidence.status] || "var(--color-text-muted)",
                borderColor: `color-mix(in srgb, ${statusColorVars[evidence.status] || "var(--color-text-muted)"} 20%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${statusColorVars[evidence.status] || "var(--color-text-muted)"} 10%, transparent)`,
              }}
            >
              {evidence.status.replace("_", " ")}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Info label="Source" value={evidence.source} />
            <Info label="Case" value={evidence.caseId} />
            <Info label="Date" value={evidence.date} />
            <Info label="Confidence" value={`${evidence.confidence}%`} />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <Clock size={13} />
              {evidence.location}
            </div>

            <div className="flex items-center gap-1 text-xs text-[var(--color-accent)] opacity-70 transition group-hover:opacity-100">
              View evidence
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </p>

      <p className="mt-1 truncate text-xs text-[var(--color-text-secondary)]">
        {value}
      </p>
    </div>
  );
}
