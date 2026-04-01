// Core types for the Ikon pass comparison app.
// Season: 2025-26
// Source: ikonpass.com, resort-specific Ikon pages — see docs/ikon-sources.md

export type PassTier = "base" | "full";

/**
 * How a resort is accessible under a given pass tier:
 * - unlimited:     ski any day, as many days as you want
 * - limited-days:  fixed day allocation per season
 * - excluded:      not accessible on this pass tier
 * - bonus:         2-day special tier (full pass only), subject to blackout dates
 */
export type AccessType = "unlimited" | "limited-days" | "excluded" | "bonus";

export interface ResortAccess {
  type: AccessType;
  /** Days per season; null when type === "unlimited". */
  days: number | null;
  /** Whether the base-pass blackout windows block this resort under this tier. */
  hasBlackouts: boolean;
}

export interface Resort {
  id: string;
  name: string;
  /** US state abbrev (CO, VT…), Canadian province (QC, BC…), or country code for international. */
  state: string;
  /** ISO 3166-1 alpha-2 country code */
  country: string;
  base: ResortAccess;
  full: ResortAccess;
  /** Region tags for drive-to / destination classification. */
  tags: string[];
  notes?: string;
}

export interface BlackoutWindow {
  /** Inclusive start date, YYYY-MM-DD */
  start: string;
  /** Inclusive end date, YYYY-MM-DD */
  end: string;
  label: string;
}

/**
 * Blackout schedule for a pass tier for a given season.
 * For 2025-26: only the base pass has meaningful blackout windows.
 * The windows apply to ALL base-pass resorts that have hasBlackouts === true.
 */
export interface BlackoutSchedule {
  season: string;
  passTier: PassTier;
  windows: BlackoutWindow[];
}

export type RegionId =
  | "nyc"
  | "boston"
  | "chicago"
  | "denver"
  | "la"
  | "seattle"
  | "bay-area";

export interface Region {
  id: RegionId;
  label: string;
  driveToStates: string[];
  destinationResortIds: string[];
}

export interface PassRecommendation {
  recommended: PassTier;
  rationale: string;
  /** Specific resorts driving the recommendation when full pass is suggested. */
  keyResorts: string[];
}
