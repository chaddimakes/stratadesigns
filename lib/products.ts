export interface ProductVariant {
  name: string;
  stlFiles: string[];
  previewImage?: string;
}

export interface ProductToggleOption {
  key: string;
  label: string;
  default: boolean;
}

export interface ProductToggleCombination {
  when: Record<string, boolean>;
  stlFiles: string[];
  previewImage?: string;
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
  toggleOptions?: ProductToggleOption[]; // independent boolean toggles
  toggleCombinations?: ProductToggleCombination[]; // file/image matrix for toggle combinations
  supports?: string;
  material?: string;
  requiredHardware?: string[];
  vehicle?: string;
}

export const products: Product[] = [
  {
    slug: "tacoma-dc-power-panel",
    name: "Tacoma DC Power Panel",
    price: 30,
    description:
      'Print-ready STL that replaces the interior bed door panel on the 2020 Toyota Tacoma, purpose-built to mount the <a href="https://www.amazon.com/Blue-Sea-Systems-4365-BSS-Water-Resistant/dp/B07PSGW8R9" target="_blank">Blue Sea Systems 4365, 4366, or 4367 Accessory Panel</a> and <a href="https://www.amazon.com/Blue-Sea-Systems-Mini-Voltmeter/dp/B01CZ2ZXKM" target="_blank">Blue Sea Mini OLED Voltmeter</a>. Optional PWM dimmer switch for controlling bed lights: <a href="https://www.amazon.com/dp/B085TK13SH" target="_blank">Mini LED Dimmer Knob</a>. A clean, factory-look solution for adding 12V power to your truck bed — run a fridge, USB chargers, or any 12V accessories. Recommended materials: PETG, ABS, or ASA.',
    longDescription:
      'Print-ready STL that replaces the interior bed door panel on the 2020 Toyota Tacoma, purpose-built to mount the <a href="https://www.amazon.com/Blue-Sea-Systems-4365-BSS-Water-Resistant/dp/B07PSGW8R9" target="_blank">Blue Sea Systems 4365, 4366, or 4367 Accessory Panel</a> and <a href="https://www.amazon.com/Blue-Sea-Systems-Mini-Voltmeter/dp/B01CZ2ZXKM" target="_blank">Blue Sea Mini OLED Voltmeter</a>. Optional PWM dimmer switch for controlling bed lights: <a href="https://www.amazon.com/dp/B085TK13SH" target="_blank">Mini LED Dimmer Knob</a>. A clean, factory-look solution for adding 12V power to your truck bed — run a fridge, USB chargers, or any 12V accessories. Recommended materials: PETG, ABS, or ASA.',
    image: "/products/Tacoma_DC_Power_Panel_01.jpg",
    images: [
      "/products/Tacoma_DC_Power_Panel_01.jpg",
      "/products/Tacoma_DC_Power_Panel_dimmer_CAD.jpg",
      "/products/Tacoma_DC_Power_Panel_no_dimmer_CAD.jpg",
      "/products/Tacoma_DC_Power_Panel_dimmer_gasket_CAD.jpg",
      "/products/Tacoma_DC_Power_Panel_no_dimmer_gasket_CAD.jpg",
    ],
    category: "Electrical",
    features: [
      "Replaces factory bed door panel on 2020 Toyota Tacoma",
      "Mounts Blue Sea Systems 4365 Accessory Panel and Mini OLED Meter",
      "Optional PWM dimmer switch variant for bed light control",
      "Clean, factory-look 12V power for fridge, USB chargers, and accessories",
    ],
    material: "PETG, ABS, or ASA",
    supports: "None",
    requiredHardware: [
      '1x 1/4-20 x 0.75" Hex Bolt',
      "1x 1/4-20 Square Nut ⚠️ Embedded during print — pause print midway to insert into the Knob file",
      "4x M4 x 12mm Hex Nuts",
      "4x M4 x 12mm Bolts",
    ],
    toggleOptions: [
      { key: "dimmer", label: "Dimmer", default: false },
      { key: "gasket", label: "Gasket", default: false },
    ],
    toggleCombinations: [
      {
        when: { dimmer: false, gasket: false },
        previewImage: "/products/Tacoma_DC_Power_Panel_no_dimmer_CAD.jpg",
        stlFiles: [
          "Tacoma_DC_Power_Panel_No_Dimmer.stl",
          "Tacoma_DC_Power_Panel_Knob.stl",
          "Tacoma_DC_Power_Panel_Latch.stl",
        ],
      },
      {
        when: { dimmer: true, gasket: false },
        previewImage: "/products/Tacoma_DC_Power_Panel_dimmer_CAD.jpg",
        stlFiles: [
          "Tacoma_DC_Power_Panel_Dimmer_version.stl",
          "Tacoma_DC_Power_Panel_Knob.stl",
          "Tacoma_DC_Power_Panel_Latch.stl",
        ],
      },
      {
        when: { dimmer: false, gasket: true },
        previewImage: "/products/Tacoma_DC_Power_Panel_no_dimmer_gasket_CAD.jpg",
        stlFiles: [
          "Tacoma_DC_Power_Panel_No_Dimmer_Gasket.3mf",
          "Tacoma_DC_Power_Panel_Knob.stl",
          "Tacoma_DC_Power_Panel_Latch.stl",
        ],
      },
      {
        when: { dimmer: true, gasket: true },
        previewImage: "/products/Tacoma_DC_Power_Panel_dimmer_gasket_CAD.jpg",
        stlFiles: [
          "Tacoma_DC_Power_Panel_Dimmer_Gasket.3mf",
          "Tacoma_DC_Power_Panel_Knob.stl",
          "Tacoma_DC_Power_Panel_Latch.stl",
        ],
      },
    ],
    vehicle: "tacoma",
  },
  {
    slug: "tacoma-raptor-light-brackets",
    name: "Tacoma Raptor Light Brackets",
    price: 20,
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
    ],
    material: "PETG, ABS, or ASA",
    stlFiles: [
      "Tacoma_Raptor_Light_Brackets.stl",
      "Raptor_Light_Clip.stl",
    ],
    vehicle: "tacoma",
  },
  {
    slug: "roof-rack-camp-light-mount",
    name: "Roof Rack Camp Light Mount",
    price: 15,
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
    requiredHardware: [
      "4x M6 x 16mm Button Head Bolts",
      "2x M6 Square Nuts",
      "2x M6 Washers",
    ],
    vehicle: "universal",
  },
  {
    slug: "tacoma-glove-box-organizer",
    name: "Tacoma Glove Box Organizer",
    price: 12,
    description:
      "Print-ready STL shelf designed to keep your Tacoma glove box organized. Unlike the cheap, flimsy multi-piece versions on Amazon, this is a single-piece heavy duty shelf that fits perfectly with no assembly required. Note: this is a very large print with a max width of 390mm — if printing on a Bambu Lab H2 series printer, rotate the part on your print bed to fit.",
    longDescription:
      "Print-ready STL shelf designed to keep your Tacoma glove box organized. Unlike the cheap, flimsy multi-piece versions on Amazon, this is a single-piece heavy duty shelf that fits perfectly with no assembly required. Note: this is a very large print with a max width of 390mm — if printing on a Bambu Lab H2 series printer, rotate the part on your print bed to fit.",
    image: "/products/Tacoma_Glove_Box_Shelf_01.jpg",
    images: [
      "/products/Tacoma_Glove_Box_Shelf_01.jpg",
      "/products/Tacoma_Glove_Box_Shelf_02.jpg",
      "/products/Tacoma_Glove_Box_Shelf_CAD.jpg",
    ],
    category: "Interior",
    features: [
      "Single-piece heavy duty shelf — no assembly required",
      "Fits Toyota Tacoma glove box",
    ],
    material: "PETG or ABS",
    stlFiles: ["Tacoma_Glove_Box_Shelf.stl"],
    supports: "None",
    vehicle: "tacoma",
  },
  {
    slug: "tacoma-center-console-organizer",
    name: "Tacoma Center Console Organizer",
    price: 12,
    description:
      "Print-ready STL organizer designed to keep your Tacoma center console tidy. Unlike the flimsy multi-piece versions available on Amazon, this is a single-piece heavy duty organizer that fits perfectly with no assembly required.",
    longDescription:
      "Print-ready STL organizer designed to keep your Tacoma center console tidy. Unlike the flimsy multi-piece versions available on Amazon, this is a single-piece heavy duty organizer that fits perfectly with no assembly required.",
    image: "/products/Tacoma_Center_Console_Organizer_01.jpg",
    images: [
      "/products/Tacoma_Center_Console_Organizer_01.jpg",
      "/products/Tacoma_Center_Console_Organizer_02.jpg",
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
    vehicle: "tacoma",
  },
  {
    slug: "pelican-3310-els-bracket",
    name: "Pelican 3310 ELS Bed Rail Bracket",
    price: 15,
    description:
      "Print-ready STL bracket designed to mount the Pelican 3310 ELS Emergency Lighting Station to your truck bed rail for quick, easy access.",
    longDescription:
      "Print-ready STL bracket designed to mount the Pelican 3310 ELS Emergency Lighting Station to your truck bed rail for quick, easy access. The Pelican 3310 ELS is a glow-in-the-dark photoluminescent flashlight that comes in a wall-mountable case — this bracket adapts that mount for truck bed rail use. Supports required. Print in PETG, ABS, or ASA for UV and heat resistance.",
    image: "/products/Pelican_3310_ELS_Bracket_01.jpg",
    images: [
      "/products/Pelican_3310_ELS_Bracket_01.jpg",
      "/products/Pelican_3310_ELS_Bracket_02.jpg",
      "/products/Pelican_3310_ELS_Bracket_03.jpg",
      "/products/Pelican_3310_ELS_Bracket_CAD.jpg",
    ],
    category: "Storage & Organization",
    features: [
      "Mounts Pelican 3310 ELS to truck bed rail",
      "Adapts factory wall-mount case for truck use",
      "Glow-in-the-dark flashlight always within reach",
    ],
    material: "PETG, ABS, or ASA",
    stlFiles: ["Pelican_3310_ELS_Bracket.stl"],
    supports: "Yes",
    requiredHardware: [
      "2x M5 x 10mm Button Head Bolts",
      "2x M5 Washers",
      "2x M5 Hex Nuts",
      "1x 3/8-16 Bed Rail Nut (Toyota Tacoma)",
      '1x 3/8-16 x 0.75" Bolt',
    ],
    vehicle: "universal",
  },
  {
    slug: "tacoma-midrange-speaker-mount",
    name: "Tacoma Midrange Speaker Mount",
    price: 10,
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
      "Designed for 2-inch midrange speakers (tested on JBL Stadium GTO20M)",
      "No cutting or modifications required",
    ],
    material: "PETG or ABS",
    stlFiles: ["Tacoma_tweeter_adapter.stl"],
    supports: "None",
    vehicle: "tacoma",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByVehicle(vehicle: string): Product[] {
  return products.filter((p) => p.vehicle === vehicle);
}
