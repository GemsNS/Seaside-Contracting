import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH?.trim() || "";

/**
 * Keep the default `distDir` (`.next`) **inside the project**. Moving the build output outside
 * the repo (including a junction to `%LOCALAPPDATA%`) breaks `react/jsx-runtime` resolution.
 * If OneDrive locks `.next/trace`, pause sync for this folder and run `npm run clean` — see
 * `docs/windows-onedrive.md`.
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
