# StudyCrew — website

Promo website for StudyCrew: a Next.js (App Router) landing page deployed on **Cloudflare Workers**.

- **Framework:** Next.js 16 App Router, React 19.
- **Runs on Cloudflare via [vinext](https://github.com/cloudflare/vinext).** Cloudflare's [Next.js guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) recommends vinext, its Vite-based implementation of the Next.js API, as the default way to run Next.js on Workers.
- **No backend.** `next.config.ts` sets `output: 'export'`, so the build pre-renders the page to static HTML. Workers Static Assets serves it. There are no databases, KV stores, caches or server routes.
- **Self-contained.** It doesn't connect to the StudyCrew app, Supabase or any other service. Fonts are bundled, and every app screen is a React/CSS concept mockup.

> **Beta tooling.** vinext (1.x) and Cloudflare's new `cf` CLI (1.0 beta) are both still in beta. Commands and config may change between versions. The exact versions are pinned in `package-lock.json`.

## Requirements

- Node.js **22.18 or later** (see `.nvmrc`)
- npm
- A Cloudflare account (free plan is enough), for deploying

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). The page runs in `workerd`, the same runtime as Cloudflare Workers, with hot reload.

Fallback: `npm run dev:next` runs the stock Next.js dev server on http://localhost:3000.

## Build and preview locally

```bash
npm run build     # static export + Worker build output in .cloudflare/output
npm run preview   # serve the built Worker locally (http://localhost:4173)
```

## Deploy from your computer

```bash
npx cf auth login   # opens the browser once to sign in to Cloudflare
npm run deploy      # builds and deploys the Worker "studycrew-site"
```

If your login can reach more than one Cloudflare account, choose one of these:
- set `CLOUDFLARE_ACCOUNT_ID`, or
- add `accountId: "<id>"` at the top level of `defineConfig` in `cloudflare.config.ts`.

The account ID is in the dashboard URL: `dash.cloudflare.com/<account-id>`.

After the first deploy the site is live at `https://studycrew-site.<your-subdomain>.workers.dev`. To use your own domain, add it to the `studycrew-site` Worker in the Cloudflare dashboard (Domains & Routes).

`npm run deploy:dry-run` checks the setup without building or uploading anything.

## Automatic deployments from GitHub

The workflow in `.github/workflows/deploy.yml` runs on every push and pull request:

| Event | What happens |
| --- | --- |
| Pull request | `npm ci` → build → `cf deploy --prebuilt --dry-run`. Nothing is uploaded and no secrets are needed. |
| Push to `main`, or a manual run on `main` | Same steps, then deploys to production with `vinext-cloudflare deploy --skip-build`. |

One-time setup:

1. **Move the workflow into place (only if it isn't there yet).** If `.github/workflows/deploy.yml` doesn't exist, create the folder and move `setup/github-actions-deploy.yml` into it as `deploy.yml`:
   ```powershell
   mkdir .github\workflows -Force
   move setup\github-actions-deploy.yml .github\workflows\deploy.yml
   ```
   This step only exists because the file couldn't be written into `.github/` directly.
2. **Create a GitHub repository** and push this folder to it. Use `main` as the default branch.
3. **Create an API token.** In Cloudflare, go to [My Profile → API Tokens → Create Token](https://dash.cloudflare.com/profile/api-tokens) and use the **Edit Cloudflare Workers** template.
4. **Add two repository secrets** under GitHub → *Settings → Secrets and variables → Actions*:
   - `CLOUDFLARE_API_TOKEN`: the token from step 3
   - `CLOUDFLARE_ACCOUNT_ID`: your account ID
5. **Push to `main`.** The *Actions* tab shows the run and the deploy output, including the URL.

Always commit `package-lock.json`, because CI installs with `npm ci`.

> This project uses Cloudflare's new `cf` CLI and `cloudflare.config.ts`, which is what `vinext init` generates today. It does not use Wrangler. Cloudflare's dashboard Git integration (Workers Builds) defaults to `npx wrangler deploy`, so the GitHub Actions workflow above is the supported automatic-deploy path for this setup.

## Configuration

`config.js`:

- `BETA_URL`: link to the beta sign-up form or Google Play page. While it is empty, the beta block shows "invitations are sent gradually" instead of a button.
- `CONTACT_EMAIL`: contact address. While it is empty, no email link is shown.

Rebuild and redeploy after changing them. A push to `main` does that automatically.

## Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite dev` | vinext dev server in workerd |
| `build` | `vite build` | static export and Worker build output |
| `preview` | `vite preview` | run the built Worker locally |
| `deploy` | `vinext-cloudflare deploy` | build and deploy to Cloudflare Workers |
| `deploy:dry-run` | `vinext-cloudflare deploy --dry-run` | validate the deploy setup |
| `cf:types` | `cf workers types` | generate Worker types into `.cloudflare/types` |
| `dev:next` / `build:next` | `next dev` / `next build` | plain Next.js, as a fallback |

## Project structure

```
app/layout.tsx             <html>, metadata, fonts, global styles
app/page.tsx               the landing page route (/)
app/globals.css            all styles; design tokens at the top
components/LandingPage.jsx all sections (hero, groups, focus, friends, coins, safety, soon, beta, FAQ)
components/Screens.jsx     app-screen mockups (focus timer, group homework, chat, report, leaderboard…)
components/Demos.jsx       interactive demos (focus timer, streak calendar, avatar/shop studio)
components/Phone.jsx       phone frame, coin and avatar primitives
public/                    logo, white logo mark, favicons
config.js                  beta link and contact email
next.config.ts             output: 'export' (static site)
vite.config.js             vinext + Cloudflare Vite plugin
cloudflare.config.ts       Worker name, compatibility date, static-assets binding
.github/workflows/         GitHub Actions build and deploy
```

All names, @usernames and numbers in the mockups are invented for illustration. The site footer says that the interface images are concepts.

## Upgrading from the earlier Vite-only version

If this folder still contains files from the first version of the site, delete them:
- `index.html` (in the project root)
- `src/`
- `offline/`
- `dist/`

**The old root `index.html` must go.** While it exists, the dev server shows that old page instead of the Next.js app.
