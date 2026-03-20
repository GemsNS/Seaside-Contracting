# Seaside Contracting

Marketing site (Next.js App Router, Tailwind CSS, Framer Motion).

## Brand images (PNG)

The site reads raster files from **`public/brand/`**. When you update files in **`assets/`**, copy them into place:

```bash
npm run assets:sync
```

Then refresh the browser (hard refresh if the old image is cached).

## Setup

```bash
npm install
copy .env.example .env.local
```

(On PowerShell use `copy`; on macOS/Linux use `cp`.)

Add a [Resend](https://resend.com) API key to `.env.local` so `POST /api/contact` can send email. Without `RESEND_API_KEY`, submissions validate but return HTTP 503 with a configuration message.

`.env.local` is gitignored—safe to keep secrets only on your machine.

## Push to GitHub (first time)

Use branch **`main`** (or **`master`**) so the [GitHub Pages workflow](.github/workflows/deploy-github-pages.yml) runs on push.

1. On [github.com/new](https://github.com/new), create a **new empty repository** (no README, no `.gitignore`, no license—avoids merge noise). Copy the repo URL, e.g. `https://github.com/YOUR_USER/YOUR_REPO.git`.

2. In a terminal, from **this project folder** (the one that contains `package.json`):

```bash
git status
```

If you see *“not a git repository”*, initialize and commit:

```bash
git init
git add -A
git commit -m "Initial commit: Seaside Contracting site"
git branch -M main
```

If Git already exists, just stage and commit your changes:

```bash
git add -A
git commit -m "Describe your changes"
```

3. Add the remote **once** (replace with your URL), then push:

```bash
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

If `origin` already exists from an old URL, use `git remote set-url origin https://github.com/YOUR_USER/YOUR_REPO.git` instead of `add`.

4. **Authentication:** GitHub no longer accepts account passwords for `git push`. Use **HTTPS + [Personal Access Token](https://github.com/settings/tokens)** (repo scope), **GitHub CLI** (`gh auth login` then push), or **SSH** (`git@github.com:YOUR_USER/YOUR_REPO.git`).

After a successful push, continue with **Deploy to GitHub Pages** below if you want the live site on `github.io`.

## Deploy to GitHub Pages

GitHub Pages serves **static files only** (no Node server, no `app/api`). This repo includes a workflow that runs **`next build`** with **`output: 'export'`** and uploads the **`out/`** folder.

1. Repo is already on GitHub (see **Push to GitHub** above).
2. **Settings → Pages → Build and deployment**: set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. The workflow [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) runs on pushes to **`main`** or **`master`**, and can be run manually (**Actions** → **Deploy to GitHub Pages** → **Run workflow**). It removes `app/api` before building (required for static export).
4. **URL**
   - **Project site** (most repos): `https://YOUR_USERNAME.github.io/REPO_NAME/`
   - **User site** (repo named `YOUR_USERNAME.github.io`): `https://YOUR_USERNAME.github.io/` with no subpath.

`basePath` is computed automatically from the repository name.

**Contact form on Pages:** the static site cannot call `/api/contact` on `github.io`. Deploy the **same** app on **Vercel** (or any host that runs Next.js API routes), then add a repository **secret** named `NEXT_PUBLIC_CONTACT_API_URL` with your live API URL, e.g. `https://your-project.vercel.app/api/contact`. The contact route allows cross-origin POSTs from the browser. Configure `RESEND_API_KEY` and related env vars on that Vercel project.

`public/.nojekyll` is included so GitHub Pages does not ignore folders like `_next`.

**Easier alternative:** deploy the full Next.js app (including API routes) on [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com) with zero static-export caveats.

### “Site not found” / **There isn’t a GitHub Pages site here** (404)

That message means **nothing has been published yet**—usually configuration or the workflow hasn’t completed—not a bug in the Next.js app.

| Check | What to do |
|--------|------------|
| **1. Pages source** | **Settings → Pages → Build and deployment**. **Source** must be **GitHub Actions** (not “Deploy from a branch” / not empty). Save if you changed it. |
| **2. Green workflow** | **Actions** → **Deploy to GitHub Pages**. The latest run should be **green**. If it’s red, open it and read the failed step’s log. |
| **3. Branch** | The workflow only runs on **`main`** or **`master`**. If your code is only on another branch, merge to `main` or push `main`. |
| **4. First deploy approval** | Some repos show **“Waiting for approval”** for the `github-pages` environment. Open the workflow run in **Actions** and **approve** the deployment if prompted. |
| **5. Run manually** | **Actions** → **Deploy to GitHub Pages** → **Run workflow** → **Run workflow** (helps after you enable Pages or fix settings). |
| **6. URL** | For a repo named `Seaside-Contracting` under user `GemsNS`, use: **`https://gemsns.github.io/Seaside-Contracting/`** (trailing slash is fine). Wait 1–2 minutes after a successful deploy before refreshing. |

**Private repo:** On a free personal account, GitHub Pages for **private** repositories may be limited; use a **public** repo for free hosting, or upgrade.

## Run the site

```bash
npm run dev
```

**Important:** After it starts, read the terminal for the **exact URL**. If port `3000` is already taken (another app or an old Next process), Next will use **`3001`**, **`3002`**, etc. Open **that** URL—`http://localhost:3000` will not work in that case.

Optional faster dev (Turbopack; can be flaky on OneDrive/network folders):

```bash
npm run dev:turbo
```

## Troubleshooting “it’s not running”

1. **Wrong port** — Use the `Local: http://localhost:…` line from the terminal, not only 3000.
2. **Dependencies** — From the project folder run `npm install` again.
3. **OneDrive / slow disk** — Next may log “Slow filesystem”. Prefer excluding **`.next`** from sync, or move the repo off OneDrive for development.
4. **`ENOENT` / `routes-manifest.json` / broken cache** — Stop the dev server, run **`npm run clean`** (deletes **`.next`** and any legacy **`next-dist`**), then **`npm run dev`** again.
5. **`EPERM` on trace files** — Avoid running two dev servers on the same folder; pause OneDrive for the project while developing if locks continue.
6. **Port 3000 in use** — Stop the other process: `netstat -ano | findstr ":3000"`, then `taskkill /PID <pid> /F`, or change the port in `package.json` `dev` script.
7. **Multiple lockfiles** — If Next warns about lockfiles under your user folder (`C:\Users\…\package-lock.json`), remove or rename that file if you don’t need it, so this project’s `package-lock.json` is the one Next uses.

## Brand preview page (internal)

`/brand-preview` — vehicle-wrap mockup plus four direction boards; **not** in the main nav. A quiet footer link (“Brand & fleet reference”) points here. Open directly: `http://localhost:<port>/brand-preview`.
