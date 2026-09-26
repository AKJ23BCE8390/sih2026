import { useMemo, useState } from "react";
import {
  Map,
  MapPin,
  ShieldAlert,
  Building2,
  Users,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";

import CrimeMap from "../components/map/CrimeMap";
import { crimeLocations } from "../data/crimeLocations";

const severityOptions = [
  "ALL",
  "CRITICAL",
  "HIGH",
  "MEDIUM",
  "LOW",
];

export default function CrimeMapPage() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState(
    crimeLocations[0]
  );

  const filteredLocations = useMemo(() => {
    return crimeLocations.filter((location) => {
      const matchesSearch =
        location.city
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        location.state
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSeverity =
        severity === "ALL" ||
        location.severity === severity;

      return matchesSearch && matchesSeverity;
    });
  }, [search, severity]);

  const totalCases = crimeLocations.reduce(
    (sum, location) => sum + location.cases,
    0
  );

  const totalEntities = crimeLocations.reduce(
    (sum, location) => sum + location.entities,
    0
  );

  const totalOrganizations = crimeLocations.reduce(
    (sum, location) => sum + location.organizations,
    0
  );

  const criticalLocations = crimeLocations.filter(
    (location) => location.severity === "CRITICAL"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-[var(--color-accent)]">
            <Map size={16} />
            Geographic Intelligence
          </div>

          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Crime Intelligence Map
          </h1>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Explore geographic distribution of cases,
            entities and investigative activity.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
          <span className="text-xs text-[var(--color-text-secondary)]">
            Intelligence dataset active
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<ShieldAlert size={20} />}
          label="Total Cases"
          value={totalCases}
          description="Mapped investigations"
        />

        <StatCard
          icon={<Users size={20} />}
          label="Connected Entities"
          value={totalEntities}
          description="Persons and entities"
        />

        <StatCard
          icon={<Building2 size={20} />}
          label="Organizations"
          value={totalOrganizations}
          description="Linked organizations"
        />

        <StatCard
          icon={<MapPin size={20} />}
          label="Critical Locations"
          value={criticalLocations}
          description="High activity locations"
        />
      </div>

      {/* Main */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        {/* Map section */}
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
              />

              <input
                type="text"
                placeholder="Search city or state..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={16} className="text-[var(--color-text-secondary)]" />

              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-sm text-[var(--color-text-secondary)] outline-none"
              >
                {severityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "ALL"
                      ? "All Severity"
                      : option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Map */}
          <CrimeMap
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onSelect={setSelectedLocation}
          />

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
            <span className="text-xs font-medium text-[var(--color-text-secondary)]">
              Severity
            </span>

            <LegendItem color="bg-[var(--color-danger)]" label="Critical" />
            <LegendItem color="bg-[var(--color-severity-high)]" label="High" />
            <LegendItem color="bg-[var(--color-warning)]" label="Medium" />
            <LegendItem color="bg-[var(--color-success)]" label="Low" />

            <span className="ml-auto text-xs text-[var(--color-text-secondary)]">
              Marker size indicates case volume
            </span>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Selected location */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Selected Location
                </p>

                <h2 className="mt-1 text-xl font-bold text-[var(--color-text)]">
                  {selectedLocation?.city || "No location"}
                </h2>

                <p className="text-sm text-[var(--color-text-secondary)]">
                  {selectedLocation?.state}
                </p>
              </div>

              <MapPin
                size={22}
                className="text-[var(--color-accent)]"
              />
            </div>

            {selectedLocation && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <MiniStat
                    label="Cases"
                    value={selectedLocation.cases}
                  />

                  <MiniStat
                    label="Entities"
                    value={selectedLocation.entities}
                  />

                  <MiniStat
                    label="Organizations"
                    value={selectedLocation.organizations}
                  />

                  <MiniStat
                    label="Severity"
                    value={selectedLocation.severity}
                  />
                </div>

                <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Crime Types
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedLocation.types.map((type) => (
                      <span
                        key={type}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)]"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3">
                  <p className="text-xs leading-5 text-[var(--color-text-secondary)]">
                    {selectedLocation.description}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Locations */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="border-b border-[var(--color-border)] p-4">
              <h3 className="font-semibold text-[var(--color-text)]">
                Activity Locations
              </h3>

              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {filteredLocations.length} locations shown
              </p>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
              {filteredLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() =>
                    setSelectedLocation(location)
                  }
                  className={`flex w-full items-center gap-3 border-b border-[var(--color-border)] p-4 text-left transition hover:bg-[var(--color-surface-hover)]/60 ${
                    selectedLocation?.id === location.id
                      ? "bg-[var(--color-surface-hover)]/50"
                      : ""
                  }`}
                >
                  <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-2">
                    <MapPin
                      size={17}
                      className="text-[var(--color-accent)]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-[var(--color-text)]">
                        {location.city}
                      </p>

                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {location.cases} cases
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                      {location.state}
                    </p>
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-[var(--color-text-muted)]"
                  />
                </button>
              ))}

              {filteredLocations.length === 0 && (
                <div className="p-8 text-center">
                  <MapPin
                    size={24}
                    className="mx-auto text-[var(--color-text-muted)]"
                  />

                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    No locations found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Demo disclaimer */}
      <div className="rounded-lg border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-4 py-3">
        <p className="text-xs leading-5 text-[var(--color-warning)]/80">
          Demo data: geographic counts and severity indicators
          are mock investigation data for the frontend prototype.
          They should be replaced by verified backend records
          before operational use.
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, description }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-center justify-between">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-2.5 text-[var(--color-accent)]">
          {icon}
        </div>

        <span className="text-xs text-[var(--color-success)]">
          Live
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

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3">
      <p className="text-xs text-[var(--color-text-secondary)]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
        {value}
      </p>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2.5 w-2.5 rounded-full ${color}`}
      />

      <span className="text-xs text-[var(--color-text-secondary)]">
        {label}
      </span>
    </div>
  );
}