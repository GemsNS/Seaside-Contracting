/**
 * Prefix `public/` URLs when the app is served under a subpath (GitHub Pages project sites).
 * `Link`/`router` honor `basePath` automatically; static files in `public/` do not — see
 * https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath
 *
 * Set `NEXT_PUBLIC_BASE_PATH` to the same value as `basePath` in `next.config` (e.g. `/Seaside-Contracting`).
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
