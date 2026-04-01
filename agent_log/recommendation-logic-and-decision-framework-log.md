# Agent Log: recommendation-logic-and-decision-framework

## Plan

Implement opinionated recommendation logic that tells users when Ikon Base is enough
and when Ikon Pass is worth paying more for.

Deliverable: `lib/recommend.ts` — pure functions, no UI coupling.

---

## Work log

### 2026-03-31 — lib/recommend.ts created

Created `lib/recommend.ts` with:

- `RecommendationInputs` interface: `{ region, blackoutSensitive, wantedResortIds }`
- `RecommendationFactor` interface: auditable per-factor record with `id`, `label`, `direction`, `weight`, `detail`
- `DetailedRecommendation` (extends `PassRecommendation`): adds `factors` and `confidence`
- `getRecommendation(inputs, resortMap)` — main entry point; pure function
- `getDefaultRecommendation(region, resortMap)` — initial state with no user preferences

**Scoring model:**
- Strong factor = 10 pts, Moderate = 3, Weak = 1
- FULL_THRESHOLD = 9 (one strong signal is decisive; two moderate signals together flip)
- Default = Base (bias per task notes)

**Three full-pass signals implemented:**
1. Excluded resort in wanted list → strong → full (Alta, Aspen, Deer Valley, Jackson, Snowbasin, Sun Valley)
2. Blackout-sensitive + wanted resort has base blackouts → moderate → full
3. Region full-pass trigger in wanted list (non-excluded) → moderate → full

**Region-only mode** (no wantedResortIds): always returns Base; surfaces the region framing
as rationale and optionally notes blackout sensitivity as a weak signal.

**Rationale generation:** surfaces full-factor details in strength order. Base case uses region framing directly.

**Key resorts:** derived from wanted resorts that are excluded or region triggers — not the full wanted list.
