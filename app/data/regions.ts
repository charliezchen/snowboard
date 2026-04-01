/**
 * Region definitions for the Ikon pass comparison app.
 *
 * Each region represents a common skier home base in North America. Regions
 * drive the default framing of the recommendation and prioritize the resort
 * list so that locally relevant resorts appear first.
 *
 * Assumptions and design decisions:
 *
 *   driveToTags  — matched against Resort.tags to derive the drive-to list.
 *                  Tags were chosen to reflect realistic drive-to patterns
 *                  (≤ 6 hours from the metro area), not just geographic proximity.
 *
 *   destinationResortIds — key fly-to Ikon resorts worth calling out for this
 *                  region. Not exhaustive; intended for recommendation framing.
 *
 *   fullPassTriggers — the base-excluded or materially-better-on-full resorts
 *                  that most justify upgrading for each region. For most regions
 *                  this is Aspen Snowmass and/or Jackson Hole; added regional
 *                  specifics (e.g. Palisades Tahoe for Bay Area, Crystal for Seattle)
 *                  where the upgrade delta is meaningful for that home region.
 *
 *   nearestDriveHours — conservative (traffic-realistic) estimate to the nearest
 *                  decent Ikon mountain from the center of the metro area.
 *
 * Season: 2025-26. Review when Ikon adds or removes resorts.
 */

import type { Region } from "@/lib/types";

export const regions: Region[] = [
  // ---------------------------------------------------------------------------
  // NYC — default region
  // ---------------------------------------------------------------------------
  {
    id: "nyc",
    label: "New York City",
    driveToTags: ["nyc-area"],
    destinationResortIds: [
      "steamboat",
      "copper",
      "winter-park",
      "aspen-snowmass",
      "jackson-hole",
      "solitude",
      "brighton",
      "alta",
      "deer-valley",
      "mammoth",
      "palisades-tahoe",
    ],
    fullPassTriggers: ["aspen-snowmass", "jackson-hole", "alta", "deer-valley"],
    nearestDriveHours: 2,
    framing:
      "Most NYC skiers do their bulk skiing at drive-to Vermont and Pennsylvania mountains." +
      " Upgrade to full pass only if you're planning a trip to Aspen, Jackson Hole, Alta, or Deer Valley," +
      " or if peak-holiday blackout dates will hit days you definitely want to ski.",
  },

  // ---------------------------------------------------------------------------
  // Boston
  // ---------------------------------------------------------------------------
  {
    id: "boston",
    label: "Boston",
    driveToTags: ["boston-area", "new-hampshire", "maine"],
    destinationResortIds: [
      "steamboat",
      "copper",
      "winter-park",
      "aspen-snowmass",
      "jackson-hole",
      "solitude",
      "alta",
      "deer-valley",
      "mammoth",
    ],
    fullPassTriggers: ["aspen-snowmass", "jackson-hole", "alta", "deer-valley"],
    nearestDriveHours: 1,
    framing:
      "Boston skiers have excellent drive-to coverage on Base: Loon, Sugarloaf, Sunday River," +
      " Stratton, Sugarbush, and Killington are all reachable and fully covered." +
      " Upgrade to full pass if a western destination trip (Aspen, Jackson Hole, Alta, Deer Valley)" +
      " is on the itinerary, or if blackout windows threaten a key holiday ski day.",
  },

  // ---------------------------------------------------------------------------
  // Chicago
  // ---------------------------------------------------------------------------
  {
    id: "chicago",
    label: "Chicago",
    driveToTags: ["chicago-area", "midwest"],
    destinationResortIds: [
      "steamboat",
      "copper",
      "winter-park",
      "aspen-snowmass",
      "jackson-hole",
      "solitude",
      "brighton",
      "alta",
      "deer-valley",
      "mammoth",
      "palisades-tahoe",
      "alyeska",
    ],
    fullPassTriggers: [
      "aspen-snowmass",
      "jackson-hole",
      "alta",
      "deer-valley",
      "steamboat",
    ],
    nearestDriveHours: 4,
    framing:
      "Chicago skiers have limited drive-to Ikon options (Granite Peak, Boyne Mountain, Lutsen);" +
      " virtually all good skiing requires a flight." +
      " The Base vs Full decision is almost entirely about which western resorts matter to you." +
      " Steamboat is a notable differentiator: unlimited on full vs 5 blackout days on base.",
  },

  // ---------------------------------------------------------------------------
  // Denver / Front Range
  // ---------------------------------------------------------------------------
  {
    id: "denver",
    label: "Denver / Front Range",
    driveToTags: ["denver-area", "i70-corridor", "colorado", "rockies"],
    destinationResortIds: [
      "aspen-snowmass",
      "jackson-hole",
      "alta",
      "deer-valley",
      "snowbasin",
      "sun-valley",
      "steamboat",
    ],
    fullPassTriggers: [
      "aspen-snowmass",
      "jackson-hole",
      "alta",
      "deer-valley",
      "snowbasin",
    ],
    nearestDriveHours: 1.5,
    framing:
      "Denver skiers can drive to Copper, Eldora, Arapahoe Basin, Winter Park, and Steamboat" +
      " on Base — excellent coverage without blackout concerns for most days." +
      " Full pass becomes worthwhile if Aspen Snowmass, Jackson Hole, Alta, Deer Valley," +
      " or Snowbasin are on the season agenda.",
  },

  // ---------------------------------------------------------------------------
  // LA / SoCal
  // ---------------------------------------------------------------------------
  {
    id: "la",
    label: "Los Angeles / SoCal",
    driveToTags: ["socal", "california", "la-area"],
    destinationResortIds: [
      "aspen-snowmass",
      "jackson-hole",
      "alta",
      "deer-valley",
      "snowbasin",
      "sun-valley",
      "steamboat",
      "copper",
      "winter-park",
    ],
    fullPassTriggers: [
      "aspen-snowmass",
      "jackson-hole",
      "alta",
      "deer-valley",
      "mammoth",
    ],
    nearestDriveHours: 2,
    framing:
      "LA skiers can drive to Big Bear and Snow Valley, and stretch to Mammoth (~5 hrs) or" +
      " Palisades Tahoe (~8 hrs) for longer weekends." +
      " Mammoth is the key local differentiator: Base gets unlimited days but with blackout windows," +
      " so if you plan holiday-weekend Mammoth trips, full pass eliminates the friction." +
      " Add Aspen, Jackson, Alta, or Deer Valley trips and full pass clearly wins.",
  },

  // ---------------------------------------------------------------------------
  // Seattle / PNW
  // ---------------------------------------------------------------------------
  {
    id: "seattle",
    label: "Seattle / PNW",
    driveToTags: ["seattle-area", "pacific-northwest", "washington"],
    destinationResortIds: [
      "aspen-snowmass",
      "jackson-hole",
      "alta",
      "deer-valley",
      "snowbasin",
      "sun-valley",
      "mammoth",
      "steamboat",
    ],
    fullPassTriggers: [
      "aspen-snowmass",
      "jackson-hole",
      "alta",
      "deer-valley",
      "crystal-mountain",
    ],
    nearestDriveHours: 1,
    framing:
      "Seattle skiers can drive to Snoqualmie (1 hr) and Crystal Mountain (~1.5 hrs) on Base," +
      " though Crystal is 5-day with blackouts vs unlimited on full." +
      " If Crystal is your go-to home mountain and you ski it frequently over the holidays," +
      " that alone may justify the upgrade — plus you get Mt. Bachelor and Schweitzer unlimited." +
      " Add any major western destination and full pass is the clear call.",
  },

  // ---------------------------------------------------------------------------
  // Bay Area
  // ---------------------------------------------------------------------------
  {
    id: "bay-area",
    label: "San Francisco Bay Area",
    driveToTags: ["bay-area", "tahoe", "california"],
    destinationResortIds: [
      "aspen-snowmass",
      "jackson-hole",
      "alta",
      "deer-valley",
      "snowbasin",
      "steamboat",
      "mammoth",
    ],
    fullPassTriggers: [
      "aspen-snowmass",
      "jackson-hole",
      "alta",
      "deer-valley",
      "palisades-tahoe",
    ],
    nearestDriveHours: 3.5,
    framing:
      "Bay Area skiers can drive to Sierra-at-Tahoe and Palisades Tahoe — the local flagships." +
      " Both are unlimited on both pass tiers, but Base includes blackout windows at Palisades Tahoe;" +
      " if you ski Palisades over the holidays, full pass removes that risk." +
      " For western destination trips (Aspen, Jackson, Alta, Deer Valley), full pass is the only option.",
  },
];

/** Map of region id → Region for O(1) access. */
export const regionById: Map<string, Region> = new Map(
  regions.map((r) => [r.id, r])
);

/** The default region used on first load. */
export const defaultRegion: Region = regionById.get("nyc")!;
