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
  supports?: string;
  material?: string;
}

export const products: Product[] = [
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
    ],
    material: "PETG, ABS, or ASA",
    stlFiles: [
      "Tacoma_Raptor_Light_Brackets.stl",
      "Raptor_Light_Clip.stl",
    ],
  },
  {
    slug: "roof-rack-camp-light-mount",
    name: "Roof Rack Camp Light Mount",
    price: 8,
    description:
      "Print-ready STL mounts designed for the Harbor Freight ROADSHOCK 12V Utility/Rock White LED Camp Light. A wallet-friendly alternative to premium options like the Baja Designs Rock Light — get the same functionality without the $66/light price tag. Tested on a Prinsu roof rack but designed to be compatible with most universal roof rack setups.",
    longDescription:
      "Print-ready STL mounts designed for the Harbor Freight ROADSHOCK 12V Utility/Rock White LED Camp Light. A wallet-friendly alternative to premium options like the Baja Designs Rock Light — get the same functionality without the $66/light price tag. Tested on a Prinsu roof rack but designed to be compatible with most universal roof rack setups.",
    image: "/products/Roof_Rack_Camp_Light_Mount_02.jpg",
    images: [
      "/products/Roof_Rack_Camp_Light_Mount_02.jpg",
      "/products/Roof_Rack_Camp_Light_Mount_03.jpg",
      "/products/Roof_Rack_Camp_Light_Mount_04.jpg",
      "/products/Roof_Rack_Camp_Light_Mount_CAD.jpg",
    ],
    category: "Lighting",
    features: [
      "Designed for Harbor Freight ROADSHOCK 12V LED Camp Light",
      "Compatible with Prinsu and most universal roof rack setups",
      "Budget-friendly alternative to Baja Designs Rock Light",
    ],
    material: "PETG or ASA",
    stlFiles: ["Roof_Rack_Camp_Light_Mount.stl"],
    supports: "Minimal / None",
  },
  {
    slug: "tacoma-tweeter-adapter",
    name: "Tacoma Tweeter Adapter",
    price: 5,
    description:
      "Print-ready STL mount designed to replace the factory tweeter bracket in all 3rd Gen Toyota Tacomas (2016-2023). Fits the JBL Stadium GTO20M Stadium Series 2-inch midrange speakers for a clean, factory-look install with no cutting or modifications required.",
    longDescription:
      "Print-ready STL mount designed to replace the factory tweeter bracket in all 3rd Gen Toyota Tacomas (2016-2023). Fits the JBL Stadium GTO20M Stadium Series 2-inch midrange speakers for a clean, factory-look install with no cutting or modifications required.",
    image: "/products/Tacoma_Tweeter_Adapter_01.jpg",
    images: [
      "/products/Tacoma_Tweeter_Adapter_01.jpg",
      "/products/Tacoma_Tweeter_Adapter_02.jpg",
    ],
    category: "Audio",
    features: [
      "Fits all 3rd Gen Toyota Tacomas (2016-2023)",
      "Designed for JBL Stadium GTO20M 2-inch midrange speakers",
      "No cutting or modifications required",
    ],
    material: "PETG or ABS",
    stlFiles: ["Tacoma_tweeter_adapter.stl"],
    supports: "None",
  },
  {
    slug: "pelican-3310-els-bracket",
    name: "Pelican 3310 ELS Bed Rail Bracket",
    price: 5,
    description:
      "Print-ready STL bracket designed to mount the Pelican 3310 ELS Emergency Lighting Station to your truck bed rail for quick, easy access.",
    longDescription:
      "Print-ready STL bracket designed to mount the Pelican 3310 ELS Emergency Lighting Station to your truck bed rail for quick, easy access. The Pelican 3310 ELS is a glow-in-the-dark photoluminescent flashlight that comes in a wall-mountable case — this bracket adapts that mount for truck bed rail use. Supports required. Print in PETG, ABS, or ASA for UV and heat resistance.",
    image: "/products/Pelican_3310_ELS_Bracket_CAD.jpg",
    category: "Storage & Organization",
    features: [
      "Mounts Pelican 3310 ELS to truck bed rail",
      "Adapts factory wall-mount case for truck use",
      "Glow-in-the-dark flashlight always within reach",
    ],
    material: "PETG, ABS, or ASA",
    stlFiles: ["Pelican_3310_ELS_Bracket.stl"],
    supports: "Required",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
