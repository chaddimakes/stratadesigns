export interface Product {
  slug: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  features: string[];
}

export const products: Product[] = [
  {
    slug: "tacoma-front-skid-plate",
    name: "Tacoma Front Skid Plate",
    price: 4.99,
    description:
      "Heavy-duty front skid plate designed for 3rd Gen Toyota Tacoma. Scale model protection for your RC build.",
    longDescription:
      "This precision-engineered front skid plate is modeled after full-size off-road armor for the 3rd Gen Toyota Tacoma (2016–2023). Designed with accurate mounting points and realistic ribbing for structural rigidity, this STL prints cleanly in PLA, PETG, or ASA. Perfect for RC crawlers, scale model builds, or display pieces. Includes optimized geometry for FDM printing with minimal supports.",
    image: "/products/skid-plate.svg",
    category: "Armor & Protection",
    features: [
      "Accurate 3rd Gen Tacoma fitment",
      "Reinforced rib pattern for realism",
      "Optimized for FDM — minimal supports",
      "Compatible with PLA, PETG, and ASA",
    ],
  },
  {
    slug: "tacoma-roof-rack-system",
    name: "Tacoma Roof Rack System",
    price: 6.99,
    description:
      "Modular roof rack system for Toyota Tacoma scale models. Includes crossbars and mounting brackets.",
    longDescription:
      "A fully modular roof rack system inspired by premium overland setups for the Toyota Tacoma. This STL pack includes the main rack platform, crossbars, and mounting feet that snap into place. Designed at 1:10 scale but easily resizable for other ratios. The open-rail design allows you to add custom accessories like light bars, cargo boxes, or jerry cans. Prints as separate components for easy assembly and painting.",
    image: "/products/roof-rack.svg",
    category: "Overland & Cargo",
    features: [
      "Modular snap-fit assembly",
      "Includes platform, crossbars, and mounts",
      "1:10 scale — resizable to any ratio",
      "Open-rail design for accessories",
    ],
  },
  {
    slug: "tacoma-rock-sliders",
    name: "Tacoma Rock Sliders",
    price: 5.49,
    description:
      "Bolt-on style rock sliders for Toyota Tacoma models. Realistic tube design with kick-out.",
    longDescription:
      "These rock sliders replicate the aggressive tube-steel look of full-size Tacoma trail armor. Featuring a true bolt-on design with realistic mounting tabs and a functional kick-out at the rear for improved departure angle clearance. The dual-tube construction adds visual weight and scale accuracy. Left and right sides are mirrored for proper fitment. Designed for reliable FDM printing in a flat orientation with no supports needed.",
    image: "/products/rock-sliders.svg",
    category: "Armor & Protection",
    features: [
      "Dual-tube construction for realism",
      "Rear kick-out for departure angle",
      "Mirrored L/R pair included",
      "No supports needed — prints flat",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
