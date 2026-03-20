import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH?.trim() || "";

/**
 * Use the default output directory (`.next`). A custom `distDir` (e.g. `next-dist`) can leave
 * half-written caches on synced drives and trigger ENOENT on `routes-manifest.json`. If OneDrive
 * locks `.next/trace`, pause sync for this folder or run `npm run clean` then `npm run dev`.
 *
 * GitHub Pages: set `STATIC_EXPORT=true` (see `.github/workflows/deploy-github-pages.yml`).
 * Static export cannot include API routes; the workflow removes `app/api` before building.
 */

const nextConfig: NextConfig = {
  ...(staticExport && {
    output: "export" as const,
    /** GitHub Pages + static hosts often expect directory-style URLs */
    trailingSlash: true,
  }),
  ...(basePath ? { basePath } : {}),
  /** Prefer this project as Turbopack root when a parent folder has another lockfile */
  turbopack: {
    root: projectRoot,
  },
  images: {
    ...(staticExport && { unoptimized: true }),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
