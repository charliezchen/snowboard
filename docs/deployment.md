# Deployment

## GitHub

- **Repository**: [charliezchen/snowboard](https://github.com/charliezchen/snowboard)
- **Default branch**: `main`

## Vercel

- **Project**: snowboard
- **Project ID**: `prj_AyuKJsPk0XIAcUiegdCkZyRZONrI`
- **Team ID**: `team_QgnQ2CuTDgZxfKLLBa8fLbFc`
- **Framework**: Next.js 16.2.2 (Turbopack)
- **Node version**: 24.x
- **Production URL**: https://snowboard-mu.vercel.app

### Domains

- `snowboard-mu.vercel.app` (primary)
- `snowboard-zc2157-6814s-projects.vercel.app`

### Build

- Vercel auto-detects Next.js and runs `npm run build` (`next build`).
- No environment variables required.
- No special build settings beyond the defaults.

### Deploying

Push to `main` to trigger a production deployment (if Vercel Git Integration is connected).
Alternatively, use the Vercel CLI: `vercel --prod` from the project root.

## Operational Notes

- The app is entirely client-side rendered with static data — no database, no API keys, no secrets.
- Resort data and recommendation logic live in `app/data/` and `lib/`. Update those files and redeploy to refresh content for a new season.
