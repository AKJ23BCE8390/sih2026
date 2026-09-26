import { useMemo, useRef, useState } from "react";
import {
  Search,
  Network,
  User,
  Building2,
  MapPin,
  FolderSearch,
  X,
} from "lucide-react";

import NetworkGraph from "../components/graph/NetworkGraph";
import GraphLegend from "../components/graph/GraphLegend";
import GraphControls from "../components/graph/GraphControls";
import {
  networkData,
} from "../data/network";

const nodeIcons = {
  Person: User,
  Organization: Building2,
  Location: MapPin,
  Case: FolderSearch,
};

function NetworkExplorer() {
  const graphRef = useRef();

  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] =
    useState(null);

  const [depth, setDepth] = useState(2);

  const filteredNodes = useMemo(() => {
    if (!search.trim()) {
      return networkData.nodes;
    }

    return networkData.nodes.filter((node) =>
      node.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const graphData = useMemo(() => {
    if (!selectedNode) {
      return networkData;
    }

    const selectedId = selectedNode.id;

    const connectedIds = new Set([selectedId]);

    for (let i = 0; i < depth; i++) {
      networkData.links.forEach((link) => {
        const source =
          typeof link.source === "object"
            ? link.source.id
            : link.source;

        const target =
          typeof link.target === "object"
            ? link.target.id
            : link.target;

        if (connectedIds.has(source)) {
          connectedIds.add(target);
        }

        if (connectedIds.has(target)) {
          connectedIds.add(source);
        }
      });
    }

    const nodes = networkData.nodes.filter(
      (node) => connectedIds.has(node.id)
    );

    const nodeIds = new Set(
      nodes.map((node) => node.id)
    );

    const links = networkData.links.filter(
      (link) => {
        const source =
          typeof link.source === "object"
            ? link.source.id
            : link.source;

        const target =
          typeof link.target === "object"
            ? link.target.id
            : link.target;

        return (
          nodeIds.has(source) &&
          nodeIds.has(target)
        );
      }
    );

    return {
      nodes,
      links,
    };
  }, [selectedNode, depth]);

  const handleZoomIn = () => {
  graphRef.current?.zoom(
    2,
    500
  );
};

const handleZoomOut = () => {
  graphRef.current?.zoom(
    0.5,
    500
  );
};
  const handleReset = () => {
    graphRef.current?.zoomToFit(500, 60);
  };

  const Icon =
    selectedNode &&
    (nodeIcons[selectedNode.type] || User);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-sm text-[var(--color-primary)]">
            Investigation
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            Network Explorer
          </h1>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Explore relationships between people,
            cases, organizations and locations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
          <span className="text-xs text-[var(--color-text-secondary)]">
            Intelligence graph active
          </span>
        </div>

      </div>

      {/* Main Explorer */}
      <div className="grid min-h-[680px] grid-cols-1 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] xl:grid-cols-[250px_1fr_300px]">

        {/* Left panel */}
        <aside className="border-b border-[var(--color-border)] p-5 xl:border-b-0 xl:border-r">

          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-[var(--color-primary)]" />

            <h2 className="font-semibold">
              Graph Controls
            </h2>
          </div>

          {/* Search */}
          <div className="relative mt-5">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Find entity..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-9 pr-3 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
            />

          </div>

          {/* Search results */}
          {search && (
            <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]">

              {filteredNodes.length === 0 ? (

                <p className="p-3 text-xs text-[var(--color-text-muted)]">
                  No entities found.
                </p>

              ) : (

                filteredNodes.map((node) => {

                  const NodeIcon =
                    nodeIcons[node.type] || User;

                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        setSelectedNode(node);
                        setSearch("");
                      }}
                      className="flex w-full items-center gap-3 p-3 text-left hover:bg-[var(--color-surface-hover)]"
                    >

                      <NodeIcon className="h-4 w-4 text-[var(--color-primary)]" />

                      <div>
                        <p className="text-xs font-medium">
                          {node.name}
                        </p>

                        <p className="text-[10px] text-[var(--color-text-muted)]">
                          {node.type}
                        </p>
                      </div>

                    </button>
                  );
                })

              )}

            </div>
          )}

          <div className="my-6 border-t border-[var(--color-border)]" />

          <GraphControls
            depth={depth}
            setDepth={setDepth}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
          />

          <div className="my-6 border-t border-[var(--color-border)]" />

          <GraphLegend />

        </aside>

        {/* Graph */}
        <div className="relative min-h-[550px]">

          <NetworkGraph
            data={graphData}
            selectedNode={selectedNode}
            onNodeSelect={setSelectedNode}
            graphRef={graphRef}
          />

          {/* Graph info */}
          <div className="absolute left-4 top-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]/90 px-3 py-2 backdrop-blur">

            <p className="text-xs text-[var(--color-text-secondary)]">
              {graphData.nodes.length} entities
              {" · "}
              {graphData.links.length} relationships
            </p>

          </div>

        </div>

        {/* Right panel */}
        <aside className="border-t border-[var(--color-border)] xl:border-l xl:border-t-0">

          {!selectedNode ? (

            <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-8 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10">

                <Network className="h-7 w-7 text-[var(--color-primary)]" />

              </div>

              <h3 className="mt-5 font-semibold">
                Select an entity
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                Click any node in the graph to inspect
                its relationships and investigation data.
              </p>

            </div>

          ) : (

            <div>

              <div className="flex items-center justify-between border-b border-[var(--color-border)] p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">

                    {Icon && (
                      <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                    )}

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                      {selectedNode.type}
                    </p>

                    <h2 className="text-sm font-semibold">
                      {selectedNode.name}
                    </h2>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedNode(null)
                  }
                  className="rounded-lg p-1.5 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>

              <div className="p-5">

                <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                  Entity ID
                </p>

                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {selectedNode.id}
                </p>

                <div className="my-5 border-t border-[var(--color-border)]" />

                <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                  Connected Relationships
                </p>

                <div className="mt-3 space-y-2">

                  {networkData.links
                    .filter((link) => {

                      const source =
                        typeof link.source === "object"
                          ? link.source.id
                          : link.source;

                      const target =
                        typeof link.target === "object"
                          ? link.target.id
                          : link.target;

                      return (
                        source === selectedNode.id ||
                        target === selectedNode.id
                      );
                    })
                    .map((link, index) => {

                      const source =
                        typeof link.source === "object"
                          ? link.source
                          : networkData.nodes.find(
                              (node) =>
                                node.id === link.source
                            );

                      const target =
                        typeof link.target === "object"
                          ? link.target
                          : networkData.nodes.find(
                              (node) =>
                                node.id === link.target
                            );

                      const other =
                        source.id === selectedNode.id
                          ? target
                          : source;

                      return (
                        <div
                          key={index}
                          className="rounded-lg border border-[var(--color-border)] p-3"
                        >

                          <p className="text-xs text-[var(--color-primary)]">
                            {link.relationship}
                          </p>

                          <p className="mt-1 text-sm font-medium">
                            {other?.name}
                          </p>

                          <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">
                            {other?.type}
                          </p>

                        </div>
                      );
                    })}

                </div>

              </div>

            </div>

          )}

        </aside>

      </div>

    </div>
  );
}

export default NetworkExplorer;