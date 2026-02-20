export interface Product {
  slug: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  images?: string[];
  category: string;
  features: string[];
  purchaseUrl?: string;
  stlFiles?: string[]; // filenames in private/stl/ — served securely via /api/download
}

export const products: Product[] = [
  {
    slug: "tacoma-front-skid-plate",
    name: "Tacoma Front Skid Plate",
    price: 4.99,
    description:
      "Heavy-duty front skid plate designed for the 3rd Gen Toyota Tacoma. Built for real-world protection and precise fitment.",
    longDescription:
      "This precision-engineered front skid plate is designed for the 3rd Gen Toyota Tacoma (2016–2023) with accurate mounting points and realistic ribbing for structural rigidity. Prints cleanly in PLA, PETG, or ASA. Includes optimized geometry for FDM printing with minimal supports.",
    image: "/products/skid-plate.svg",
    category: "Armor & Protection",
    features: [
      "Accurate 3rd Gen Tacoma fitment",
      "Reinforced rib pattern for realism",
      "Optimized for FDM — minimal supports",
      "Compatible with PLA, PETG, and ASA",
    ],
    stlFiles: ["tacoma-front-skid-plate.stl"],
  },
  {
    slug: "tacoma-roof-rack-system",
    name: "Tacoma Roof Rack System",
    price: 6.99,
    description:
      "Modular roof rack system for the Toyota Tacoma. Includes crossbars and mounting brackets.",
    longDescription:
      "A fully modular roof rack system inspired by premium overland setups for the Toyota Tacoma. This STL pack includes the main rack platform, crossbars, and mounting feet that snap into place. The open-rail design allows you to add custom accessories like light bars, cargo boxes, or jerry cans. Prints as separate components for easy assembly and painting.",
    image: "/products/roof-rack.svg",
    category: "Overland & Cargo",
    features: [
      "Modular snap-fit assembly",
      "Includes platform, crossbars, and mounts",
      "Full-size Tacoma fitment",
      "Open-rail design for accessories",
    ],
    stlFiles: ["tacoma-roof-rack-system.stl"],
  },
  {
    slug: "tacoma-raptor-light-brackets",
    name: "Tacoma Raptor Light Brackets",
    price: 8,
    description:
      "3D-printed light pod brackets for the 3rd Gen Toyota Tacoma OEM honeycomb grille. Mounts lights cleanly in the factory grille openings.",
    longDescription:
      "These brackets are designed specifically for the 3rd Gen Toyota Tacoma (2016–2023) with the OEM honeycomb grille. They mount light pods directly into the factory grille openings for a clean, no-drill install. Sized and shaped to fit the honeycomb cell geometry precisely, giving you a tight, rattle-free fit. Print in PETG or ASA for heat and UV resistance. Includes both left and right brackets.",
    image: "/products/RAPTOR LIGHT BRACKET--01.jpg",
    images: [
      "/products/RAPTOR LIGHT BRACKET--01.jpg",
      "/products/RAPTOR LIGHT BRACKET--02.jpg",
      "/products/RAPTOR LIGHT BRACKET--03.jpg",
      "/products/RAPTOR LIGHT BRACKET--04-CAD.jpg",
    ],
    category: "Lighting",
    features: [
      "Fits 3rd Gen Tacoma OEM honeycomb grille",
      "Clean, no-drill light pod mounting",
      "Left and right brackets included",
      "Print in PETG or ASA for durability",
    ],
    stlFiles: ["tacoma-raptor-light-brackets.stl", "raptor_light_clip.stl"],
  },
  {
    slug: "tacoma-rock-sliders",
    name: "Tacoma Rock Sliders",
    price: 5.49,
    description:
      "Bolt-on style rock sliders for the Toyota Tacoma. Tube design with rear kick-out.",
    longDescription:
      "These rock sliders replicate the aggressive tube-steel look of Tacoma trail armor. Featuring a true bolt-on design with realistic mounting tabs and a functional kick-out at the rear for improved departure angle clearance. The dual-tube construction adds visual weight and accuracy. Left and right sides are mirrored for proper fitment. Designed for reliable FDM printing in a flat orientation with no supports needed.",
    image: "/products/rock-sliders.svg",
    category: "Armor & Protection",
    features: [
      "Dual-tube construction for realism",
      "Rear kick-out for departure angle",
      "Mirrored L/R pair included",
      "No supports needed — prints flat",
    ],
    stlFiles: ["tacoma-rock-sliders.stl"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
