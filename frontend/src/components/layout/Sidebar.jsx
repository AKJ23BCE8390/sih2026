import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  FolderSearch,
  Users,
  Network,
  Search,
  Map,
  FileSearch,
  Shield,
  Settings,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Cases",
    path: "/cases",
    icon: FolderSearch,
  },
  {
    name: "Entities",
    path: "/entities",
    icon: Users,
  },
  {
    name: "Network Explorer",
    path: "/network",
    icon: Network,
  },
  {
    name: "Intelligence Search",
    path: "/search",
    icon: Search,
  },
  {
    name: "Crime Map",
    path: "/map",
    icon: Map,
  },
  {
    name: "Evidence",
    path: "/evidence",
    icon: FileSearch,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)]">

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-[var(--color-border)] px-6">
        <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]">
            <Shield className="h-6 w-6 text-[var(--color-primary)]" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide">
              VEDA BYTES
            </h1>

            <p className="text-xs text-[var(--color-text-secondary)]">
              Crime Intelligence
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-6">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Investigation
        </p>

        <div className="space-y-1">

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  group flex items-center gap-3 rounded-lg px-3 py-3
                  text-sm font-medium transition
                  ${
                    isActive
                      ? "border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)]"
                      : "border border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                  }
                  `
                }
              >
                <Icon className="h-5 w-5" />

                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* Bottom */}
      <div className="absolute bottom-0 w-full border-t border-[var(--color-border)] p-4">

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]">
          <Settings className="h-5 w-5" />
          Settings
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
