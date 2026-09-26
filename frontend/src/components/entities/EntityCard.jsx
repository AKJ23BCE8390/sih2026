import { Link } from "react-router-dom";
import {
  User,
  Building2,
  MapPin,
  Network,
  ArrowUpRight,
} from "lucide-react";
import { entityColorVars, severityColorVars } from "../../theme/colors";

const icons = {
  Person: User,
  Organization: Building2,
  Location: MapPin,
};

function EntityCard({ entity }) {
  const Icon = icons[entity.type] || User;
  const entityColor = entityColorVars[entity.type.toUpperCase()] || entityColorVars.PERSON;
  const riskColor = severityColorVars[entity.risk.toUpperCase()] || severityColorVars.LOW;

  return (
    <Link
      to={`/entities/${entity.id}`}
      className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] hover:bg-[var(--color-surface-hover)]"
    >
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-surface-hover)]" style={{ color: entityColor }}>
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              {entity.type}
            </p>

            <h3 className="mt-1 font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
              {entity.name}
            </h3>
          </div>

        </div>

        <ArrowUpRight className="h-5 w-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />

      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-[var(--color-text-secondary)]">
        {entity.description}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">

        <div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Location
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
            <MapPin className="h-3.5 w-3.5" />
            {entity.location}
          </p>
        </div>

        <div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Connections
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
            <Network className="h-3.5 w-3.5" />
            {entity.connections}
          </p>
        </div>

      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-4">

        <span
          className="rounded-full px-2.5 py-1 text-xs"
          style={{ color: riskColor, backgroundColor: `color-mix(in srgb, ${riskColor} 10%, transparent)` }}
        >
          {entity.risk} Risk
        </span>

        <span className="text-xs text-[var(--color-text-secondary)]">
          {entity.cases.length} cases
        </span>

      </div>
    </Link>
  );
}

export default EntityCard;
