import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";

import { cases } from "../data/cases";
import CaseCard from "../components/cases/CaseCard";
import CaseTable from "../components/cases/CaseTable";

function Cases() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [view, setView] = useState("grid");

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        type === "All" || item.type === type;

      const matchesStatus =
        status === "All" || item.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, type, status]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm text-[var(--color-primary)]">
          Investigation
        </p>

        <h1 className="mt-1 text-2xl font-bold">
          Cases
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Search and investigate connected crime cases.
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative flex-1 lg:max-w-xl">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by case ID, title or location..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
            />

          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-secondary)] outline-none"
            >
              <option value="All">All Types</option>
              <option value="Theft">Theft</option>
              <option value="Fraud">Fraud</option>
              <option value="Vehicle Theft">Vehicle Theft</option>
              <option value="Cyber Crime">Cyber Crime</option>
              <option value="Organized Crime">Organized Crime</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-secondary)] outline-none"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Under Investigation">
                Under Investigation
              </option>
              <option value="Review">Review</option>
            </select>

            <div className="flex rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-1">

              <button
                onClick={() => setView("grid")}
                className={`rounded-md p-2 ${
                  view === "grid"
                    ? "bg-[var(--color-surface-hover)] text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)]"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>

              <button
                onClick={() => setView("list")}
                className={`rounded-md p-2 ${
                  view === "list"
                    ? "bg-[var(--color-surface-hover)] text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)]"
                }`}
              >
                <List className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Result count */}
      <div className="flex items-center justify-between">

        <p className="text-sm text-[var(--color-text-secondary)]">
          Showing{" "}
          <span className="font-medium text-[var(--color-text-secondary)]">
            {filteredCases.length}
          </span>{" "}
          cases
        </p>

      </div>

      {/* Cases */}
      {filteredCases.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">
          <p className="text-[var(--color-text-secondary)]">
            No cases found.
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCases.map((item) => (
            <CaseCard key={item.id} caseData={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <CaseTable cases={filteredCases} />
        </div>
      )}

    </div>
  );
}

export default Cases;