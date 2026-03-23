# Windows + OneDrive + Next.js

## OneDrive locks `.next` (EPERM)

Sync can lock files under **`.next`**, especially **`.next/trace`**, so `next dev` fails with **`EPERM`**.

## Do **not** move the build output outside the repo

Putting **`.next`** bytes **outside the project tree** (including a **directory junction** to `%LOCALAPPDATA%`) breaks **server module resolution** — typical errors:

- `Cannot find module 'react/jsx-runtime'`
- `ENOENT: ...\.next\prerender-manifest.json` (partial / corrupted cache)

Next expects compiled server chunks to live under the project tree so **`node_modules/react`** resolves correctly. **`npm run junction` is disabled** for this reason.

## If you see `ENOENT` on `prerender-manifest.json`

The **`.next`** folder is incomplete or corrupted (often after a failed clean, crash, or sync conflict).

1. Stop the dev server (**Ctrl+C** in the terminal running `next dev`).
2. If **`npm run clean`** fails with EPERM, **close** any **`npm run dev`** / Node processes (Task Manager → end **Node.js**), then pause **OneDrive** for this folder and retry.
3. From the project root:

   ```bash
   npm run clean
   npm run dev
   ```

## Recommended: avoid OneDrive on the repo

- **Pause syncing** this project folder while developing, or
- **Clone/copy** the project to a path **outside** OneDrive (e.g. `C:\dev\seaside-contracting`).

## Clean caches

```bash
npm run clean
```

This removes **`.next`**, **`next-dist`**, and **`%LOCALAPPDATA%\seaside-contracting-next`** when present.

## npm “multiple lockfiles” (wrong `package-lock.json`)

If npm warns that it is **selecting** `C:\Users\bytec\package-lock.json` (or another parent path), installs can resolve the wrong tree. **Remove or rename** the stray lockfile outside this repo, then run **`npm install`** again from the project root.

## Dev server not reachable on `127.0.0.1`

The **`dev`** script binds **`0.0.0.0`** so **`http://localhost:3000`** and **`http://127.0.0.1:3000`** both work on typical Windows setups. If you only want loopback, change the script to **`-H 127.0.0.1`**.
