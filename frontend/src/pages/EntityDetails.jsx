import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Building2,
  MapPin,
  Network,
  FileText,
  ExternalLink,
} from "lucide-react";

import { entities } from "../data/entities";
import EntityConnections from "../components/entities/EntityConnections";

function EntityDetails() {
  const { id } = useParams();

  const entity = entities.find(
    (item) => item.id === id
  );

  if (!entity) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">

        <h2 className="text-lg font-semibold">
          Entity not found
        </h2>

        <Link
          to="/entities"
          className="mt-4 inline-block text-sm text-[var(--color-primary)]"
        >
          Return to entities
        </Link>

      </div>
    );
  }

  const Icon =
    entity.type === "Person"
      ? User
      : entity.type === "Organization"
      ? Building2
      : MapPin;

  const connections = [
    {
      name: "Amit Sharma",
      type: "Person",
      relationship: "Connected person",
    },
    {
      name: "CASE-2026-1024",
      type: "Case",
      relationship: "Associated case",
    },
    {
      name: "XYZ Logistics",
      type: "Organization",
      relationship: "Associated organization",
    },
    {
      name: "Chennai",
      type: "Location",
      relationship: "Associated location",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Back */}
      <Link
        to="/entities"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to entities
      </Link>

      {/* Entity header */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10">

              <Icon className="h-7 w-7 text-[var(--color-primary)]" />

            </div>

            <div>

              <div className="flex items-center gap-2">

                <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-primary)]">
                  {entity.type}
                </p>

                <span className="text-xs text-[var(--color-text-muted)]">
                  •
                </span>

                <span className="text-xs text-[var(--color-text-secondary)]">
                  {entity.id}
                </span>

              </div>

              <h1 className="mt-2 text-3xl font-bold">
                {entity.name}
              </h1>

              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {entity.description}
              </p>

            </div>

          </div>

          <span
            className={`self-start rounded-full px-3 py-1.5 text-xs ${
              entity.risk === "High"
                ? "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
                : entity.risk === "Medium"
                ? "bg-[var(--color-warning)]/10 text-[var(--color-warning)]"
                : "bg-[var(--color-success)]/10 text-[var(--color-success)]"
            }`}
          >
            {entity.risk} Risk
          </span>

        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-6 md:grid-cols-4">

          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Cases
            </p>

            <p className="mt-1 text-xl font-bold">
              {entity.cases.length}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Connections
            </p>

            <p className="mt-1 text-xl font-bold">
              {entity.connections}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Evidence
            </p>

            <p className="mt-1 text-xl font-bold">
              {entity.evidence}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Location
            </p>

            <p className="mt-1 flex items-center gap-1 text-sm font-medium">
              <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
              {entity.location}
            </p>
          </div>

        </div>

      </div>

      {/* Main */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Connections */}
        <div className="xl:col-span-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">

          <div className="flex items-center justify-between border-b border-[var(--color-border)] p-5">

            <div>

              <h2 className="font-semibold">
                Connected Entities
              </h2>

              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                Known relationships identified across records
              </p>

            </div>

            <Network className="h-5 w-5 text-[var(--color-primary)]" />

          </div>

          <EntityConnections
            connections={connections}
          />

        </div>

        {/* Entity information */}
        <div className="space-y-6">

          {/* Aliases */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">

            <h2 className="font-semibold">
              Known Aliases
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">

              {entity.aliases.map((alias) => (
                <span
                  key={alias}
                  className="rounded-lg bg-[var(--color-surface-hover)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)]"
                >
                  {alias}
                </span>
              ))}

            </div>

          </div>

          {/* Organizations */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">

            <h2 className="font-semibold">
              Organizations
            </h2>

            <div className="mt-4 space-y-3">

              {entity.organizations.length === 0 ? (

                <p className="text-sm text-[var(--color-text-muted)]">
                  No linked organizations.
                </p>

              ) : (

                entity.organizations.map((organization) => (

                  <div
                    key={organization}
                    className="flex items-center gap-3"
                  >

                    <Building2 className="h-4 w-4 text-[var(--color-secondary)]" />

                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {organization}
                    </span>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

      {/* Cases */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">

        <div className="border-b border-[var(--color-border)] p-5">

          <div className="flex items-center gap-2">

            <FileText className="h-5 w-5 text-[var(--color-primary)]" />

            <h2 className="font-semibold">
              Associated Cases
            </h2>

          </div>

        </div>

        <div className="grid gap-3 p-5 md:grid-cols-2">

          {entity.cases.map((caseId) => (

            <Link
              key={caseId}
              to={`/cases/${caseId}`}
              className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] p-4 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-surface-hover)]/30"
            >

              <div>

                <p className="text-sm font-medium">
                  {caseId}
                </p>

                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  Associated investigation
                </p>

              </div>

              <ExternalLink className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />

            </Link>

          ))}

        </div>

      </div>

      {/* Network button */}
      <div className="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="font-semibold">
              Investigate Entity Network
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Explore how this entity connects to people,
              cases, organizations and locations.
            </p>

          </div>

          <Link
            to="/network"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-[var(--color-background)] hover:bg-[var(--color-primary-hover)]"
          >
            <Network className="h-4 w-4" />
            Open Network Explorer
          </Link>

        </div>

      </div>

    </div>
  );
}

export default EntityDetails;