/**
 * Canonical Ikon Pass resort dataset, 2025-26 season.
 *
 * Sources: ikonpass.com/en/compare-passes, resort-specific Ikon pages,
 * peakrankings.com, stormskiing.com — see docs/ikon-sources.md
 *
 * Access structure for 2025-26:
 *
 *   Full Ikon Pass
 *     - unlimited, no blackouts:  18 resorts
 *     - 7 days, no blackouts:     ~40 resorts
 *     - 2 days, WITH blackouts:   4 "Bonus Mountains" (bonus type)
 *
 *   Ikon Base Pass
 *     - unlimited, no blackouts:   8 resorts
 *     - unlimited, WITH blackouts: 6 resorts  (same holiday windows as 5-day group)
 *     - 5 days, no blackouts:      1 resort   (Arapahoe Basin only)
 *     - 5 days, WITH blackouts:    ~34 resorts
 *     - excluded:                  6 resorts  (Alta, Aspen, Deer Valley, Jackson,
 *                                              Snowbasin, Sun Valley)
 *     - not offered:               4 Bonus Mountains
 *
 *   Base-pass blackout dates (all resorts where base.hasBlackouts === true):
 *     Dec 27–31, 2025 | Jan 17–18, 2026 | Feb 14–15, 2026
 *
 * Notable 2025-26 changes vs 2024-25:
 *   - Base Plus Pass discontinued (no mid-tier between Base and Full)
 *   - Arapahoe Basin: upgraded to unlimited on full; 5 days (no blackouts) on base
 *   - Ischgl (Austria): new full partner — 7 days full / 5 days base
 *   - Bonus Mountains added: Jiminy Peak MA, Cranmore NH, Wild Mountain MN, Buck Hill MN
 *   - Windham Mountain NY: departed Ikon program after 2024-25
 */

import type { Resort } from "@/lib/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const UNLIMITED_NO_BLACKOUT = { type: "unlimited" as const, days: null, hasBlackouts: false };
const UNLIMITED_WITH_BLACKOUT = { type: "unlimited" as const, days: null, hasBlackouts: true };
const FULL_7_NO_BLACKOUT = { type: "limited-days" as const, days: 7, hasBlackouts: false };
const FULL_2_BONUS = { type: "bonus" as const, days: 2, hasBlackouts: true };
const BASE_5_NO_BLACKOUT = { type: "limited-days" as const, days: 5, hasBlackouts: false };
const BASE_5_WITH_BLACKOUT = { type: "limited-days" as const, days: 5, hasBlackouts: true };
const EXCLUDED = { type: "excluded" as const, days: null, hasBlackouts: false };

// ---------------------------------------------------------------------------
// Resorts
// ---------------------------------------------------------------------------

export const resorts: Resort[] = [

  // -------------------------------------------------------------------------
  // Full: unlimited, no blackouts | Base: unlimited, NO blackouts
  // -------------------------------------------------------------------------

  {
    id: "big-bear",
    name: "Big Bear Mountain Resort",
    state: "CA",
    country: "US",
    lat: 34.2366,
    lng: -116.8960,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_NO_BLACKOUT,
    tags: ["california", "socal", "drive-to"],
  },
  {
    id: "blue-mountain-on",
    name: "Blue Mountain",
    state: "ON",
    country: "CA",
    lat: 44.5013,
    lng: -80.3161,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_NO_BLACKOUT,
    tags: ["ontario", "toronto-area", "drive-to"],
  },
  {
    id: "copper",
    name: "Copper Mountain Resort",
    state: "CO",
    country: "US",
    lat: 39.5022,
    lng: -106.1497,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_NO_BLACKOUT,
    tags: ["colorado", "rockies", "i70-corridor", "drive-to"],
  },
  {
    id: "eldora",
    name: "Eldora Mountain Resort",
    state: "CO",
    country: "US",
    lat: 39.9372,
    lng: -105.5828,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_NO_BLACKOUT,
    tags: ["colorado", "rockies", "denver-area", "drive-to"],
  },
  {
    id: "snow-valley",
    name: "Snow Valley Mountain Resort",
    state: "CA",
    country: "US",
    lat: 34.2250,
    lng: -117.0350,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_NO_BLACKOUT,
    tags: ["california", "socal", "drive-to"],
  },
  {
    id: "snowshoe",
    name: "Snowshoe Mountain",
    state: "WV",
    country: "US",
    lat: 38.4098,
    lng: -79.9953,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_NO_BLACKOUT,
    tags: ["southeast", "appalachian", "drive-to", "mid-atlantic"],
  },
  {
    id: "tremblant",
    name: "Mont-Tremblant",
    state: "QC",
    country: "CA",
    lat: 46.2097,
    lng: -74.5854,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_NO_BLACKOUT,
    tags: ["quebec", "northeast", "drive-to", "nyc-area"],
    notes: "Drive or fly from NYC (~6 hrs). Largest ski resort in eastern Canada.",
  },
  {
    id: "winter-park",
    name: "Winter Park Resort",
    state: "CO",
    country: "US",
    lat: 39.8841,
    lng: -105.7625,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_NO_BLACKOUT,
    tags: ["colorado", "rockies", "drive-to"],
  },

  // -------------------------------------------------------------------------
  // Full: unlimited, no blackouts | Base: unlimited, WITH blackouts
  // -------------------------------------------------------------------------

  {
    id: "june-mountain",
    name: "June Mountain",
    state: "CA",
    country: "US",
    lat: 37.7675,
    lng: -119.0895,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_WITH_BLACKOUT,
    tags: ["california", "eastern-sierra", "drive-to"],
    notes: "Smaller sister mountain to Mammoth; shared ownership.",
  },
  {
    id: "mammoth",
    name: "Mammoth Mountain",
    state: "CA",
    country: "US",
    lat: 37.6308,
    lng: -119.0326,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_WITH_BLACKOUT,
    tags: ["california", "eastern-sierra", "destination", "la-area"],
    notes: "Key resort for LA/SoCal skiers. Longest season in the contiguous US.",
  },
  {
    id: "palisades-tahoe",
    name: "Palisades Tahoe",
    state: "CA",
    country: "US",
    lat: 39.1968,
    lng: -120.2354,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_WITH_BLACKOUT,
    tags: ["california", "tahoe", "destination", "bay-area", "la-area"],
    notes: "Formerly Squaw Valley. One of the largest resorts in California.",
  },
  {
    id: "solitude",
    name: "Solitude Mountain Resort",
    state: "UT",
    country: "US",
    lat: 40.6199,
    lng: -111.5927,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_WITH_BLACKOUT,
    tags: ["utah", "wasatch", "salt-lake-area", "destination"],
  },
  {
    id: "stratton",
    name: "Stratton Mountain Resort",
    state: "VT",
    country: "US",
    lat: 43.1134,
    lng: -72.9079,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_WITH_BLACKOUT,
    tags: ["vermont", "northeast", "drive-to", "nyc-area", "boston-area"],
    notes: "~4 hrs from NYC. Major draw for NYC and Boston skiers.",
  },
  {
    id: "sugarbush",
    name: "Sugarbush Resort",
    state: "VT",
    country: "US",
    lat: 44.1358,
    lng: -72.9009,
    full: UNLIMITED_NO_BLACKOUT,
    base: UNLIMITED_WITH_BLACKOUT,
    tags: ["vermont", "northeast", "drive-to", "nyc-area", "boston-area"],
    notes: "Two interconnected mountains in the Mad River Valley.",
  },

  // -------------------------------------------------------------------------
  // Full: unlimited, no blackouts | Base: 5 days, NO blackouts
  // -------------------------------------------------------------------------

  {
    id: "arapahoe-basin",
    name: "Arapahoe Basin",
    state: "CO",
    country: "US",
    lat: 39.6426,
    lng: -105.8718,
    full: UNLIMITED_NO_BLACKOUT,
    base: BASE_5_NO_BLACKOUT,
    tags: ["colorado", "rockies", "i70-corridor"],
    notes: "Upgraded to unlimited on full pass for 2025-26. Base gets 5 days, no blackouts.",
  },

  // -------------------------------------------------------------------------
  // Full: unlimited, no blackouts | Base: 5 days, WITH blackouts
  // -------------------------------------------------------------------------

  {
    id: "crystal-mountain",
    name: "Crystal Mountain",
    state: "WA",
    country: "US",
    lat: 46.9282,
    lng: -121.5047,
    full: UNLIMITED_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["pacific-northwest", "washington", "seattle-area"],
  },
  {
    id: "schweitzer",
    name: "Schweitzer Mountain Resort",
    state: "ID",
    country: "US",
    lat: 48.3677,
    lng: -116.6230,
    full: UNLIMITED_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["pacific-northwest", "idaho"],
  },
  {
    id: "steamboat",
    name: "Steamboat Ski Resort",
    state: "CO",
    country: "US",
    lat: 40.4572,
    lng: -106.8045,
    full: UNLIMITED_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["colorado", "rockies", "destination"],
    notes: "Full-pass unlimited, so a meaningful upgrade differentiator over base.",
  },

  // -------------------------------------------------------------------------
  // Full: 7 days, no blackouts | Base: 5 days, WITH blackouts
  // -------------------------------------------------------------------------

  {
    id: "alyeska",
    name: "Alyeska Resort",
    state: "AK",
    country: "US",
    lat: 60.9669,
    lng: -149.0981,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["alaska", "destination"],
  },
  {
    id: "arai-snow",
    name: "Arai Snow Resort",
    state: "Niigata",
    country: "JP",
    lat: 37.0167,
    lng: 138.2167,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["japan", "international"],
  },
  {
    id: "big-sky",
    name: "Big Sky Resort",
    state: "MT",
    country: "US",
    lat: 45.2838,
    lng: -111.4010,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["rockies", "montana", "destination"],
    notes: "Lone Peak Tram NOT included on any Ikon pass tier; must add Autocharge.",
  },
  {
    id: "blue-mountain-pa",
    name: "Blue Mountain",
    state: "PA",
    country: "US",
    lat: 40.8254,
    lng: -75.5160,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["mid-atlantic", "pennsylvania", "drive-to", "nyc-area"],
    notes: "~2 hrs from NYC. Good for beginner/intermediate day trips.",
  },
  {
    id: "boyne-mountain",
    name: "Boyne Mountain",
    state: "MI",
    country: "US",
    lat: 45.1655,
    lng: -84.9355,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["midwest", "michigan"],
  },
  {
    id: "brighton",
    name: "Brighton Resort",
    state: "UT",
    country: "US",
    lat: 40.5980,
    lng: -111.5833,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["utah", "wasatch", "salt-lake-area", "destination"],
  },
  {
    id: "camelback",
    name: "Camelback Resort",
    state: "PA",
    country: "US",
    lat: 41.0481,
    lng: -75.3579,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["mid-atlantic", "pennsylvania", "drive-to", "nyc-area"],
    notes: "~2 hrs from NYC. Popular day-trip destination for NYC skiers.",
  },
  {
    id: "cypress",
    name: "Cypress Mountain",
    state: "BC",
    country: "CA",
    lat: 49.3963,
    lng: -123.2046,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["british-columbia", "vancouver-area", "drive-to"],
  },
  {
    id: "furano",
    name: "Furano Ski Area",
    state: "Hokkaido",
    country: "JP",
    lat: 43.3381,
    lng: 142.3722,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["japan", "international"],
  },
  {
    id: "granite-peak",
    name: "Granite Peak",
    state: "WI",
    country: "US",
    lat: 44.9340,
    lng: -89.6823,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["midwest", "wisconsin", "chicago-area"],
  },
  {
    id: "ischgl",
    name: "Ischgl / Silvretta Arena",
    state: "Tyrol",
    country: "AT",
    lat: 46.9689,
    lng: 10.2887,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["europe", "austria", "international"],
    notes: "New for 2025-26. 239 km of trails, 45 lifts. Also connects to Switzerland.",
  },
  {
    id: "killington",
    name: "Killington-Pico",
    state: "VT",
    country: "US",
    lat: 43.6045,
    lng: -72.8201,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["vermont", "northeast", "drive-to", "nyc-area", "boston-area"],
    notes: "Largest ski resort in the eastern US. ~4.5 hrs from NYC.",
  },
  {
    id: "le-massif",
    name: "Le Massif de Charlevoix",
    state: "QC",
    country: "CA",
    lat: 47.2797,
    lng: -70.6300,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["quebec", "destination"],
    notes: "Greatest vertical drop east of the Rockies in Canada.",
  },
  {
    id: "loon",
    name: "Loon Mountain Resort",
    state: "NH",
    country: "US",
    lat: 44.0369,
    lng: -71.6218,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["new-hampshire", "northeast", "drive-to", "nyc-area", "boston-area"],
    notes: "~5 hrs from NYC, ~2.5 hrs from Boston.",
  },
  {
    id: "lutsen",
    name: "Lutsen Mountains",
    state: "MN",
    country: "US",
    lat: 47.6636,
    lng: -90.7182,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["midwest", "minnesota", "chicago-area"],
  },
  {
    id: "megeve",
    name: "Megève",
    state: "Haute-Savoie",
    country: "FR",
    lat: 45.8567,
    lng: 6.6173,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["europe", "france", "international"],
  },
  {
    id: "mt-bachelor",
    name: "Mt. Bachelor",
    state: "OR",
    country: "US",
    lat: 43.9792,
    lng: -121.6886,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["pacific-northwest", "oregon", "destination"],
  },
  {
    id: "mt-buller",
    name: "Mt. Buller",
    state: "VIC",
    country: "AU",
    lat: -37.1453,
    lng: 146.4397,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["australia", "international"],
  },
  {
    id: "myoko-suginohara",
    name: "Myoko Suginohara",
    state: "Niigata",
    country: "JP",
    lat: 36.8862,
    lng: 138.6725,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["japan", "international"],
  },
  {
    id: "niseko-united",
    name: "Niseko United",
    state: "Hokkaido",
    country: "JP",
    lat: 42.8625,
    lng: 140.6987,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["japan", "international"],
  },
  {
    id: "panorama",
    name: "Panorama Mountain Resort",
    state: "BC",
    country: "CA",
    lat: 50.4605,
    lng: -116.2375,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["british-columbia", "destination"],
  },
  {
    id: "red-mountain",
    name: "Red Mountain Resort",
    state: "BC",
    country: "CA",
    lat: 49.1042,
    lng: -117.8464,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["british-columbia", "pacific-northwest"],
  },
  {
    id: "revelstoke",
    name: "Revelstoke Mountain Resort",
    state: "BC",
    country: "CA",
    lat: 51.0275,
    lng: -118.1648,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["british-columbia", "destination"],
    notes: "Greatest vertical drop in North America.",
  },
  {
    id: "sierra-at-tahoe",
    name: "Sierra-at-Tahoe",
    state: "CA",
    country: "US",
    lat: 38.7996,
    lng: -120.0801,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["california", "tahoe", "destination", "bay-area"],
  },
  {
    id: "st-moritz",
    name: "St. Moritz / Engadin",
    state: "Graubünden",
    country: "CH",
    lat: 46.4908,
    lng: 9.8355,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["europe", "switzerland", "international"],
  },
  {
    id: "sugarloaf",
    name: "Sugarloaf",
    state: "ME",
    country: "US",
    lat: 45.0314,
    lng: -70.3131,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["maine", "northeast", "destination", "boston-area"],
    notes: "Second-highest peak in the eastern US. ~7 hrs from NYC.",
  },
  {
    id: "sun-peaks",
    name: "Sun Peaks Resort",
    state: "BC",
    country: "CA",
    lat: 50.8830,
    lng: -119.9025,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["british-columbia", "destination"],
  },
  {
    id: "sunday-river",
    name: "Sunday River",
    state: "ME",
    country: "US",
    lat: 44.4732,
    lng: -70.8568,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["maine", "northeast", "destination", "boston-area"],
    notes: "~6 hrs from NYC. Very reliable snowmaking.",
  },
  {
    id: "taos",
    name: "Taos Ski Valley",
    state: "NM",
    country: "US",
    lat: 36.5963,
    lng: -105.4545,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["southwest", "new-mexico", "rockies", "destination"],
    notes: "Known for challenging terrain and consistent snow.",
  },
  {
    id: "snoqualmie",
    name: "The Summit at Snoqualmie",
    state: "WA",
    country: "US",
    lat: 47.4204,
    lng: -121.4137,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["pacific-northwest", "washington", "seattle-area", "drive-to"],
  },
  {
    id: "thredbo",
    name: "Thredbo Alpine Village",
    state: "NSW",
    country: "AU",
    lat: -36.5057,
    lng: 148.3078,
    full: FULL_7_NO_BLACKOUT,
    base: BASE_5_WITH_BLACKOUT,
    tags: ["australia", "international"],
  },

  // -------------------------------------------------------------------------
  // Full: 7 days, no blackouts | Base: EXCLUDED
  // These 6 resorts require the full Ikon Pass; Base Plus was discontinued 2025-26.
  // -------------------------------------------------------------------------

  {
    id: "alta",
    name: "Alta Ski Area",
    state: "UT",
    country: "US",
    lat: 40.5884,
    lng: -111.6386,
    full: FULL_7_NO_BLACKOUT,
    base: EXCLUDED,
    tags: ["utah", "wasatch", "destination", "rockies"],
    notes: "Ski-only mountain. Combined with Snowbird for lift access. Full pass only.",
  },
  {
    id: "aspen-snowmass",
    name: "Aspen Snowmass",
    state: "CO",
    country: "US",
    lat: 39.2084,
    lng: -106.9490,
    full: FULL_7_NO_BLACKOUT,
    base: EXCLUDED,
    tags: ["colorado", "rockies", "destination", "luxury"],
    notes:
      "Four mountains: Aspen Mountain, Aspen Highlands, Buttermilk, Snowmass. Full pass only. Biggest reason to upgrade from base.",
  },
  {
    id: "deer-valley",
    name: "Deer Valley Resort",
    state: "UT",
    country: "US",
    lat: 40.6374,
    lng: -111.4783,
    full: FULL_7_NO_BLACKOUT,
    base: EXCLUDED,
    tags: ["utah", "wasatch", "destination", "rockies", "luxury"],
    notes: "Ski-only (no snowboards). Full pass only.",
  },
  {
    id: "jackson-hole",
    name: "Jackson Hole Mountain Resort",
    state: "WY",
    country: "US",
    lat: 43.5877,
    lng: -110.8279,
    full: FULL_7_NO_BLACKOUT,
    base: EXCLUDED,
    tags: ["wyoming", "rockies", "destination", "expert-terrain"],
    notes:
      "Iconic resort with 4,139 ft vertical. Full pass only. Top upgrade reason for advanced skiers.",
  },
  {
    id: "snowbasin",
    name: "Snowbasin Resort",
    state: "UT",
    country: "US",
    lat: 41.2160,
    lng: -111.8569,
    full: FULL_7_NO_BLACKOUT,
    base: EXCLUDED,
    tags: ["utah", "wasatch", "destination"],
    notes: "Full pass only.",
  },
  {
    id: "sun-valley",
    name: "Sun Valley Resort",
    state: "ID",
    country: "US",
    lat: 43.6977,
    lng: -114.3514,
    full: FULL_7_NO_BLACKOUT,
    base: EXCLUDED,
    tags: ["idaho", "rockies", "destination"],
    notes: "Full pass only.",
  },

  // -------------------------------------------------------------------------
  // Full: 2-day BONUS (with blackouts) | Base: NOT available
  // New for 2025-26. These resorts are not on the base pass at all.
  // -------------------------------------------------------------------------

  {
    id: "buck-hill",
    name: "Buck Hill",
    state: "MN",
    country: "US",
    lat: 44.7258,
    lng: -93.2849,
    full: FULL_2_BONUS,
    base: EXCLUDED,
    tags: ["midwest", "minnesota", "chicago-area", "bonus"],
    notes: "Bonus Mountain: 2 days, full pass only, subject to blackout dates.",
  },
  {
    id: "cranmore",
    name: "Cranmore Mountain Resort",
    state: "NH",
    country: "US",
    lat: 44.0594,
    lng: -71.1137,
    full: FULL_2_BONUS,
    base: EXCLUDED,
    tags: ["new-hampshire", "northeast", "bonus"],
    notes: "Bonus Mountain: 2 days, full pass only, subject to blackout dates.",
  },
  {
    id: "jiminy-peak",
    name: "Jiminy Peak Mountain Resort",
    state: "MA",
    country: "US",
    lat: 42.5131,
    lng: -73.2794,
    full: FULL_2_BONUS,
    base: EXCLUDED,
    tags: ["massachusetts", "northeast", "drive-to", "nyc-area", "bonus"],
    notes:
      "Bonus Mountain: 2 days, full pass only, subject to blackout dates. ~2.5 hrs from NYC.",
  },
  {
    id: "wild-mountain",
    name: "Wild Mountain",
    state: "MN",
    country: "US",
    lat: 45.3597,
    lng: -92.7696,
    full: FULL_2_BONUS,
    base: EXCLUDED,
    tags: ["midwest", "minnesota", "bonus"],
    notes: "Bonus Mountain: 2 days, full pass only, subject to blackout dates.",
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/** Map of resort id → Resort for O(1) access. */
export const resortById: Map<string, Resort> = new Map(
  resorts.map((r) => [r.id, r])
);

/** Resorts excluded from the base pass (require full pass). */
export const baseExcludedResorts: Resort[] = resorts.filter(
  (r) => r.base.type === "excluded"
);

/** Resorts on the full pass only (not available on base at all — excluded or bonus). */
export const fullPassOnlyResorts: Resort[] = resorts.filter(
  (r) => r.base.type === "excluded" || r.full.type === "bonus"
);

/** Resorts where base pass has blackout-date restrictions. */
export const baseBlackoutResorts: Resort[] = resorts.filter(
  (r) => r.base.hasBlackouts
);
