// Core types for the Ikon pass comparison app.
// Populated by ikon-access-data-model-and-ingest task.

export type PassTier = "base" | "full";

export type AccessLevel = "full" | "limited" | "excluded";

export interface Resort {
  id: string;
  name: string;
  state: string;
  country: string;
  baseAccess: AccessLevel;
  fullAccess: AccessLevel;
  /** Days per season included for base pass (null = unlimited or excluded) */
  baseDays: number | null;
  hasBlackouts: boolean;
  /** Regional tags for drive-to vs destination classification */
  tags: string[];
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
  /** Specific resorts driving the recommendation (if full pass) */
  keyResorts: string[];
}
