import { useMemo, useState } from "react";
import {
  FileSearch,
  ShieldCheck,
  ScanText,
  AlertTriangle,
  Search,
  Filter,
  Database,
} from "lucide-react";

import { evidenceItems } from "../data/evidence";
import EvidenceCard from "../components/evidence/EvidenceCard";
import EvidenceDetails from "../components/evidence/EvidenceDetails";

export default function Evidence() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [selectedEvidence, setSelectedEvidence] =
    useState(null);

  const filteredEvidence = useMemo(() => {
    return evidenceItems.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.id.toLowerCase().includes(searchValue) ||
        item.source.toLowerCase().includes(searchValue) ||
        item.caseId.toLowerCase().includes(searchValue) ||
        item.entities.some((entity) =>
          entity.toLowerCase().includes(searchValue)
        );

      const matchesType =
        type === "ALL" || item.type === type;

      const matchesStatus =
        status === "ALL" || item.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [search, type, status]);

  const verifiedCount = evidenceItems.filter(
    (item) => item.status === "VERIFIED"
  ).length;

  const ocrCount = evidenceItems.filter(
    (item) => item.status === "OCR_PROCESSED"
  ).length;

  const reviewCount = evidenceItems.filter(
    (item) => item.status === "REVIEW_REQUIRED"
  ).length;

  const averageConfidence = Math.round(
    evidenceItems.reduce(
      (sum, item) => sum + item.confidence,
      0
    ) / evidenceItems.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm text-[var(--color-accent)]">
          <FileSearch size={16} />
          Evidence Intelligence
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Evidence & Source Traceability
        </h1>

        <p className="mt-1 max-w-3xl text-sm text-[var(--color-text-secondary)]">
          Inspect source records, extracted information,
          entity references and verification status behind
          investigative intelligence.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat
          icon={<Database size={19} />}
          label="Evidence Records"
          value={evidenceItems.length}
          description="Indexed sources"
        />

        <Stat
          icon={<ShieldCheck size={19} />}
          label="Verified"
          value={verifiedCount}
          description="Verified records"
        />

        <Stat
          icon={<ScanText size={19} />}
          label="OCR Processed"
          value={ocrCount}
          description="Documents processed"
        />

        <Stat
          icon={<AlertTriangle size={19} />}
          label="Review Required"
          value={reviewCount}
          description={`Avg. confidence ${averageConfidence}%`}
        />
      </div>

      {/* Search + filters */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search evidence, source, case or entity..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]"
            />
          </div>

          <div className="flex gap-2">
            <Filter
              size={17}
              className="mt-2.5 text-[var(--color-text-secondary)]"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-xs text-[var(--color-text-secondary)] outline-none"
            >
              <option value="ALL">All Sources</option>
              <option value="FINANCIAL_RECORD">
                Financial
              </option>
              <option value="POLICE_REPORT">
                Police Report
              </option>
              <option value="SCANNED_DOCUMENT">
                Scanned Document
              </option>
              <option value="GOVERNMENT_RECORD">
                Government Record
              </option>
              <option value="OPEN_SOURCE">
                Open Source
              </option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-xs text-[var(--color-text-secondary)] outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="VERIFIED">Verified</option>
              <option value="OCR_PROCESSED">
                OCR Processed
              </option>
              <option value="REVIEW_REQUIRED">
                Review Required
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Evidence list */}
      <div className="space-y-3">
        {filteredEvidence.map((evidence) => (
          <EvidenceCard
            key={evidence.id}
            evidence={evidence}
            onSelect={setSelectedEvidence}
          />
        ))}

        {filteredEvidence.length === 0 && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-16 text-center">
            <FileSearch
              size={32}
              className="mx-auto text-[var(--color-text-muted)]"
            />

            <h3 className="mt-3 text-sm font-medium text-[var(--color-text-secondary)]">
              No evidence found
            </h3>

            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Evidence detail drawer */}
      <EvidenceDetails
        evidence={selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
      />
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-center justify-between">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-2.5 text-[var(--color-accent)]">
          {icon}
        </div>

        <span className="text-xs text-[var(--color-text-secondary)]">
          Intelligence
        </span>
      </div>

      <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-[var(--color-text)]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
        {description}
      </p>
    </div>
  );
}