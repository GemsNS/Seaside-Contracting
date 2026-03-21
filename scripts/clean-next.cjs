/**
 * Remove Next.js build output. Use when you see ENOENT on routes-manifest.json,
 * EPERM on trace, or other cache corruption (common on OneDrive-synced folders).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const rmOpts = {
  recursive: true,
  force: true,
  maxRetries: 5,
  retryDelay: 200,
};

const extraDirs =
  process.platform === "win32" && process.env.LOCALAPPDATA
    ? [path.join(process.env.LOCALAPPDATA, "seaside-contracting-next")]
    : [];

for (const dir of [".next", "next-dist", ...extraDirs]) {
  const target = path.isAbsolute(dir) ? dir : path.join(root, dir);
  try {
    if (fs.existsSync(target)) {
      fs.rmSync(target, rmOpts);
      process.stdout.write(`removed ${dir}\n`);
    }
  } catch (e) {
    process.stderr.write(
      `could not remove ${dir}: ${e && e.message}\n` +
        `  Close the dev server and any editor locks, then retry. On Windows/OneDrive you may need to pause sync for this folder.\n`,
    );
    process.exitCode = 1;
  }
}
