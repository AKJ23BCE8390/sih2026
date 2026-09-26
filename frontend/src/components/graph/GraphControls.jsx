import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

function GraphControls({
  depth,
  setDepth,
  onZoomIn,
  onZoomOut,
  onReset,
}) {
  return (
    <div className="space-y-5">

      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
          Relationship Depth
        </label>

        <div className="mt-3 flex items-center gap-3">

          <span className="text-xs text-[var(--color-text-secondary)]">
            1
          </span>

          <input
            type="range"
            min="1"
            max="4"
            value={depth}
            onChange={(e) =>
              setDepth(Number(e.target.value))
            }
            className="w-full accent-[var(--color-primary)]"
          />

          <span className="text-xs text-[var(--color-text-secondary)]">
            4
          </span>

        </div>

        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          Current depth: {depth}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">

        <button
          onClick={onZoomIn}
          className="flex items-center justify-center rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
        >
          <ZoomIn className="h-4 w-4" />
        </button>

        <button
          onClick={onZoomOut}
          className="flex items-center justify-center rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
        >
          <ZoomOut className="h-4 w-4" />
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

      </div>

    </div>
  );
}

export default GraphControls;