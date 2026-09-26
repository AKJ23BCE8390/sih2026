import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Building2,
  FileText,
  Network,
  ShieldCheck,
} from "lucide-react";

import { cases } from "../data/cases";
import { severityColorVars, statusColorVars } from "../theme/colors";

function CaseDetails() {
  const { id } = useParams();

  const caseData = cases.find((item) => item.id === id);
  const priorityColor = caseData && (severityColorVars[caseData.priority.toUpperCase()] || "var(--color-warning)");
  const statusKey = caseData?.status.toUpperCase().replaceAll(" ", "_");
  const caseStatusColor = statusColorVars[statusKey] || statusColorVars.REVIEW;

  if (!caseData) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
        <h2 className="text-lg font-semibold">
          Case not found
        </h2>

        <Link
          to="/cases"
          className="mt-4 inline-block text-sm text-[var(--color-primary)]"
        >
          Return to cases
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Back */}
      <Link
        to="/cases"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cases
      </Link>

      {/* Header */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          <div>
            <p className="text-sm font-medium text-[var(--color-primary)]">
              {caseData.id}
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {caseData.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
              {caseData.description}
            </p>
          </div>

          <div className="flex gap-2">

            <span className="rounded-full px-3 py-1.5 text-xs" style={{ color: priorityColor, backgroundColor: `color-mix(in srgb, ${priorityColor} 10%, transparent)` }}>
              {caseData.priority} Priority
            </span>

            <span className="rounded-full px-3 py-1.5 text-xs" style={{ color: caseStatusColor, backgroundColor: `color-mix(in srgb, ${caseStatusColor} 10%, transparent)` }}>
              {caseData.status}
            </span>

          </div>

        </div>

        {/* Metadata */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-6 md:grid-cols-4">

          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Location
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
              {caseData.location}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Date Opened
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-[var(--color-primary)]" />
              {caseData.date}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Investigating Officer
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-[var(--color-primary)]" />
              {caseData.officer}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Evidence
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-[var(--color-primary)]" />
              {caseData.evidence} items
            </p>
          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <UsersIcon />
          <p className="mt-4 text-2xl font-bold">
            {caseData.persons.length}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Connected Persons
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <Building2 className="h-5 w-5 text-[var(--color-secondary)]" />
          <p className="mt-4 text-2xl font-bold">
            {caseData.organizations.length}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Organizations
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <Network className="h-5 w-5 text-[var(--color-success)]" />
          <p className="mt-4 text-2xl font-bold">
            {caseData.relationships}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Relationships
          </p>
        </div>

      </div>

      {/* Entities */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">

          <div className="border-b border-[var(--color-border)] p-5">
            <h2 className="font-semibold">
              Connected Persons
            </h2>
          </div>

          <div className="divide-y divide-slate-800">

            {caseData.persons.map((person) => (
              <div
                key={person}
                className="flex items-center gap-3 p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                  <User className="h-4 w-4 text-[var(--color-primary)]" />
                </div>

                <span className="text-sm">
                  {person}
                </span>
              </div>
            ))}

          </div>

        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">

          <div className="border-b border-[var(--color-border)] p-5">
            <h2 className="font-semibold">
              Connected Organizations
            </h2>
          </div>

          <div className="divide-y divide-slate-800">

            {caseData.organizations.map((organization) => (
              <div
                key={organization}
                className="flex items-center gap-3 p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-secondary)]/10">
                  <Building2 className="h-4 w-4 text-[var(--color-secondary)]" />
                </div>

                <span className="text-sm">
                  {organization}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Graph CTA */}
      <div className="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[var(--color-primary)]" />

              <h2 className="font-semibold">
                Explore Case Network
              </h2>
            </div>

            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Analyze relationships between people, cases,
              organizations and locations.
            </p>
          </div>

          <Link
            to="/network"
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-[var(--color-background)] transition hover:bg-[var(--color-primary-hover)]"
          >
            Open Network Explorer
          </Link>

        </div>

      </div>

    </div>
  );
}

function UsersIcon() {
  return (
    <User className="h-5 w-5 text-[var(--color-primary)]" />
  );
}

export default CaseDetails;
