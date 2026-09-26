import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetails from "./pages/CaseDetails";
import Entities from "./pages/Entities";
import EntityDetails from "./pages/EntityDetails";
import NetworkExplorer from "./pages/NetworkExplorer";
import SemanticSearch from "./pages/SemanticSearch";
import CrimeMap from "./pages/CrimeMap";
import Evidence from "./pages/Evidence";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:id" element={<CaseDetails />} />

          <Route path="/entities" element={<Entities />} />
          <Route path="/entities/:id" element={<EntityDetails />} />

          <Route path="/network" element={<NetworkExplorer />} />

          <Route path="/search" element={<SemanticSearch />} />

          <Route path="/map" element={<CrimeMap />} />

          <Route path="/evidence" element={<Evidence />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
