import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const W = 2400;
const H = 1260;

// SVG: dark background, PP mark top-left, centered title + subtitle
// 2x pixel density (2400x1260) for crisp rendering at 1200x630 OG display size
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- solid dark background -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="#0d0d0d" />

  <!-- PP mark — top left -->
  <rect x="120" y="100" width="112" height="112" rx="20" fill="#e07b39" />
  <text
    x="176"
    y="172"
    font-family="'Courier New', Courier, monospace"
    font-size="48"
    font-weight="700"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
  >PP</text>

  <!-- title line 1 (orange) -->
  <text
    x="${W / 2}"
    y="${H / 2 - 120}"
    font-family="Arial Black, Arial, sans-serif"
    font-size="104"
    font-weight="900"
    fill="#e07b39"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="-2"
  >I Built an E-Commerce Website</text>

  <!-- title line 2 (orange) -->
  <text
    x="${W / 2}"
    y="${H / 2 + 4}"
    font-family="Arial Black, Arial, sans-serif"
    font-size="104"
    font-weight="900"
    fill="#e07b39"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="-2"
  >with Zero Coding Experience</text>

  <!-- subtitle (white) -->
  <text
    x="${W / 2}"
    y="${H / 2 + 160}"
    font-family="Arial, sans-serif"
    font-size="56"
    font-weight="400"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
    opacity="0.85"
  >The side business was always the plan.</text>

  <text
    x="${W / 2}"
    y="${H / 2 + 236}"
    font-family="Arial, sans-serif"
    font-size="56"
    font-weight="400"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
    opacity="0.85"
  >The website was always the excuse.</text>
</svg>
`.trim();

await sharp(Buffer.from(svg))
  .jpeg({ quality: 100 })
  .toFile(join(root, "public", "blog-og-image.jpg"));

console.log("blog-og-image.jpg written to public/");
