"use client";

import { useState, useMemo } from "react";
import type { Resort, Region } from "@/lib/types";
import type { DetailedRecommendation } from "@/lib/recommend";
import { getRecommendation } from "@/lib/recommend";
import { sortResortsByRegionRelevance, getResortAccessMode } from "@/lib/regionUtils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
  resorts: Resort[];
  regions: Region[];
  defaultRegionId: string;
}

type AccessFilter = "all" | "drive-to" | "destination" | "excluded";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function accessLabel(resort: Resort, tier: "base" | "full"): string {
  const access = resort[tier];
  if (access.type === "excluded") return "Not included";
  if (access.type === "unlimited") return "Unlimited";
  if (access.type === "bonus") return "2 days";
  return `${access.days} days`;
}

function accessBadgeClass(resort: Resort, tier: "base" | "full"): string {
  const access = resort[tier];
  if (access.type === "excluded") return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
  if (access.type === "unlimited") return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";
  if (access.type === "bonus") return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300";
  // limited-days
  const days = access.days ?? 0;
  if (days >= 7) return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
  return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
}

function confidenceLabel(conf: DetailedRecommendation["confidence"]): string {
  if (conf === "high") return "High confidence";
  if (conf === "medium") return "Medium confidence";
  return "Borderline";
}

function weightLabel(w: "strong" | "moderate" | "weak"): string {
  if (w === "strong") return "Strong";
  if (w === "moderate") return "Moderate";
  return "Weak";
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function RecommendationCard({ rec, regionLabel }: { rec: DetailedRecommendation; regionLabel: string }) {
  const isBase = rec.recommended === "base";

  return (
    <div
      className={`rounded-xl border p-6 ${
        isBase
          ? "bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800"
          : "bg-orange-50 border-orange-200 dark:bg-orange-950/50 dark:border-orange-800"
      }`}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{regionLabel}</p>
          <h2
            className={`text-2xl font-bold ${
              isBase ? "text-blue-900 dark:text-blue-100" : "text-orange-900 dark:text-orange-100"
            }`}
          >
            {isBase ? "Ikon Base Pass is probably enough" : "Ikon Pass is worth the upgrade"}
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              isBase
                ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                : "bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200"
            }`}
          >
            {isBase ? "BASE" : "FULL"}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{confidenceLabel(rec.confidence)}</span>
        </div>
      </div>

      <p
        className={`mt-4 text-sm leading-relaxed ${
          isBase ? "text-blue-800 dark:text-blue-200" : "text-orange-800 dark:text-orange-200"
        }`}
      >
        {rec.rationale}
      </p>

      {rec.factors.filter((f) => f.direction === "full").length > 0 && (
        <div className="mt-4 space-y-2">
          {rec.factors
            .filter((f) => f.direction === "full")
            .map((f) => (
              <div key={f.id} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                <span
                  className={`shrink-0 mt-0.5 px-1.5 py-0.5 rounded font-semibold ${
                    f.direction === "full"
                      ? "bg-orange-200 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                      : "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  }`}
                >
                  {weightLabel(f.weight)}
                </span>
                <span>{f.detail}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function ResortRow({
  resort,
  region,
  isWanted,
  onToggleWant,
}: {
  resort: Resort;
  region: Region;
  isWanted: boolean;
  onToggleWant: () => void;
}) {
  const accessMode = getResortAccessMode(resort, region);

  return (
    <tr
      className={`border-b border-zinc-100 dark:border-zinc-800 transition-colors ${
        isWanted ? "bg-zinc-50 dark:bg-zinc-800/50" : "hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
      }`}
    >
      <td className="py-3 pr-3 pl-2">
        <input
          type="checkbox"
          checked={isWanted}
          onChange={onToggleWant}
          className="rounded border-zinc-300 dark:border-zinc-600 accent-blue-600"
          aria-label={`Mark ${resort.name} as wanted`}
        />
      </td>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">{resort.name}</span>
          {accessMode === "drive-to" && (
            <span className="text-[10px] font-semibold uppercase tracking-wide bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded">
              Drive
            </span>
          )}
          {accessMode === "destination" && (
            <span className="text-[10px] font-semibold uppercase tracking-wide bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded">
              Fly-to
            </span>
          )}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {resort.state}, {resort.country}
        </div>
      </td>
      <td className="py-3 pr-4 text-sm">
        <span className={`px-2 py-1 rounded text-xs font-medium ${accessBadgeClass(resort, "base")}`}>
          {accessLabel(resort, "base")}
        </span>
        {resort.base.hasBlackouts && resort.base.type !== "excluded" && (
          <span className="ml-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
            ⚠ Blackouts
          </span>
        )}
      </td>
      <td className="py-3 pr-2 text-sm">
        <span className={`px-2 py-1 rounded text-xs font-medium ${accessBadgeClass(resort, "full")}`}>
          {accessLabel(resort, "full")}
        </span>
        {resort.full.hasBlackouts && (
          <span className="ml-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
            ⚠ Blackouts
          </span>
        )}
      </td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function PassComparison({ resorts, regions, defaultRegionId }: Props) {
  const [regionId, setRegionId] = useState(defaultRegionId);
  const [blackoutSensitive, setBlackoutSensitive] = useState(false);
  const [wantedResortIds, setWantedResortIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [accessFilter, setAccessFilter] = useState<AccessFilter>("all");

  const region = useMemo(() => regions.find((r) => r.id === regionId)!, [regions, regionId]);
  const resortMap = useMemo(() => new Map(resorts.map((r) => [r.id, r])), [resorts]);

  const recommendation = useMemo(
    () =>
      getRecommendation(
        { region, blackoutSensitive, wantedResortIds: Array.from(wantedResortIds) },
        resortMap
      ),
    [region, blackoutSensitive, wantedResortIds, resortMap]
  );

  const sortedResorts = useMemo(
    () => sortResortsByRegionRelevance(resorts, region),
    [resorts, region]
  );

  const filteredResorts = useMemo(() => {
    let list = sortedResorts;

    if (accessFilter === "drive-to") {
      list = list.filter((r) => getResortAccessMode(r, region) === "drive-to");
    } else if (accessFilter === "destination") {
      list = list.filter((r) => getResortAccessMode(r, region) === "destination");
    } else if (accessFilter === "excluded") {
      list = list.filter((r) => r.base.type === "excluded");
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.state.toLowerCase().includes(q)
      );
    }

    return list;
  }, [sortedResorts, accessFilter, searchQuery, region]);

  function toggleWant(resortId: string) {
    setWantedResortIds((prev) => {
      const next = new Set(prev);
      if (next.has(resortId)) {
        next.delete(resortId);
      } else {
        next.add(resortId);
      }
      return next;
    });
  }

  function clearWanted() {
    setWantedResortIds(new Set());
  }

  const wantedCount = wantedResortIds.size;

  return (
    <div className="space-y-6">
      {/* Region + blackout controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="region-select"
            className="block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Your home region
          </label>
          <select
            id="region-select"
            value={regionId}
            onChange={(e) => {
              setRegionId(e.target.value);
              setWantedResortIds(new Set());
            }}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 pb-2">
          <input
            type="checkbox"
            id="blackout-check"
            checked={blackoutSensitive}
            onChange={(e) => setBlackoutSensitive(e.target.checked)}
            className="rounded border-zinc-300 dark:border-zinc-600 accent-blue-600"
          />
          <label
            htmlFor="blackout-check"
            className="text-sm text-zinc-700 dark:text-zinc-300 select-none cursor-pointer"
          >
            I plan to ski holiday weekends
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">
              Dec 27–31, MLK Weekend, Presidents Day
            </span>
          </label>
        </div>
      </div>

      {/* Recommendation */}
      <RecommendationCard rec={recommendation} regionLabel={region.label} />

      {/* Resort browser */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Resort access details
          </h3>
          {wantedCount > 0 && (
            <button
              onClick={clearWanted}
              className="text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 underline"
            >
              Clear {wantedCount} selected
            </button>
          )}
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Check resorts you plan to ski — the recommendation updates automatically.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(["all", "drive-to", "destination", "excluded"] as AccessFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setAccessFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                accessFilter === f
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {f === "all" ? "All resorts" : f === "drive-to" ? "Drive-to" : f === "destination" ? "Fly-to" : "Base excluded"}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="search"
            placeholder="Search by name or state…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xs rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-2 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700">
                <th className="py-2.5 pl-2 pr-3 w-8"></th>
                <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Resort
                </th>
                <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Base Pass
                </th>
                <th className="py-2.5 pr-2 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Ikon Pass
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900">
              {filteredResorts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
                    No resorts match your search.
                  </td>
                </tr>
              ) : (
                filteredResorts.map((resort) => (
                  <ResortRow
                    key={resort.id}
                    resort={resort}
                    region={region}
                    isWanted={wantedResortIds.has(resort.id)}
                    onToggleWant={() => toggleWant(resort.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
          {filteredResorts.length} of {resorts.length} resorts shown.{" "}
          Base-pass blackout windows: Dec 27–31 · MLK Weekend (Jan 17–18) · Presidents Day (Feb 14–15).
        </p>
      </div>

      {/* Pass price context */}
      <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          What you&apos;re deciding between
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Ikon Base Pass</div>
            <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
              <li>• 5 days at most resorts</li>
              <li>• Unlimited at ~8 resorts, no blackouts; ~6 more unlimited with blackout windows</li>
              <li>• 3 blackout windows: Dec 27–31, MLK Weekend, Presidents Day</li>
              <li>• 6 resorts not included (Alta, Aspen, Deer Valley, Jackson Hole, Snowbasin, Sun Valley)</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Ikon Pass</div>
            <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
              <li>• Unlimited at ~18 resorts, no blackouts</li>
              <li>• 7 days at most other resorts, no blackouts</li>
              <li>• 7-day access to Alta, Aspen, Deer Valley, Jackson Hole, Snowbasin, Sun Valley</li>
              <li>• 4 Bonus Mountains (2 days each, holiday blackouts apply)</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3">
          Season: 2025–26. Access details verified against official Ikon sources — see docs/ikon-sources.md.
        </p>
      </div>
    </div>
  );
}
