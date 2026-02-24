export interface ProductVariant {
  name: string;
  stlFiles: string[];
}

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
  variants?: ProductVariant[]; // if set, stlFiles are per-variant instead of top-level
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
    slug: "tacoma-midrange-speaker-mount",
    name: "Tacoma Midrange Speaker Mount",
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
    slug: "tacoma-glove-box-organizer",
    name: "Tacoma Glove Box Organizer",
    price: 8,
    description:
      "Print-ready STL shelf designed to keep your Tacoma glove box organized. Unlike the cheap, flimsy multi-piece versions on Amazon, this is a single-piece heavy duty shelf that fits perfectly with no assembly required. Note: this is a very large print with a max width of 390mm — if printing on a Bambu Lab H2 series printer, rotate the part on your print bed to fit.",
    longDescription:
      "Print-ready STL shelf designed to keep your Tacoma glove box organized. Unlike the cheap, flimsy multi-piece versions on Amazon, this is a single-piece heavy duty shelf that fits perfectly with no assembly required. Note: this is a very large print with a max width of 390mm — if printing on a Bambu Lab H2 series printer, rotate the part on your print bed to fit.",
    image: "/products/Tacoma_Glove_Box_Shelf_01.jpg",
    images: [
      "/products/Tacoma_Glove_Box_Shelf_01.jpg",
      "/products/Tacoma_Glove_Box_Shelf_CAD.jpg",
    ],
    category: "Interior",
    features: [
      "Single-piece heavy duty shelf — no assembly required",
      "Fits Toyota Tacoma glove box",
      "Max print width 390mm — rotate on Bambu Lab H2 series printers",
    ],
    material: "PETG or ABS",
    stlFiles: ["Tacoma_Glove_Box_Shelf.stl"],
    supports: "None",
  },
  {
    slug: "tacoma-center-console-organizer",
    name: "Tacoma Center Console Organizer",
    price: 8,
    description:
      "Print-ready STL organizer designed to keep your Tacoma center console tidy. Unlike the flimsy multi-piece versions available on Amazon, this is a single-piece heavy duty organizer that fits perfectly with no assembly required.",
    longDescription:
      "Print-ready STL organizer designed to keep your Tacoma center console tidy. Unlike the flimsy multi-piece versions available on Amazon, this is a single-piece heavy duty organizer that fits perfectly with no assembly required.",
    image: "/products/Tacoma_Center_Console_Organizer_01.jpg",
    images: [
      "/products/Tacoma_Center_Console_Organizer_01.jpg",
      "/products/Tacoma_Center_Console_Organizer_CAD.jpg",
    ],
    category: "Interior",
    features: [
      "Single-piece heavy duty organizer — no assembly required",
      "Fits Toyota Tacoma center console",
    ],
    material: "PETG or ABS",
    stlFiles: ["Tacoma_Center_Console_Organizer.stl"],
    supports: "None",
  },
  {
    slug: "tacoma-dc-power-panel",
    name: "Tacoma DC Power Panel",
    price: 30,
    description:
      "Print-ready STL that replaces the interior door panel on the 2020 Toyota Tacoma, purpose-built to mount the Blue Sea Systems 4365 Accessory Panel, Blue Sea Mini OLED Meter, and an optional PWM dimmer switch for controlling bed lights. A clean, factory-look solution for adding 12V power to your truck bed — run a fridge, USB chargers, or any 12V accessories. Recommended materials: PETG, ABS, or ASA.",
    longDescription:
      "Print-ready STL that replaces the interior door panel on the 2020 Toyota Tacoma, purpose-built to mount the Blue Sea Systems 4365 Accessory Panel, Blue Sea Mini OLED Meter, and an optional PWM dimmer switch for controlling bed lights. A clean, factory-look solution for adding 12V power to your truck bed — run a fridge, USB chargers, or any 12V accessories. Recommended materials: PETG, ABS, or ASA.",
    image: "/products/Tacoma_DC_Power_Panel_01.jpg",
    images: [
      "/products/Tacoma_DC_Power_Panel_01.jpg",
      "/products/Tacoma_DC_Power_Panel_dimmer_CAD.jpg",
      "/products/Tacoma_DC_Power_Panel_no_dimmer_CAD.jpg",
    ],
    category: "Electrical",
    features: [
      "Replaces factory interior door panel on 2020 Toyota Tacoma",
      "Mounts Blue Sea Systems 4365 Accessory Panel and Mini OLED Meter",
      "Optional PWM dimmer switch variant for bed light control",
      "Clean, factory-look 12V power for fridge, USB chargers, and accessories",
    ],
    material: "PETG, ABS, or ASA",
    supports: "None",
    variants: [
      {
        name: "Without Dimmer",
        stlFiles: [
          "Tacoma_DC_Power_Panel_No_Dimmer.stl",
          "Tacoma_DC_Power_Panel_Knob.stl",
          "Tacoma_DC_Power_Panel_Latch.stl",
        ],
      },
      {
        name: "With Dimmer",
        stlFiles: [
          "Tacoma_DC_Power_Panel_Dimmer_version.stl",
          "Tacoma_DC_Power_Panel_Knob.stl",
          "Tacoma_DC_Power_Panel_Latch.stl",
        ],
      },
    ],
  },
  {
    slug: "pelican-3310-els-bracket",
    name: "Pelican 3310 ELS Bed Rail Bracket",
    price: 8,
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
