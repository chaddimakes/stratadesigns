import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const W = 1200;
const H = 630;

// SVG overlay: dark semi-transparent background + centered text
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- dark overlay -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="rgba(0,0,0,0.55)" />

  <!-- heading -->
  <text
    x="${W / 2}"
    y="${H / 2 - 40}"
    font-family="Arial Black, Arial, sans-serif"
    font-size="96"
    font-weight="900"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="-2"
  >Strata Design</text>

  <!-- subtitle -->
  <text
    x="${W / 2}"
    y="${H / 2 + 60}"
    font-family="Arial, sans-serif"
    font-size="40"
    font-weight="400"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="1"
  >Precision Engineered. Trail Tested.</text>
</svg>
`.trim();

await sharp(join(root, "public", "hero.jpg"))
  .resize(W, H, { fit: "cover", position: "center" })
  .composite([{ input: Buffer.from(svg), blend: "over" }])
  .jpeg({ quality: 90 })
  .toFile(join(root, "public", "og-image.jpg"));

console.log("og-image.jpg written to public/");
