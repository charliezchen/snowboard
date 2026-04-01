/**
 * Recommendation engine for Ikon Base vs Ikon Pass.
 *
 * Core bias: recommend Base unless the user's specific usage pattern clearly
 * benefits from Full. Full pass is worth it primarily when:
 *   1. The user wants to ski a Base-excluded resort (Alta, Aspen, Deer Valley,
 *      Jackson Hole, Snowbasin, Sun Valley).
 *   2. The user is blackout-sensitive AND plans to ski resorts subject to Base
 *      blackout windows.
 *   3. The user's region-specific full-pass triggers appear in their wanted resorts.
 *
 * The engine runs as pure functions with no side effects. Inputs are typed
 * so future tuning happens in this file, not in UI components.
 */

import type { PassTier, Resort, Region, PassRecommendation } from "./types";

// ---------------------------------------------------------------------------
// Input / output types
// ---------------------------------------------------------------------------

export interface RecommendationInputs {
  region: Region;
  /**
   * True if the user plans to ski during Base-pass blackout windows:
   * Dec 27–31, Jan 17–18 (MLK), Feb 14–15 (Presidents Day).
   */
  blackoutSensitive: boolean;
  /**
   * Resort IDs the user definitely wants to ski this season.
   * Empty array = region-only mode (no specific resort preferences given).
   */
  wantedResortIds: string[];
}

/**
 * A single, auditable factor that contributed to the recommendation.
 * The direction field shows whether this factor pushed toward Base or Full.
 * Factors are accumulated and scored before a final verdict is issued.
 */
export interface RecommendationFactor {
  id: string;
  label: string;
  direction: "base" | "full";
  weight: "strong" | "moderate" | "weak";
  /** Plain-language explanation surfaced directly in the UI. */
  detail: string;
}

/**
 * Extended recommendation that carries the full factor list for transparent
 * display. The base PassRecommendation fields satisfy the legacy interface.
 */
export interface DetailedRecommendation extends PassRecommendation {
  factors: RecommendationFactor[];
  /**
   * Confidence in the result.
   * - high   : a single strong factor determined the outcome
   * - medium : multiple moderate factors agree
   * - low    : weak signals only; borderline call
   */
  confidence: "high" | "medium" | "low";
}

// ---------------------------------------------------------------------------
// Scoring constants
// ---------------------------------------------------------------------------

/**
 * Numeric weights for each factor strength.
 * One "strong" factor (10) alone exceeds the threshold.
 * Two "moderate" factors (6) together exceed the threshold.
 * "Weak" factors alone never flip the recommendation.
 */
const WEIGHT: Record<RecommendationFactor["weight"], number> = {
  strong: 10,
  moderate: 3,
  weak: 1,
};

/**
 * Total "full" score needed to flip the recommendation from Base to Full.
 * Calibrated so a single excluded-resort hit is decisive, while borderline
 * cases (blackout sensitivity alone, no specific resorts named) default Base.
 */
const FULL_THRESHOLD = 5;

// ---------------------------------------------------------------------------
// Factor builders — one per distinct recommendation signal
// ---------------------------------------------------------------------------

function excludedResortFactor(excluded: Resort[]): RecommendationFactor {
  const names = excluded.map((r) => r.name).join(", ");
  return {
    id: "excluded-resort",
    label: "Base-excluded resort on your list",
    direction: "full",
    weight: "strong",
    detail:
      `${names} ${excluded.length === 1 ? "is" : "are"} not accessible on Ikon Base Pass. ` +
      "Full pass is required to ski there.",
  };
}

function blackoutConflictFactor(affected: Resort[]): RecommendationFactor {
  const names = affected.map((r) => r.name).join(", ");
  return {
    id: "blackout-conflict",
    label: "Holiday blackout dates conflict with your plans",
    direction: "full",
    weight: "moderate",
    detail:
      `You plan to ski ${names} on holiday weekends. ` +
      "Ikon Base has blackout windows Dec 27–31, MLK weekend, and Presidents Day weekend. " +
      "Full pass removes those restrictions.",
  };
}

function regionTriggerFactor(triggers: Resort[]): RecommendationFactor {
  const names = triggers.map((r) => r.name).join(", ");
  return {
    id: "region-trigger",
    label: "Key full-pass resort for your region",
    direction: "full",
    weight: "moderate",
    detail:
      `${names} ${triggers.length === 1 ? "is" : "are"} the primary reason skiers from ` +
      "your region typically upgrade to full pass.",
  };
}

function blackoutSensitivityGeneralFactor(): RecommendationFactor {
  return {
    id: "blackout-sensitivity-general",
    label: "You want to ski on peak holiday dates",
    direction: "full",
    weight: "weak",
    detail:
      "Most Ikon Base resorts block the Dec 27–31, MLK, and Presidents Day windows. " +
      "If you haven't picked specific resorts yet, note that full pass eliminates this uncertainty.",
  };
}

function baseSufficientFactor(region: Region): RecommendationFactor {
  return {
    id: "base-sufficient",
    label: "Base pass covers this region's core skiing",
    direction: "base",
    weight: "strong",
    detail: region.framing,
  };
}

// ---------------------------------------------------------------------------
// Core recommendation function
// ---------------------------------------------------------------------------

/**
 * Returns a DetailedRecommendation for the given inputs.
 *
 * @param inputs     - Region, blackout sensitivity, and optional wanted resorts.
 * @param resortMap  - Map of resort id → Resort for O(1) lookup.
 */
export function getRecommendation(
  inputs: RecommendationInputs,
  resortMap: Map<string, Resort>
): DetailedRecommendation {
  const { region, blackoutSensitive, wantedResortIds } = inputs;
  const factors: RecommendationFactor[] = [];

  // Resolve wanted resort IDs → Resort objects (unknown IDs silently dropped).
  const wantedResorts = wantedResortIds.flatMap((id) => {
    const r = resortMap.get(id);
    return r ? [r] : [];
  });

  // -------------------------------------------------------------------------
  // Signal 1: Base-excluded resorts
  // -------------------------------------------------------------------------
  const excludedWanted = wantedResorts.filter((r) => r.base.type === "excluded");
  if (excludedWanted.length > 0) {
    factors.push(excludedResortFactor(excludedWanted));
  }

  // -------------------------------------------------------------------------
  // Signal 2: Blackout date conflicts
  // -------------------------------------------------------------------------
  if (blackoutSensitive) {
    if (wantedResorts.length > 0) {
      // Specific resorts named: flag those with base blackouts (excluding already-
      // flagged excluded-tier resorts to avoid double counting).
      const blackoutAffected = wantedResorts.filter(
        (r) => r.base.type !== "excluded" && r.base.hasBlackouts
      );
      if (blackoutAffected.length > 0) {
        factors.push(blackoutConflictFactor(blackoutAffected));
      }
    } else {
      // Region-only mode: add a weak general blackout signal.
      factors.push(blackoutSensitivityGeneralFactor());
    }
  }

  // -------------------------------------------------------------------------
  // Signal 3: Region-specific full-pass triggers
  // Only fires in wanted-resort mode and only for triggers not already captured
  // by the excluded-resort signal (to avoid duplicated rationale).
  // -------------------------------------------------------------------------
  if (wantedResorts.length > 0) {
    const wantedTriggers = wantedResorts.filter(
      (r) =>
        region.fullPassTriggers.includes(r.id) && r.base.type !== "excluded"
    );
    if (wantedTriggers.length > 0) {
      factors.push(regionTriggerFactor(wantedTriggers));
    }
  }

  // -------------------------------------------------------------------------
  // Baseline factor: Base pass adequacy for the region
  // Always present so UI always has at least one explanatory factor.
  // -------------------------------------------------------------------------
  factors.push(baseSufficientFactor(region));

  // -------------------------------------------------------------------------
  // Score and verdict
  // -------------------------------------------------------------------------
  const fullScore = factors
    .filter((f) => f.direction === "full")
    .reduce((sum, f) => sum + WEIGHT[f.weight], 0);

  const recommended: PassTier = fullScore >= FULL_THRESHOLD ? "full" : "base";

  // -------------------------------------------------------------------------
  // Confidence
  // -------------------------------------------------------------------------
  const confidence = deriveConfidence(fullScore, recommended);

  // -------------------------------------------------------------------------
  // Key resorts and rationale
  // -------------------------------------------------------------------------
  const keyResorts = deriveKeyResortNames(wantedResorts, region);
  const rationale = buildRationale(recommended, factors, region);

  return { recommended, rationale, keyResorts, factors, confidence };
}

/**
 * Returns a recommendation driven by region alone, before the user has
 * specified any resort preferences. This is the initial page state.
 * The result will always recommend Base (no resort-specific signals present).
 */
export function getDefaultRecommendation(
  region: Region,
  resortMap: Map<string, Resort>
): DetailedRecommendation {
  return getRecommendation(
    { region, blackoutSensitive: false, wantedResortIds: [] },
    resortMap
  );
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

function deriveConfidence(
  fullScore: number,
  recommended: PassTier
): DetailedRecommendation["confidence"] {
  if (recommended === "full") {
    // Decisive: a strong factor hit (≥ threshold and then some)
    if (fullScore >= FULL_THRESHOLD + WEIGHT.strong) return "high";
    // Threshold met by strong factor alone
    if (fullScore >= FULL_THRESHOLD) return "medium";
  }
  // Base recommendation
  if (fullScore === 0) return "high"; // no full signals at all
  if (fullScore >= WEIGHT.moderate * 2) return "low"; // moderate signals present but not enough
  return "high"; // only weak signals
}

function buildRationale(
  recommended: PassTier,
  factors: RecommendationFactor[],
  region: Region
): string {
  const fullFactors = factors.filter((f) => f.direction === "full");

  if (recommended === "base") {
    if (fullFactors.length === 0) {
      // Pure base case: use the region framing directly.
      return region.framing;
    }
    // Borderline base: acknowledge the full signals but explain why base still wins.
    return (
      region.framing +
      " The factors that could push toward full pass don't yet apply to your planned trips."
    );
  }

  // Full recommended: surface the full-factor details in priority order
  // (strong first, then moderate, then weak).
  const ordered = [
    ...fullFactors.filter((f) => f.weight === "strong"),
    ...fullFactors.filter((f) => f.weight === "moderate"),
    ...fullFactors.filter((f) => f.weight === "weak"),
  ];

  return ordered.map((f) => f.detail).join(" ");
}

function deriveKeyResortNames(wantedResorts: Resort[], region: Region): string[] {
  // Key resorts are those that specifically drove a full-pass signal:
  // excluded-from-base resorts, or region full-pass triggers the user wants.
  const seen = new Set<string>();
  const names: string[] = [];

  for (const r of wantedResorts) {
    if (r.base.type === "excluded" || region.fullPassTriggers.includes(r.id)) {
      if (!seen.has(r.id)) {
        seen.add(r.id);
        names.push(r.name);
      }
    }
  }

  return names;
}
