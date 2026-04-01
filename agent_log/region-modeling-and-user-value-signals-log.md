# region-modeling-and-user-value-signals — agent log

## Work summary

### lib/types.ts — enhanced Region interface
- Replaced `driveToStates: string[]` with `driveToTags: string[]` (tag-based drive-to derivation)
- Added `fullPassTriggers: string[]` (base-excluded resort IDs that justify upgrade per region)
- Added `nearestDriveHours: number | null` (traffic-realistic drive estimate to nearest Ikon resort)
- Added `framing: string` (plain-language Base vs Full decision context per region)
- Added `RegionValueSignals` interface: `driveToCount`, `hasDriveOptions`, `fullPassTriggerResorts`, `framing`

### app/data/regions.ts — new file
- 7 regions: nyc (default), boston, chicago, denver, la, seattle, bay-area
- Each region has: driveToTags, destinationResortIds, fullPassTriggers, nearestDriveHours, framing
- Exports: `regions[]`, `regionById` Map, `defaultRegion` (nyc)
- Documented assumptions in file header (drive-to tag rationale, fullPassTriggers rationale)

### lib/regionUtils.ts — new file
- `getDriveToResorts(region, resorts)` — tag-matched drive-to list, alpha-sorted
- `getDestinationResorts(region, resortMap)` — key destination resorts, preserves region order
- `getFullPassTriggerResorts(region, resortMap)` — upgrade-trigger resorts, preserves region order
- `getRegionValueSignals(region, resorts, resortMap)` — RegionValueSignals summary
- `getResortAccessMode(resort, region)` — classifies resort as "drive-to" | "destination" | "other"
- `sortResortsByRegionRelevance(resorts, region)` — drive-to first, then destination, then other

### lib/validate.ts — updated
- Added `validateRegions(regions, resortMap)`: checks duplicate IDs, required fields, and that all resort IDs in destinationResortIds / fullPassTriggers exist in the dataset
- Updated `validateAll(resorts, schedules, regions)` to include region validation

## Audit (codex exec review --uncommitted)
Run: yes. No actionable bugs found. Stale `validateAll` signature references in prior log strings and features.json descriptive text are historical records; no code calls the old 2-arg signature.

## Build / TypeScript
- `tsc --noEmit`: clean (0 errors)
- `next build`: clean (static export, 4 pages)
