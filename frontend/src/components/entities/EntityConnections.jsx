import {
  User,
  Building2,
  MapPin,
  FolderSearch,
  ArrowRight,
} from "lucide-react";

const icons = {
  Person: User,
  Organization: Building2,
  Location: MapPin,
  Case: FolderSearch,
};

function EntityConnections({ connections }) {
  return (
    <div className="divide-y divide-slate-800">

      {connections.map((connection, index) => {

        const Icon = icons[connection.type] || User;

        return (
          <div
            key={index}
            className="flex items-center gap-4 p-4 transition hover:bg-[var(--color-surface-hover)]/30"
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <Icon className="h-4 w-4 text-[var(--color-primary)]" />
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-medium">
                {connection.name}
              </p>

              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {connection.relationship}
              </p>

            </div>

            <ArrowRight className="h-4 w-4 text-[var(--color-text-muted)]" />

          </div>
        );
      })}

    </div>
  );
}

export default EntityConnections;