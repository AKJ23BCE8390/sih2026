import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { severityColorVars, statusColorVars } from "../../theme/colors";

function CaseCard({ caseData }) {
  const priorityColor = severityColorVars[caseData.priority.toUpperCase()] || "var(--color-warning)";
  const statusKey = caseData.status.toUpperCase().replaceAll(" ", "_");
  const caseStatusColor = statusColorVars[statusKey] || statusColorVars.REVIEW;
  return (
    <Link
      to={`/cases/${caseData.id}`}
      className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] hover:bg-[var(--color-surface-hover)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--color-primary)]">
            {caseData.id}
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
            {caseData.title}
          </h3>
        </div>

        <ArrowUpRight className="h-5 w-5 text-[var(--color-text-muted)] transition group-hover:text-[var(--color-primary)]" />
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--color-text-secondary)]">
        {caseData.description}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-[var(--color-text-secondary)]">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[var(--color-text-secondary)]" />
          {caseData.location}
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[var(--color-text-secondary)]" />
          {caseData.date}
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[var(--color-text-secondary)]" />
          {caseData.persons.length} entities
        </div>

        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[var(--color-text-secondary)]" />
          {caseData.evidence} evidence
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
        <span
          className="rounded-full px-2.5 py-1 text-xs"
          style={{ color: priorityColor, backgroundColor: `color-mix(in srgb, ${priorityColor} 10%, transparent)` }}
        >
          {caseData.priority} Priority
        </span>

        <span className="rounded-full px-2.5 py-1 text-xs" style={{ color: caseStatusColor, backgroundColor: `color-mix(in srgb, ${caseStatusColor} 10%, transparent)` }}>
          {caseData.status}
        </span>
      </div>
    </Link>
  );
}

export default CaseCard;
