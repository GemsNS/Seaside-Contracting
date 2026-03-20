/**
 * Copy raster brand files from /assets into /public/brand (URLs the site serves).
 * Run after you change PNGs in assets/: `npm run assets:sync`
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pairs = [
  ["assets/logo1.png", "public/brand/logo-main.png"],
  ["assets/whitebanner1.png", "public/brand/logo-on-dark.png"],
  ["assets/footercrest1.png", "public/brand/footer-crest.png"],
  ["assets/vechicle promo.png", "public/brand/vehicle-promo.png"],
  ["assets/1 (1).png", "public/brand/exploration-1.png"],
  ["assets/1 (2).png", "public/brand/exploration-2.png"],
  ["assets/1 (3).png", "public/brand/exploration-3.png"],
  ["assets/1 (4).png", "public/brand/exploration-4.png"],
  ["assets/crest1.png", "public/brand/crest-shield.png"],
  ["assets/crest2contact.png", "public/brand/crest-contact.png"],
  ["assets/miniseal.png", "public/brand/mini-seal.png"],
];

fs.mkdirSync(path.join(root, "public", "brand"), { recursive: true });

for (const [fromRel, toRel] of pairs) {
  const from = path.join(root, fromRel);
  const to = path.join(root, toRel);
  if (!fs.existsSync(from)) {
    console.warn("skip (missing):", fromRel);
    continue;
  }
  fs.copyFileSync(from, to);
  console.log("ok:", fromRel, "→", toRel);
}
