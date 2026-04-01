# Product Brief: Ikon Pass Comparison Tool

## Goal

Help skiers decide between Ikon Base and Ikon Pass without wading through resort tables. The app makes a recommendation and explains it in plain language, using region-aware defaults to make the first load immediately relevant.

## Target User

A skier or snowboarder in the New York metro area planning 5–15 ski days per season. They have heard that Ikon Base is cheaper but are not sure if the blackout dates or resort exclusions will hurt them. They want a direct answer, not a neutral comparison.

## Decision-Support Philosophy

The app is not a spreadsheet. It leads with a recommendation: **Ikon Base is probably right for you** unless one of these conditions applies:

1. You prioritize peak-holiday skiing and cannot tolerate blackout dates.
2. You ski resorts only on the Ikon (full) Pass — e.g., Jackson Hole, Deer Valley, Telluride.
3. Your travel pattern includes 7+ days at full-pass-only or heavily blacked-out resorts.

If none of those apply, Ikon Base saves ~$200–$350 and covers the same mountains for most NYC-area skiers (Hunter, Windham, Killington, Stratton, Sunday River, Sugarloaf, Steamboat, Winter Park, etc.).

## Default Region: New York City

NYC is the default because it is the largest Ikon market in the Northeast and has a clear usage pattern:

- **Drive-to**: Hunter, Windham, Belleayre, Stratton, Okemo, Mount Snow, Killington, Sugarbush
- **Weekend Northeast fly/drive**: Stowe, Sunday River, Sugarloaf, Loon
- **Destination**: Steamboat, Winter Park, Copper, Mammoth, Solitude, Alta (limited on Base)

Most NYC skiers do not regularly visit the full-pass-only western destinations. The recommendation reflects this.

## Supported Regions

| Region | Drive-to Cluster | Key Destination |
|--------|-----------------|----------------|
| NYC | Catskills, Southern VT, NH | Steamboat, Winter Park |
| Boston | NH (Loon, Cannon, Attitash), VT | Sunday River, Sugarloaf |
| Chicago | Devil's Head, no major drive-to | Steamboat, Mammoth |
| Denver/Front Range | Loveland, Arapahoe Basin | Steamboat, Mammoth, Winter Park |
| LA / SoCal | Mountain High, Bear Mountain | Mammoth, Snowbird, Snowbasin |
| Bay Area | Boreal, Sierra-at-Tahoe | Mammoth, Snowbird, Snowbasin |
| Seattle / PNW | Stevens Pass, Crystal Mountain | Mammoth, Sun Valley |

## Key Heuristics for Recommendation Logic

- If user's top 3 resorts are all on Ikon Base → recommend Base
- If any top resort is full-pass-only → recommend Full Pass
- If user skis peak holidays and blackouts are a concern → recommend Full Pass
- Default tie-break: Base (cost savings > marginal access for most users)

## Vercel Deployment

- Framework: Next.js (App Router), TypeScript, Tailwind CSS
- Node: 20.x
- Build command: `npm run build`
- Output: `.next` (automatic via Vercel Next.js preset)
- No environment variables required at launch
