# resort-map-visualization

## Steps

1. **Extended Resort type** — Added `lat: number` and `lng: number` to `Resort` interface in `lib/types.ts`.
2. **Added coordinates** — All 59 resorts in `app/data/resorts.ts` now have WGS 84 lat/lng.
3. **Validation** — Added lat/lng range checks (-90..90, -180..180) to `lib/validate.ts`.
4. **Installed deps** — `leaflet`, `react-leaflet`, `@types/leaflet` added to package.json.
5. **Created ResortMap** — `app/components/ResortMap.tsx`: dynamic-import Leaflet to avoid SSR, CircleMarkers color-coded by access tier, popups with name/state/access/add-to-list button.
6. **Integrated into UI** — Map placed between recommendation card and resort table in `PassComparison.tsx`, reuses `filteredResorts`, `region`, `wantedResortIds`, and `toggleWant` from parent state.
7. **Legend** — Color legend below map: green (base included), amber (base w/ blackouts), red (full only), purple (bonus), blue (selected).

## Audit (codex exec)

- **P1 (fixed):** `orchestrate.sh` hardcoded `resort-map-visualization` instead of `$TASK`. Fixed to use variable.
- **P1 (fixed):** ResortMap filtered out non-US/CA resorts, causing mismatch with table. Removed filter since parent already passes filtered list.
- **P2 (override):** Duplicated access-label logic between ResortMap and PassComparison. Acceptable: map uses simplified color/label for markers (different presentation context) vs table badges. Extracting a shared helper would over-couple two distinct UI modes for minimal benefit.

## Verification

- `tsc --noEmit`: clean
- `next build`: passes, all routes static
