import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Sidebar />

      <div className="ml-64 min-h-screen bg-[var(--color-background)]">
        <Header />

        <main className="p-6 text-[var(--color-text)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
