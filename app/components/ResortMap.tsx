"use client";

import { useEffect, useState } from "react";
import type { Resort, Region } from "@/lib/types";
import { getResortAccessMode } from "@/lib/regionUtils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
  resorts: Resort[];
  region: Region;
  wantedResortIds: Set<string>;
  onToggleWant: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Marker color by access category
// ---------------------------------------------------------------------------

function markerColor(resort: Resort, isWanted: boolean): string {
  if (isWanted) return "#2563eb"; // blue-600 — selected
  if (resort.base.type === "excluded" && resort.full.type === "bonus") return "#9333ea"; // purple — bonus
  if (resort.base.type === "excluded") return "#dc2626"; // red — full-only
  if (resort.base.hasBlackouts) return "#d97706"; // amber — blackout-sensitive
  return "#16a34a"; // green — base-included
}

function markerLabel(resort: Resort): string {
  if (resort.base.type === "excluded" && resort.full.type === "bonus") return "Bonus (Full only)";
  if (resort.base.type === "excluded") return "Full pass only";
  if (resort.base.hasBlackouts) return "Base w/ blackouts";
  return "Base included";
}

// ---------------------------------------------------------------------------
// Component (lazy-loaded to avoid SSR issues with Leaflet)
// ---------------------------------------------------------------------------

export function ResortMap({ resorts, region, wantedResortIds, onToggleWant }: Props) {
  const [MapComponents, setMapComponents] = useState<{
    MapContainer: typeof import("react-leaflet")["MapContainer"];
    TileLayer: typeof import("react-leaflet")["TileLayer"];
    CircleMarker: typeof import("react-leaflet")["CircleMarker"];
    Popup: typeof import("react-leaflet")["Popup"];
  } | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR window reference
    Promise.all([
      import("react-leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]).then(([rl]) => {
      setMapComponents({
        MapContainer: rl.MapContainer,
        TileLayer: rl.TileLayer,
        CircleMarker: rl.CircleMarker,
        Popup: rl.Popup,
      });
    });
  }, []);

  if (!MapComponents) {
    return (
      <div className="w-full h-[400px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-sm text-zinc-400">
        Loading map…
      </div>
    );
  }

  const { MapContainer, TileLayer, CircleMarker, Popup } = MapComponents;

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
      <MapContainer
        center={[42.0, -100.0]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {resorts.map((resort) => {
          const isWanted = wantedResortIds.has(resort.id);
          const color = markerColor(resort, isWanted);
          const accessMode = getResortAccessMode(resort, region);

          return (
            <CircleMarker
              key={resort.id}
              center={[resort.lat, resort.lng]}
              radius={isWanted ? 8 : 6}
              pathOptions={{
                fillColor: color,
                color: isWanted ? "#1d4ed8" : "#fff",
                weight: isWanted ? 2.5 : 1.5,
                opacity: 1,
                fillOpacity: 0.85,
              }}
            >
              <Popup>
                <div className="text-sm min-w-[180px]">
                  <div className="font-semibold text-zinc-900">{resort.name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {resort.state}, {resort.country}
                    {accessMode !== "other" && (
                      <span className="ml-1.5 font-medium">
                        ({accessMode === "drive-to" ? "Drive-to" : "Fly-to"})
                      </span>
                    )}
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <div>
                      <span className="font-medium">Base:</span>{" "}
                      {resort.base.type === "excluded"
                        ? "Not included"
                        : resort.base.type === "unlimited"
                        ? "Unlimited"
                        : `${resort.base.days} days`}
                      {resort.base.hasBlackouts && resort.base.type !== "excluded" && (
                        <span className="text-amber-600 ml-1">blackouts</span>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Full:</span>{" "}
                      {resort.full.type === "unlimited"
                        ? "Unlimited"
                        : resort.full.type === "bonus"
                        ? "2 days (bonus)"
                        : `${resort.full.days} days`}
                    </div>
                  </div>
                  <div className="mt-1.5 text-[10px] font-medium" style={{ color }}>
                    {markerLabel(resort)}
                  </div>
                  <button
                    onClick={() => onToggleWant(resort.id)}
                    className="mt-2 w-full text-xs font-medium px-2 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                  >
                    {isWanted ? "Remove from list" : "Add to my list"}
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
