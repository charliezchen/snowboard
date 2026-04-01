/**
 * Ikon Pass blackout-date schedules, 2025-26 season.
 *
 * Source: ikonpass.com (confirmed independently via palisadestahoe.com,
 * mammothmountain.com, bigskyresort.com) — see docs/ikon-sources.md
 *
 * Key facts:
 *   - Full Ikon Pass: NO blackout dates on standard resorts.
 *     The four "Bonus Mountains" (bonus tier) do have blackouts on full pass.
 *   - Ikon Base Pass: Three blackout windows apply to all resorts
 *     where Resort.base.hasBlackouts === true.
 */

import type { BlackoutSchedule } from "@/lib/types";

export const blackoutSchedules: BlackoutSchedule[] = [
  {
    season: "2025-26",
    passTier: "base",
    windows: [
      {
        start: "2025-12-27",
        end: "2025-12-31",
        label: "Holiday Week 2025",
      },
      {
        start: "2026-01-17",
        end: "2026-01-18",
        label: "MLK Weekend 2026",
      },
      {
        start: "2026-02-14",
        end: "2026-02-15",
        label: "Presidents' Day Weekend 2026",
      },
    ],
  },
  {
    season: "2025-26",
    passTier: "full",
    // Standard resorts: no blackouts. Bonus Mountains carry blackouts.
    windows: [
      {
        start: "2025-12-27",
        end: "2025-12-31",
        label: "Holiday Week 2025 (Bonus Mountains only)",
      },
      {
        start: "2026-01-17",
        end: "2026-01-18",
        label: "MLK Weekend 2026 (Bonus Mountains only)",
      },
      {
        start: "2026-02-14",
        end: "2026-02-15",
        label: "Presidents' Day Weekend 2026 (Bonus Mountains only)",
      },
    ],
  },
];

/** Convenience: get the base-pass blackout windows for the current season. */
export function getBasePassBlackouts(season = "2025-26"): BlackoutSchedule["windows"] {
  const schedule = blackoutSchedules.find(
    (s) => s.season === season && s.passTier === "base"
  );
  return schedule?.windows ?? [];
}
