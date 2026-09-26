import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { severityColorVars, statusColorVars } from "../../theme/colors";

function CaseTable({ cases }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-[var(--color-border)] text-xs uppercase text-[var(--color-text-secondary)]">
          <tr>
            <th className="px-5 py-4">Case</th>
            <th className="px-5 py-4">Type</th>
            <th className="px-5 py-4">Location</th>
            <th className="px-5 py-4">Priority</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4"></th>
          </tr>
        </thead>

        <tbody>
          {cases.map((item) => {
            const priorityColor = severityColorVars[item.priority.toUpperCase()] || "var(--color-warning)";
            const statusKey = item.status.toUpperCase().replaceAll(" ", "_");
            const statusColor = statusColorVars[statusKey] || statusColorVars.REVIEW;
            return (
            <tr
              key={item.id}
              className="border-b border-[var(--color-border)]/70 transition hover:bg-[var(--color-surface-hover)]/30"
            >
              <td className="px-5 py-4">
                <p className="text-sm font-medium text-[var(--color-text)]">
                  {item.id}
                </p>

                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  {item.title}
                </p>
              </td>

              <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                {item.type}
              </td>

              <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                {item.location}
              </td>

              <td className="px-5 py-4">
                <span
                  className="rounded-full px-2.5 py-1 text-xs"
                  style={{ color: priorityColor, backgroundColor: `color-mix(in srgb, ${priorityColor} 10%, transparent)` }}
                >
                  {item.priority}
                </span>
              </td>

              <td className="px-5 py-4">
                <span className="rounded-full px-2.5 py-1 text-xs" style={{ color: statusColor, backgroundColor: `color-mix(in srgb, ${statusColor} 10%, transparent)` }}>
                  {item.status}
                </span>
              </td>

              <td className="px-5 py-4">
                <Link
                  to={`/cases/${item.id}`}
                  className="inline-flex rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)]"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </td>
            </tr>
          ); })}
        </tbody>
      </table>
    </div>
  );
}

export default CaseTable;
