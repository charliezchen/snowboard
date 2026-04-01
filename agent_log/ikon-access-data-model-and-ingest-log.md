# Agent Log: ikon-access-data-model-and-ingest

## Session: 2026-03-31

### Data Fetch
- Fetched official Ikon Pass blackout dates from palisadestahoe.com, mammothmountain.com, bigskyresort.com
  Result: Confirmed 2025-26 base pass blackout dates: Dec 27–31, 2025 | Jan 17–18, 2026 | Feb 14–15, 2026
- Fetched season structure changes from peakrankings.com and stormskiing.com
  Result: A-Basin → unlimited on full / 5-day no-blackout on base; Base Plus discontinued; Windham exited; Ischgl added; 4 Bonus Mountains added
- Cross-referenced base-excluded resorts: Alta, Aspen/Snowmass, Deer Valley, Jackson Hole, Snowbasin, Sun Valley

### Files Created
- `lib/types.ts` — updated with ResortAccess, BlackoutWindow, BlackoutSchedule, removed obsolete baseDays/hasBlackouts top-level fields
- `app/data/resorts.ts` — 62 resorts covering full 2025-26 dataset; inline helpers for base/full access patterns
- `app/data/blackoutDates.ts` — BlackoutSchedule for base and full pass; getBasePassBlackouts() helper
- `lib/validate.ts` — validateResorts(), validateBlackoutSchedules(), validateAll()
- `docs/ikon-sources.md` — source traceability document

### Audit Notes
- Build ran cleanly (npm run build passes)
- No dead imports; all type references are local
- Validation function covers: duplicate IDs, access type consistency, days/null invariants, ISO date format, chronological order of blackout windows

### Override Decisions
None — no audit complaints required override.
