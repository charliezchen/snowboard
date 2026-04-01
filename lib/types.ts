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
  /**
   * Resort tags (from Resort.tags) that identify drive-to resorts for this region.
   * Matched against the resort dataset at runtime to build the drive-to list.
   */
  driveToTags: string[];
  /**
   * Explicit resort IDs worth calling out as key destination (typically fly-to) picks.
   * Subset of the full resort list; intended for recommendation framing, not an exhaustive index.
   */
  destinationResortIds: string[];
  /**
   * Resort IDs (typically base-excluded full-pass-only resorts) that are the primary
   * reasons a user in this region would upgrade from Base to Full.
   */
  fullPassTriggers: string[];
  /**
   * Approximate drive time in hours to the nearest decent Ikon resort for this region.
   * Null if there are no practical drive-to options.
   */
  nearestDriveHours: number | null;
  /**
   * Plain-language framing (1–2 sentences) of the Base vs Full decision for this region.
   * Used as default copy in recommendation UI.
   */
  framing: string;
}

/**
 * Pre-computed value signals for a region, derived from region + resort data.
 * Consumed by recommendation logic and UI display.
 */
export interface RegionValueSignals {
  /** Number of drive-to Ikon resorts for this region. */
  driveToCount: number;
  /** Whether the region has any practical drive-to options. */
  hasDriveOptions: boolean;
  /** Full-pass-only resorts most likely to justify an upgrade for this region. */
  fullPassTriggerResorts: Resort[];
  /** Plain-language framing from the region definition. */
  framing: string;
}

export interface PassRecommendation {
  recommended: PassTier;
  rationale: string;
  /** Specific resorts driving the recommendation when full pass is suggested. */
  keyResorts: string[];
}
