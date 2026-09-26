import {
  X,
  FileText,
  ShieldCheck,
  Hash,
  Link2,
  Brain,
  Database,
} from "lucide-react";
import { statusColorVars } from "../../theme/colors";

export default function EvidenceDetails({
  evidence,
  onClose,
}) {
  if (!evidence) return null;
  const statusColor = statusColorVars[evidence.status] || "var(--color-text-muted)";

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-xl overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-background)] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-accent)]">
                <FileText size={20} />
              </div>

              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {evidence.id}
                </p>

                <h2 className="mt-1 text-lg font-bold text-[var(--color-text)]">
                  {evidence.title}
                </h2>

                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  {evidence.type}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-5">
          {/* Verification */}
          <section>
            <SectionTitle
              icon={<ShieldCheck size={16} />}
              title="Evidence Status"
            />

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-secondary)]">
                  Verification status
                </span>

                <span
                  className="rounded-full border px-3 py-1 text-xs"
                  style={{
                    color: statusColor,
                    borderColor: `color-mix(in srgb, ${statusColor} 20%, transparent)`,
                    backgroundColor: `color-mix(in srgb, ${statusColor} 10%, transparent)`,
                  }}
                >
                  {evidence.status.replace("_", " ")}
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex justify-between">
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    Extraction confidence
                  </span>

                  <span className="text-xs font-medium text-[var(--color-text)]">
                    {evidence.confidence}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-hover)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-primary)]"
                    style={{
                      width: `${evidence.confidence}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Source */}
          <section>
            <SectionTitle
              icon={<Database size={16} />}
              title="Source Traceability"
            />

            <div className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <DetailRow
                label="Source"
                value={evidence.source}
              />

              <DetailRow
                label="Case"
                value={evidence.caseId}
              />

              <DetailRow
                label="Date"
                value={evidence.date}
              />

              <DetailRow
                label="Location"
                value={evidence.location}
              />
            </div>
          </section>

          {/* Description */}
          <section>
            <SectionTitle
              icon={<FileText size={16} />}
              title="Description"
            />

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                {evidence.description}
              </p>
            </div>
          </section>

          {/* Extracted entities */}
          <section>
            <SectionTitle
              icon={<Link2 size={16} />}
              title="Extracted Entities"
            />

            <div className="flex flex-wrap gap-2">
              {evidence.entities.map((entity) => (
                <span
                  key={entity}
                  className="rounded-lg border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-3 py-2 text-xs text-[var(--color-accent-hover)]"
                >
                  {entity}
                </span>
              ))}
            </div>
          </section>

          {/* Extracted fields */}
          <section>
            <SectionTitle
              icon={<Brain size={16} />}
              title="Extracted Information"
            />

            <div className="grid grid-cols-1 gap-2">
              {evidence.extractedData.map((field) => (
                <div
                  key={field}
                  className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />

                  <span className="text-xs text-[var(--color-text-secondary)]">
                    {field}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Hash */}
          <section>
            <SectionTitle
              icon={<Hash size={16} />}
              title="Evidence Fingerprint"
            />

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Document Hash
              </p>

              <p className="mt-2 break-all font-mono text-xs text-[var(--color-text-secondary)]">
                {evidence.hash}
              </p>
            </div>
          </section>

          {/* Human verification */}
          <div className="rounded-xl border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 p-4">
            <p className="text-xs font-medium text-[var(--color-warning)]">
              Investigator verification
            </p>

            <p className="mt-2 text-xs leading-5 text-[var(--color-warning)]/70">
              AI extraction and relationship discovery are
              intended to support investigators. Evidence and
              extracted entities should be independently verified
              before being used for investigative decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="text-[var(--color-accent)]">{icon}</span>

      <h3 className="text-sm font-semibold text-[var(--color-text)]">
        {title}
      </h3>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-[var(--color-text-secondary)]">
        {label}
      </span>

      <span className="text-right text-xs text-[var(--color-text-secondary)]">
        {value}
      </span>
    </div>
  );
}
