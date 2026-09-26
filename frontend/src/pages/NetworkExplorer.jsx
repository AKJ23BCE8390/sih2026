import { useMemo, useRef, useState } from "react";
import {
  Building2,
  FolderSearch,
  MapPin,
  Network,
  Search,
  User,
  X,
} from "lucide-react";

import NetworkGraph from "../components/graph/NetworkGraph";
import GraphLegend from "../components/graph/GraphLegend";
import GraphControls from "../components/graph/GraphControls";
import { networkData } from "../data/network";

const nodeIcons = {
  Person: User,
  Organization: Building2,
  Location: MapPin,
  Case: FolderSearch,
};

const linkId = (value) => (typeof value === "object" ? value.id : value);

function NetworkExplorer() {
  const graphRef = useRef();
  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [depth, setDepth] = useState(2);
  const [enabledTypes, setEnabledTypes] = useState(
    () => new Set(["Person", "Case", "Organization", "Location"]),
  );

  const filteredNodes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return networkData.nodes.filter((node) =>
      enabledTypes.has(node.type) &&
      (!query || `${node.name} ${node.id} ${node.type}`.toLowerCase().includes(query)),
    );
  }, [search, enabledTypes]);

  const graphData = useMemo(() => {
    const allowed = new Set(networkData.nodes
      .filter((node) => enabledTypes.has(node.type) || node.id === selectedNode?.id)
      .map((node) => node.id));

    let visible = new Set(allowed);
    if (selectedNode) {
      visible = new Set([selectedNode.id]);
      for (let level = 0; level < depth; level += 1) {
        const next = new Set(visible);
        networkData.links.forEach((link) => {
          const source = linkId(link.source);
          const target = linkId(link.target);
          if (visible.has(source) && allowed.has(target)) next.add(target);
          if (visible.has(target) && allowed.has(source)) next.add(source);
        });
        visible = next;
      }
    }

    const nodes = networkData.nodes.filter((node) => visible.has(node.id));
    const ids = new Set(nodes.map((node) => node.id));
    const links = networkData.links.filter((link) =>
      ids.has(linkId(link.source)) && ids.has(linkId(link.target)),
    );
    return { nodes, links };
  }, [selectedNode, depth, enabledTypes]);

  const connectedLinks = useMemo(() => {
    if (!selectedNode) return [];
    return networkData.links
      .filter((link) => linkId(link.source) === selectedNode.id || linkId(link.target) === selectedNode.id)
      .map((link) => {
        const otherId = linkId(link.source) === selectedNode.id
          ? linkId(link.target)
          : linkId(link.source);
        return { ...link, other: networkData.nodes.find((node) => node.id === otherId) };
      })
      .filter((link) => link.other);
  }, [selectedNode]);

  const toggleType = (type) => {
    setEnabledTypes((current) => {
      const next = new Set(current);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
    if (selectedNode && selectedNode.type === type && enabledTypes.has(type)) {
      setSelectedNode(null);
    }
  };

  const handleReset = () => graphRef.current?.zoomToFit(500, 60);
  const Icon = selectedNode ? (nodeIcons[selectedNode.type] || User) : null;

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-primary)]">Investigation</p>
          <h1 className="mt-1 text-2xl font-bold">Network Explorer</h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--color-text-secondary)]">
            Explore demo relationships between people, cases, organizations, and locations.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" /> Demo intelligence graph
        </span>
      </header>

      <section className="grid min-h-[680px] grid-cols-1 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] xl:grid-cols-[250px_minmax(0,1fr)_300px]">
        <aside className="border-b border-[var(--color-border)] p-5 xl:border-b-0 xl:border-r">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-[var(--color-primary)]" />
            <h2 className="font-semibold">Explore graph</h2>
          </div>

          <div className="relative mt-5">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search entities..."
              aria-label="Search entities"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
            />
          </div>
          {search.trim() && (
            <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]">
              {filteredNodes.length ? filteredNodes.map((node) => {
                const NodeIcon = nodeIcons[node.type] || User;
                return (
                  <button
                    key={node.id}
                    onClick={() => { setSelectedNode(node); setSearch(""); }}
                    className="flex w-full items-center gap-3 p-3 text-left hover:bg-[var(--color-surface-hover)]"
                  >
                    <NodeIcon className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-medium">{node.name}</span>
                      <span className="text-[10px] text-[var(--color-text-muted)]">{node.type}</span>
                    </span>
                  </button>
                );
              }) : <p className="p-3 text-xs text-[var(--color-text-muted)]">No matching entities.</p>}
            </div>
          )}

          <div className="my-6 border-t border-[var(--color-border)]" />
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">Show entity types</p>
          <div className="mt-3 space-y-2">
            {["Person", "Case", "Organization", "Location"].map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <input
                  type="checkbox"
                  checked={enabledTypes.has(type)}
                  onChange={() => toggleType(type)}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                {type}
              </label>
            ))}
          </div>

          <div className="my-6 border-t border-[var(--color-border)]" />
          <GraphControls
            depth={depth}
            setDepth={setDepth}
            onZoomIn={() => graphRef.current?.zoom(2, 350)}
            onZoomOut={() => graphRef.current?.zoom(0.5, 350)}
            onReset={handleReset}
          />
          <div className="my-6 border-t border-[var(--color-border)]" />
          <GraphLegend />
        </aside>

        <div className="relative min-h-[520px] xl:min-h-0">
          <NetworkGraph
            data={graphData}
            selectedNode={selectedNode}
            onNodeSelect={setSelectedNode}
            graphRef={graphRef}
          />
          <div className="absolute left-4 top-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]/90 px-3 py-2 backdrop-blur">
            <p className="text-xs text-[var(--color-text-secondary)]">
              {graphData.nodes.length} entities <span aria-hidden="true">·</span> {graphData.links.length} relationships
            </p>
          </div>
          {selectedNode && (
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute right-4 top-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]/90 px-3 py-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            >Show all entities</button>
          )}
        </div>

        <aside className="border-t border-[var(--color-border)] xl:border-l xl:border-t-0">
          {!selectedNode ? (
            <div className="flex h-full min-h-[260px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10">
                <Network className="h-7 w-7 text-[var(--color-primary)]" />
              </div>
              <h3 className="mt-5 font-semibold">Select an entity</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                Click a graph node or search for an entity to inspect its connections.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between border-b border-[var(--color-border)] p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    {Icon && <Icon className="h-5 w-5 text-[var(--color-primary)]" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{selectedNode.type}</p>
                    <h2 className="truncate text-sm font-semibold">{selectedNode.name}</h2>
                  </div>
                </div>
                <button
                  aria-label="Clear selection"
                  onClick={() => setSelectedNode(null)}
                  className="rounded-lg p-1.5 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                ><X className="h-4 w-4" /></button>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Entity ID</p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{selectedNode.id}</p>
                <div className="my-5 border-t border-[var(--color-border)]" />
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Connections</p>
                  <span className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] text-[var(--color-primary)]">{connectedLinks.length}</span>
                </div>
                <div className="mt-3 space-y-2">
                  {connectedLinks.length ? connectedLinks.map((link, index) => (
                    <button
                      key={`${link.relationship}-${link.other.id}-${index}`}
                      onClick={() => setSelectedNode(link.other)}
                      className="w-full rounded-lg border border-[var(--color-border)] p-3 text-left transition hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-hover)]"
                    >
                      <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-primary)]">{link.relationship.replaceAll("_", " ")}</span>
                      <span className="mt-1 block text-sm font-medium">{link.other.name}</span>
                      <span className="mt-1 block text-[10px] text-[var(--color-text-muted)]">{link.other.type} · click to inspect</span>
                    </button>
                  )) : <p className="text-sm text-[var(--color-text-muted)]">No relationships in the demo data.</p>}
                </div>
              </div>
            </div>
          )}
        </aside>
      </section>
      <p className="text-xs text-[var(--color-text-muted)]">Demo data for exploration only. Relationship depth limits the graph around the selected entity.</p>
    </div>
  );
}

export default NetworkExplorer;
