# Ikon Pass Data Sources

Season: **2025-26**

This document records the official sources used to build `app/data/resorts.ts` and `app/data/blackoutDates.ts`. When the data needs to be refreshed for a new season, start here.

---

## Primary Sources

### ikonpass.com — Compare Passes
**URL:** https://www.ikonpass.com/en/compare-passes
**Used for:** Full vs Base pass structure, resort tiers, access types
**Notes:** JavaScript-rendered SPA; requires a real browser to see the full resort comparison table.

### ikonpass.com — Ikon Base Pass
**URL:** https://www.ikonpass.com/en/shop-passes/ikon-base-pass
**Used for:** Base pass resort list, pricing, blackout date confirmation

### ikonpass.com — Destinations
**URL:** https://www.ikonpass.com/en/destinations
**Used for:** Full resort list per pass tier

---

## Corroborating Sources

### Palisades Tahoe — Ikon Pass page
**URL:** https://www.palisadestahoe.com/plan-your-visit/lift-tickets-season-pass/ikon-pass
**Used for:** Confirmed 2025-26 base pass blackout dates:
- Dec 27–31, 2025
- Jan 17–18, 2026
- Feb 14–15, 2026

### Mammoth Mountain — Ikon Pass page
**URL:** https://www.mammothmountain.com/plan-your-trip/season-passes/ikon-pass
**Used for:** Confirmed same blackout dates for base pass at Mammoth

### Big Sky Resort — Ikon Pass page
**URL:** https://www.bigskyresort.com/ikon-pass
**Used for:** Confirmed Big Sky access tiers — full: 7 days no blackouts, base: 5 days with blackouts; same blackout dates. Also confirmed Lone Peak Tram not included on any Ikon tier.

### PeakRankings — 2025-26 Ikon Pass announcement
**URL:** https://www.peakrankings.com/content/ikon-pass-debuts-for-2025-26-with-a-basin-unlimited-on-full-pass-base-plus-pass-discontinued
**Used for:** Season change notes — A-Basin upgraded to unlimited on full, Base Plus discontinued, Bonus Mountains added

### StormSkiing — 2025-26 Ikon Pass analysis
**URL:** https://www.stormskiing.com/p/ikon-pass-2025-26-ischgl-joins-jiminy
**Used for:**
- Confirmed A-Basin: 5 days NO blackouts on base pass (not unlimited)
- Confirmed 4 Bonus Mountains (Jiminy Peak, Cranmore, Wild Mountain, Buck Hill): 2 days, full pass only, with blackouts
- Confirmed Windham Mountain NY departed Ikon program after 2024-25
- Confirmed Ischgl added as new full partner for 2025-26

---

## Access Structure Summary (2025-26)

### Ikon Base Pass blackout dates (all resorts where `base.hasBlackouts === true`)
| Window | Dates |
|---|---|
| Holiday Week | Dec 27–31, 2025 |
| MLK Weekend | Jan 17–18, 2026 |
| Presidents' Day Weekend | Feb 14–15, 2026 |

### Base pass access tiers
| Type | Count | Notes |
|---|---|---|
| Unlimited, no blackouts | 8 | Core/non-premium resorts |
| Unlimited, WITH blackouts | 6 | Mammoth, Palisades Tahoe, June Mountain, Solitude, Stratton, Sugarbush |
| 5 days, no blackouts | 1 | Arapahoe Basin only |
| 5 days, WITH blackouts | ~34 | Majority of limited-day resorts |
| Excluded | 6 | Alta, Aspen/Snowmass, Deer Valley, Jackson Hole, Snowbasin, Sun Valley |
| Not on base (Bonus) | 4 | Buck Hill, Cranmore, Jiminy Peak, Wild Mountain |

### Full pass access tiers
| Type | Count | Notes |
|---|---|---|
| Unlimited, no blackouts | 18 | All 18 are available on base (different terms) |
| 7 days, no blackouts | ~40 | Includes the 6 base-excluded resorts |
| 2 days, with blackouts (Bonus) | 4 | Not on base pass at all |

---

## When to Update

Ikon typically announces the next season's pass in early spring (February–March). Key things that change season-to-season:
1. Blackout dates (usually same windows, confirm dates shift year to year)
2. Resort additions and departures
3. Day allocations for limited-access resorts
4. Pass tiers (e.g., Base Plus was discontinued for 2025-26)

Check ikonpass.com/en/compare-passes and the annual PeakRankings/StormSkiing coverage for a reliable summary of changes.
