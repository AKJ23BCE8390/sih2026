import { useMemo, useState } from "react";
import {
  Search,
  Users,
  Building2,
  MapPin,
  LayoutGrid,
  List,
} from "lucide-react";

import { entities } from "../data/entities";
import EntityCard from "../components/entities/EntityCard";
import { entityColorVars } from "../theme/colors";

function Entities() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [view, setView] = useState("grid");

  const filteredEntities = useMemo(() => {
    return entities.filter((entity) => {

      const matchesSearch =
        entity.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        entity.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        entity.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "All" || entity.type === type;

      return matchesSearch && matchesType;
    });
  }, [search, type]);

  const counts = {
    Person: entities.filter((e) => e.type === "Person").length,
    Organization: entities.filter(
      (e) => e.type === "Organization"
    ).length,
    Location: entities.filter(
      (e) => e.type === "Location"
    ).length,
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm text-[var(--color-primary)]">
          Intelligence
        </p>

        <h1 className="mt-1 text-2xl font-bold">
          Entity Explorer
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Explore people, organizations and locations
          connected across investigations.
        </p>
      </div>

      {/* Entity statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="flex items-center justify-between">
            <Users className="h-5 w-5" style={{ color: entityColorVars.PERSON }} />
            <span className="text-2xl font-bold">
              {counts.Person}
            </span>
          </div>

          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            People
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="flex items-center justify-between">
            <Building2 className="h-5 w-5" style={{ color: entityColorVars.ORGANIZATION }} />
            <span className="text-2xl font-bold">
              {counts.Organization}
            </span>
          </div>

          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            Organizations
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="flex items-center justify-between">
            <MapPin className="h-5 w-5" style={{ color: entityColorVars.LOCATION }} />
            <span className="text-2xl font-bold">
              {counts.Location}
            </span>
          </div>

          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            Locations
          </p>
        </div>

      </div>

      {/* Search / Filters */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative flex-1 lg:max-w-xl">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search people, organizations or locations..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
            />

          </div>

          <div className="flex items-center gap-3">

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-sm text-[var(--color-text-secondary)] outline-none"
            >
              <option value="All">All Entities</option>
              <option value="Person">People</option>
              <option value="Organization">
                Organizations
              </option>
              <option value="Location">
                Locations
              </option>
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

      {/* Results */}
      <div className="flex items-center justify-between">

        <p className="text-sm text-[var(--color-text-secondary)]">
          {filteredEntities.length} entities found
        </p>

      </div>

      {filteredEntities.length === 0 ? (

        <div className="rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">

          <p className="text-[var(--color-text-secondary)]">
            No entities found.
          </p>

        </div>

      ) : view === "grid" ? (

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">

          {filteredEntities.map((entity) => (
            <EntityCard
              key={entity.id}
              entity={entity}
            />
          ))}

        </div>

      ) : (

        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">

          <table className="w-full text-left">

            <thead className="border-b border-[var(--color-border)] text-xs uppercase text-[var(--color-text-secondary)]">

              <tr>
                <th className="px-5 py-4">Entity</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Risk</th>
                <th className="px-5 py-4">Connections</th>
              </tr>

            </thead>

            <tbody>

              {filteredEntities.map((entity) => (

                <tr
                  key={entity.id}
                  className="border-b border-[var(--color-border)]/70 hover:bg-[var(--color-surface-hover)]/30"
                >

                  <td className="px-5 py-4">
                    <a
                      href={`/entities/${entity.id}`}
                      className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]"
                    >
                      {entity.name}
                    </a>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {entity.id}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                    {entity.type}
                  </td>

                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                    {entity.location}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        entity.risk === "High"
                          ? "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
                          : entity.risk === "Medium"
                          ? "bg-[var(--color-warning)]/10 text-[var(--color-warning)]"
                          : "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                      }`}
                    >
                      {entity.risk}
                    </span>

                  </td>

                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                    {entity.connections}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default Entities;
