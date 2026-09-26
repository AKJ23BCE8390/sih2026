import { useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import useThemeRefresh, { readThemeColor } from "../../hooks/useThemeRefresh";

const getNodeId = (node) => (typeof node === "object" ? node.id : node);

const nodeColors = {
  Person: "entity-person",
  Case: "entity-case",
  Organization: "entity-organization",
  Location: "entity-location",
};

function NetworkGraph({
  data,
  selectedNode,
  onNodeSelect,
  graphRef,
}) {
  useThemeRefresh();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && graphRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      graphRef.current.width(width);
      graphRef.current.height(height);
    }
  }, [graphRef]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden bg-[var(--color-background)]"
    >
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        backgroundColor={readThemeColor("background")}
        nodeRelSize={7}
        linkColor={() => readThemeColor("text-muted")}
        linkWidth={(link) =>
          selectedNode &&
          (getNodeId(link.source) === selectedNode.id ||
            getNodeId(link.target) === selectedNode.id)
            ? 2
            : 1
        }
        linkDirectionalArrowLength={3}
        linkDirectionalArrowRelPos={1}
        linkLabel={(link) => link.relationship}
        onNodeClick={onNodeSelect}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 11 / globalScale;

          const color = readThemeColor(
            nodeColors[node.type] || "text-secondary"
          );

          const isSelected =
            selectedNode?.id === node.id;

          ctx.beginPath();

          ctx.arc(
            node.x,
            node.y,
            isSelected ? 9 : 6,
            0,
            2 * Math.PI
          );

          ctx.fillStyle = color;
          ctx.fill();

          if (isSelected) {
            ctx.strokeStyle = readThemeColor("white");
            ctx.lineWidth = 2 / globalScale;
            ctx.stroke();
          }

          if (globalScale > 0.8 || isSelected) {
            ctx.font = `${fontSize}px Inter, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = readThemeColor("text-secondary");

            ctx.fillText(
              label,
              node.x,
              node.y + 14
            );
          }
        }}
      />
    </div>
  );
}

export default NetworkGraph;
