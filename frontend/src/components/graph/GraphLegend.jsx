import { entityColorVars } from "../../theme/colors";

const legend = [
  {
    label: "Person",
    color: entityColorVars.PERSON,
  },
  {
    label: "Case",
    color: entityColorVars.CASE,
  },
  {
    label: "Organization",
    color: entityColorVars.ORGANIZATION,
  },
  {
    label: "Location",
    color: entityColorVars.LOCATION,
  },
];

function GraphLegend() {
  return (
    <div className="flex flex-wrap gap-4">
      {legend.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />

          {item.label}
        </div>
      ))}
    </div>
  );
}

export default GraphLegend;
