/**
 * Region-aware utility functions for the Ikon pass comparison app.
 *
 * These helpers derive resort lists and value signals from a Region definition
 * and the canonical resort dataset. They are pure functions with no side
 * effects; call them in server components, API routes, or client logic as needed.
 */

import type { Region, Resort, RegionValueSignals } from "./types";

// ---------------------------------------------------------------------------
// Resort classification for a region
// ---------------------------------------------------------------------------

/**
 * Returns resorts that are drive-to options for the given region.
 * Matching is tag-based: a resort is included if it has at least one tag
 * from region.driveToTags.
 *
 * Results are sorted by resort name for stable display order. Callers that
 * need drive-time ordering should sort by a separate drive-time lookup.
 */
export function getDriveToResorts(region: Region, resorts: Resort[]): Resort[] {
  const tagSet = new Set(region.driveToTags);
  return resorts
    .filter((r) => r.tags.some((t) => tagSet.has(t)))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Returns resorts that are called out as key destination (typically fly-to)
 * picks for the given region. Preserves the order defined in
 * region.destinationResortIds (which is intentional — more relevant first).
 *
 * Silently skips IDs not found in the resort dataset; call validateRegions()
 * to catch dangling references at build time.
 */
export function getDestinationResorts(
  region: Region,
  resortMap: Map<string, Resort>
): Resort[] {
  return region.destinationResortIds.flatMap((id) => {
    const r = resortMap.get(id);
    return r ? [r] : [];
  });
}

/**
 * Returns the full-pass trigger resorts for the given region — the base-excluded
 * or materially-better-on-full resorts most likely to justify an upgrade.
 * Preserves region.fullPassTriggers order.
 */
export function getFullPassTriggerResorts(
  region: Region,
  resortMap: Map<string, Resort>
): Resort[] {
  return region.fullPassTriggers.flatMap((id) => {
    const r = resortMap.get(id);
    return r ? [r] : [];
  });
}

// ---------------------------------------------------------------------------
// Region value signals
// ---------------------------------------------------------------------------

/**
 * Derives a RegionValueSignals summary for use in recommendation logic and UI.
 *
 * @param region   - The region definition.
 * @param resorts  - Full resort list (array form for tag-based drive-to lookup).
 * @param resortMap - Resort lookup map for O(1) ID-based access.
 */
export function getRegionValueSignals(
  region: Region,
  resorts: Resort[],
  resortMap: Map<string, Resort>
): RegionValueSignals {
  const driveTo = getDriveToResorts(region, resorts);
  const triggers = getFullPassTriggerResorts(region, resortMap);

  return {
    driveToCount: driveTo.length,
    hasDriveOptions: driveTo.length > 0,
    fullPassTriggerResorts: triggers,
    framing: region.framing,
  };
}

// ---------------------------------------------------------------------------
// Sorting helpers
// ---------------------------------------------------------------------------

type AccessMode = "drive-to" | "destination" | "other";

/**
 * Classifies a resort relative to a region, for sort-order or badge display.
 *
 * - "drive-to"    : resort has a drive-to tag for this region
 * - "destination" : resort is in region.destinationResortIds
 * - "other"       : not specifically called out for this region
 */
export function getResortAccessMode(
  resort: Resort,
  region: Region
): AccessMode {
  const tagSet = new Set(region.driveToTags);
  if (resort.tags.some((t) => tagSet.has(t))) return "drive-to";
  if (region.destinationResortIds.includes(resort.id)) return "destination";
  return "other";
}

/**
 * Sorts a resort list so that drive-to resorts appear first, then destination
 * resorts, then the rest — all sub-sorted alphabetically by name.
 */
export function sortResortsByRegionRelevance(
  resorts: Resort[],
  region: Region
): Resort[] {
  const modeOrder: Record<AccessMode, number> = {
    "drive-to": 0,
    destination: 1,
    other: 2,
  };

  return [...resorts].sort((a, b) => {
    const modeDiff =
      modeOrder[getResortAccessMode(a, region)] -
      modeOrder[getResortAccessMode(b, region)];
    if (modeDiff !== 0) return modeDiff;
    return a.name.localeCompare(b.name);
  });
}
