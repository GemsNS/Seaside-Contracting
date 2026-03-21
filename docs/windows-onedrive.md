# Windows + OneDrive + Next.js

## OneDrive locks `.next` (EPERM)

Sync can lock files under **`.next`**, especially **`.next/trace`**, so `next dev` fails with **`EPERM`**.

## Do **not** move `distDir` to `%LOCALAPPDATA%`

Putting the build output **outside the repo** (even via a relative path to `AppData`) breaks **server module resolution** — you can get:

`Cannot find module 'react/jsx-runtime'`

Next expects the compiled server chunks to sit under the project tree so **`node_modules/react`** resolves correctly.

## Recommended: directory junction

Keep the **logical** path **`.\.next`** in the project (so resolution works), but store bytes on a non-synced folder:

1. Pause OneDrive for this project (or briefly pause all sync).
2. From the project root:

   ```bash
   npm run junction
   ```

   That renames any existing `.next`, then runs `mklink /J .next` → `%LOCALAPPDATA%\seaside-contracting-next`.

3. Run `npm run dev` again.

If rename/delete fails, close dev servers and Cursor handles on `.next`, pause OneDrive, delete `.next` in Explorer, then run `npm run junction`.

## Clean caches

```bash
npm run clean
```

This removes **`.next`**, **`next-dist`**, and **`%LOCALAPPDATA%\seaside-contracting-next`** when present.
