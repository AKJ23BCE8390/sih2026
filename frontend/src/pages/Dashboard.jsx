import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  FileSearch,
  GitBranch,
  Map,
  Network,
  Search,
  ShieldAlert,
  Users,
} from "lucide-react";

import {
  dashboardStats,
  caseActivity,
  crimeDistribution,
  networkStats,
  recentInvestigations,
  investigationTimeline,
} from "../data/dashboard";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-[var(--color-accent)]">
            <Activity size={16} />
            Investigation Intelligence
          </div>

          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Intelligence Dashboard
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[var(--color-text-secondary)]">
            Unified view of investigations, entities,
            relationships and evidence across the intelligence
            network.
          </p>
        </div>

        <button
          onClick={() => navigate("/search")}
          className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-[var(--color-background)] transition hover:bg-[var(--color-primary-hover)]"
        >
          <Search size={17} />
          Search Intelligence
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={<Briefcase size={20} />}
          label="Active Cases"
          value={dashboardStats.activeCases}
          change="+4 this month"
          onClick={() => navigate("/cases")}
        />

        <KpiCard
          icon={<Users size={20} />}
          label="Entities"
          value={dashboardStats.totalEntities}
          change="+18 identified"
          onClick={() => navigate("/entities")}
        />

        <KpiCard
          icon={<GitBranch size={20} />}
          label="Relationships"
          value={dashboardStats.relationships}
          change="+37 discovered"
          onClick={() => navigate("/network")}
        />

        <KpiCard
          icon={<FileSearch size={20} />}
          label="Evidence Records"
          value={dashboardStats.evidenceRecords}
          change="+26 indexed"
          onClick={() => navigate("/evidence")}
        />
      </div>

      {/* Main analytics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <CaseActivityChart />

        <CrimeDistribution />
      </div>

      {/* Network + quick actions */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
        <NetworkIntelligence
          onNetwork={() => navigate("/network")}
        />

        <QuickActions navigate={navigate} />
      </div>

      {/* Recent cases + timeline */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <RecentInvestigations
          cases={recentInvestigations}
          onOpen={() => navigate("/cases")}
        />

        <InvestigationTimeline />
      </div>

      {/* Map shortcut */}
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-primary)]/10 p-3 text-[var(--color-accent)]">
              <Map size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-[var(--color-text)]">
                Geographic Crime Intelligence
              </h3>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Explore the geographic distribution of
                investigations and connected entities.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/map")}
            className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
          >
            Open Intelligence Map
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Prototype notice */}
      <div className="rounded-xl border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-4 py-3">
        <div className="flex gap-3">
          <ShieldAlert
            size={17}
            className="mt-0.5 shrink-0 text-[var(--color-warning)]"
          />

          <p className="text-xs leading-5 text-[var(--color-warning)]/70">
            Dashboard values currently represent frontend
            prototype data. Production values will be populated
            from the intelligence ingestion, graph and evidence
            services.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* KPI CARD */
/* -------------------------------------------------- */

function KpiCard({
  icon,
  label,
  value,
  change,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-left transition hover:border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-2.5 text-[var(--color-accent)]">
          {icon}
        </div>

        <ArrowUpRight
          size={17}
          className="text-[var(--color-text-muted)] transition group-hover:text-[var(--color-accent)]"
        />
      </div>

      <p className="mt-5 text-sm text-[var(--color-text-secondary)]">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold text-[var(--color-text)]">
        {value}
      </p>

      <p className="mt-2 text-xs text-[var(--color-success)]">
        {change}
      </p>
    </button>
  );
}

/* -------------------------------------------------- */
/* CASE ACTIVITY */
/* -------------------------------------------------- */

function CaseActivityChart() {
  const max = Math.max(
    ...caseActivity.map((item) => item.cases)
  );

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-[var(--color-text)]">
            Investigation Activity
          </h2>

          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            Active investigations over the last six months
          </p>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)]">
          6 Months
        </div>
      </div>

      <div className="mt-8 flex h-56 items-end gap-3 md:gap-6">
        {caseActivity.map((item) => {
          const height = `${(item.cases / max) * 100}%`;

          return (
            <div
              key={item.month}
              className="flex h-full flex-1 flex-col justify-end"
            >
              <div className="group relative flex flex-1 items-end justify-center">
                <div
                  className="w-full max-w-12 rounded-t-md bg-[var(--color-primary)]/70 transition group-hover:bg-[var(--color-primary-hover)]"
                  style={{
                    height,
                    minHeight: "12px",
                  }}
                />

                <span className="absolute -top-6 text-[10px] text-[var(--color-text-secondary)] opacity-0 transition group-hover:opacity-100">
                  {item.cases}
                </span>
              </div>

              <p className="mt-3 text-center text-[11px] text-[var(--color-text-muted)]">
                {item.month}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* CRIME DISTRIBUTION */
/* -------------------------------------------------- */

function CrimeDistribution() {
  const total = crimeDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div>
        <h2 className="font-semibold text-[var(--color-text)]">
          Crime Intelligence
        </h2>

        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
          Distribution across indexed investigations
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {crimeDistribution.map((item) => {
          const percentage = Math.round(
            (item.count / total) * 100
          );

          return (
            <div key={item.type}>
              <div className="mb-2 flex justify-between gap-4">
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {item.type}
                </span>

                <span className="text-xs text-[var(--color-text-secondary)]">
                  {item.count} · {percentage}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-hover)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]/70"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* NETWORK INTELLIGENCE */
/* -------------------------------------------------- */

function NetworkIntelligence({ onNetwork }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-[var(--color-text)]">
            Network Intelligence
          </h2>

          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            Current intelligence graph composition
          </p>
        </div>

        <Network
          size={20}
          className="text-[var(--color-accent)]"
        />
      </div>

      <div className="mt-6 space-y-5">
        {networkStats.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between">
              <span className="text-xs text-[var(--color-text-secondary)]">
                {item.label}
              </span>

              <span className="text-xs text-[var(--color-text-secondary)]">
                {item.value}
              </span>
            </div>

            <div className="h-1.5 rounded-full bg-[var(--color-surface-hover)]">
              <div
                className="h-full rounded-full bg-[var(--color-primary)]"
                style={{
                  width: `${item.percentage * 2}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNetwork}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 text-xs text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
      >
        Open Network Explorer
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}

/* -------------------------------------------------- */
/* QUICK ACTIONS */
/* -------------------------------------------------- */

function QuickActions({ navigate }) {
  const actions = [
    {
      label: "Search Intelligence",
      description: "Find cases, entities and evidence",
      icon: <Search size={18} />,
      path: "/search",
    },
    {
      label: "Explore Network",
      description: "Analyze connected entities",
      icon: <Network size={18} />,
      path: "/network",
    },
    {
      label: "View Cases",
      description: "Review active investigations",
      icon: <Briefcase size={18} />,
      path: "/cases",
    },
    {
      label: "Evidence Records",
      description: "Trace intelligence to sources",
      icon: <FileSearch size={18} />,
      path: "/evidence",
    },
  ];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <h2 className="font-semibold text-[var(--color-text)]">
        Investigation Tools
      </h2>

      <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
        Jump directly into an intelligence workflow
      </p>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3 text-left transition hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface-hover)]"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-md border border-[var(--color-border)] p-2 text-[var(--color-accent)]">
                {action.icon}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-[var(--color-text)]">
                  {action.label}
                </p>

                <p className="mt-1 truncate text-[10px] text-[var(--color-text-muted)]">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* RECENT INVESTIGATIONS */
/* -------------------------------------------------- */

function RecentInvestigations({
  cases,
  onOpen,
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] p-5">
        <div>
          <h2 className="font-semibold text-[var(--color-text)]">
            Recent Investigations
          </h2>

          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            Most recently updated cases
          </p>
        </div>

        <button
          onClick={onOpen}
          className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
        >
          View all
        </button>
      </div>

      <div>
        {cases.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b border-[var(--color-border)] p-4 last:border-b-0"
          >
            <div className="hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-2.5 text-[var(--color-accent)] sm:block">
              <Briefcase size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-[var(--color-text)]">
                  {item.title}
                </p>

                <PriorityBadge
                  priority={item.priority}
                />
              </div>

              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {item.id} · {item.location}
              </p>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-xs text-[var(--color-text-secondary)]">
                {item.entities} entities
              </p>

              <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">
                {item.updated}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    CRITICAL:
      "bg-[var(--color-danger)]/10 text-[var(--color-danger)] border-[var(--color-danger)]/20",
    HIGH:
      "bg-[var(--color-severity-high)]/10 text-[var(--color-severity-high)] border-[var(--color-severity-high)]/20",
    MEDIUM:
      "bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20",
  };

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9px] ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

/* -------------------------------------------------- */
/* TIMELINE */
/* -------------------------------------------------- */

function InvestigationTimeline() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div>
        <h2 className="font-semibold text-[var(--color-text)]">
          Investigation Activity
        </h2>

        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
          Latest intelligence events
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {investigationTimeline.map((item, index) => (
          <div
            key={`${item.time}-${item.title}`}
            className="relative flex gap-3"
          >
            {index !== investigationTimeline.length - 1 && (
              <div className="absolute left-[5px] top-4 h-full w-px bg-[var(--color-surface-hover)]" />
            )}

            <div className="relative mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-background)]" />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                  {item.title}
                </p>

                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {item.time}
                </span>
              </div>

              <p className="mt-1 text-[11px] leading-5 text-[var(--color-text-muted)]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
