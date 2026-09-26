import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import { severityColorVars } from "../../theme/colors";
import useThemeRefresh, { readThemeColor } from "../../hooks/useThemeRefresh";

const CARTO_API_KEY = import.meta.env.VITE_CARTO_API_KEY;

function MapController({ selectedLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedLocation) return;

    map.flyTo(
      [selectedLocation.lat, selectedLocation.lng],
      8,
      {
        duration: 0.8,
      }
    );
  }, [selectedLocation, map]);

  return null;
}

function getRadius(cases) {
  return Math.min(25, Math.max(8, cases * 1.1));
}

export default function CrimeMap({
  locations,
  selectedLocation,
  onSelect,
}) {
  useThemeRefresh();
  return (
    <div className="h-full min-h-[620px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)]">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url={`https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`}
        />

        <ZoomControl position="bottomright" />

        <MapController selectedLocation={selectedLocation} />

        {locations.map((location) => {
          const severityVar = severityColorVars[location.severity]
            ?.match(/^var\(--color-(.+)\)$/)?.[1] || "warning";
          const color = readThemeColor(severityVar);

          return (
            <CircleMarker
              key={location.id}
              center={[location.lat, location.lng]}
              radius={getRadius(location.cases)}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.55,
                weight: 2,
              }}
              eventHandlers={{
                click: () => onSelect(location),
              }}
            >
              <Popup>
                <div className="min-w-[220px] text-[var(--color-text)]">
                  <h3 className="mb-1 text-base font-bold">
                    {location.city}
                  </h3>

                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {location.state}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-[var(--color-text-secondary)]">Cases</p>
                      <p className="font-semibold">
                        {location.cases}
                      </p>
                    </div>

                    <div>
                      <p className="text-[var(--color-text-secondary)]">Entities</p>
                      <p className="font-semibold">
                        {location.entities}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[var(--color-text-secondary)]">Severity</p>
                    <p
                      className="font-semibold"
                      style={{ color }}
                    >
                      {location.severity}
                    </p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
