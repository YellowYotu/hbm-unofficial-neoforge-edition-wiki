export type MachineStat = { label: string; value: string; };
export type ConstructionRecipe = {
  method: string;
  tier?: string;
  ingredients: { name: string; count: number }[];
  duration?: string;
  energy?: string;
  pattern?: string[];
};
export type MachineDetails = {
  description: string;
  requires: string[];
  stats: MachineStat[];
  construction: ConstructionRecipe[];
  recipes?: string[];
  notes?: string[];
};

export const machineDetails: Record<string, MachineDetails> = {
  press: {
    description: "Fuel-powered stamping machine. Insert fuel, a compatible stamp and an input item. The stamp determines the processing route.",
    requires: ["Burnable fuel", "Compatible stamp", "Recipe input"],
    stats: [
      { label: "Fuel per operation", value: "200 burn ticks" },
      { label: "Maximum speed", value: "400" },
      { label: "Press travel", value: "200" },
      { label: "Inventory", value: "13 slots" },
      { label: "Power", value: "Does not use HE" }
    ],
    construction: [{
      method: "Crafting Table",
      pattern: ["IRI", "IPI", "IBI"],
      ingredients: [
        { name: "Iron Ingot", count: 5 },
        { name: "Furnace", count: 1 },
        { name: "Piston", count: 1 },
        { name: "Iron Block", count: 1 }
      ]
    }],
    recipes: ["Iron Plate", "Copper Plate", "Steel Plate", "Titanium Plate", "Aluminium Plate", "Lead Plate", "Gold Plate", "Aluminium Wire", "Red Copper Wire", "Latex", "Copper Wire", "Gold Wire", "Tungsten Wire", "Lead Wire", "Carbon Wire", "Gunmetal Plate", "High-Speed Steel Plate", "Quartz from Powder", "Compressed Biomass", "Jungle Latex", "Printing Page 1", "Printing Page 2", "Printing Page 3", "Printing Page 4", "Printing Page 5", "Printing Page 6", "Printing Page 7", "Printing Page 8", "Coal Briquette", "Lignite Briquette", "Wood Briquette"]
  },
  blast_furnace: {
    description: "Two-input high-temperature furnace used for early alloy production, including steel and red copper.",
    requires: ["Two valid recipe inputs", "Supported blast-furnace fuel"],
    stats: [
      { label: "Processing time", value: "400 ticks / 20 s" },
      { label: "Maximum stored fuel", value: "12,800" },
      { label: "Coal / charcoal", value: "200 fuel" },
      { label: "Coal block", value: "2,000 fuel" },
      { label: "Lava bucket", value: "12,800 fuel" },
      { label: "Blaze rod", value: "1,000 fuel" },
      { label: "Coke / solid fuel", value: "400 fuel" }
    ],
    construction: [{
      method: "HBM Anvil",
      ingredients: [
        { name: "Stone Bricks", count: 4 },
        { name: "Fire Brick", count: 4 },
        { name: "Copper Plate", count: 4 }
      ]
    }],
    recipes: ["Steel from Iron + Coal", "Steel from Iron + Coke", "Steel from Ore + Coal", "Steel from Ore + Coke", "Red Copper"]
  },
  wood_burning_generator: {
    description: "Burns normal burnable fuels and converts them into HE. It can charge a battery directly and feed nearby machine networks.",
    requires: ["Any burnable fuel"],
    stats: [
      { label: "Energy buffer", value: "100,000 HE" },
      { label: "Generation", value: "100 HE/t" },
      { label: "Battery charge rate", value: "up to 100 HE/t" },
      { label: "Power toggle", value: "Enabled / disabled in GUI" }
    ],
    construction: [{
      method: "Crafting Table",
      pattern: ["PPP", "CFC", "I I"],
      ingredients: [
        { name: "Steel Plate", count: 3 },
        { name: "Copper Coil", count: 2 },
        { name: "Furnace", count: 1 },
        { name: "Iron Ingot", count: 2 }
      ]
    }]
  },
  oil_derrick: {
    description: "Drills underground oil deposits and stores extracted crude oil plus associated gas.",
    requires: ["Oil deposit below the derrick", "HE power", "Titanium drill as part of construction"],
    stats: [
      { label: "Energy buffer", value: "100,000 HE" },
      { label: "Base consumption", value: "100 HE/t" },
      { label: "Base extraction delay", value: "50 ticks" },
      { label: "Oil per extraction", value: "500 mB" },
      { label: "Gas per extraction", value: "100–500 mB" },
      { label: "Oil tank", value: "64,000 mB" },
      { label: "Gas tank", value: "64,000 mB" },
      { label: "Deposit drain chance", value: "5%" }
    ],
    construction: [{
      method: "Assembly Machine",
      duration: "200 ticks / 10 s",
      energy: "100 HE/t",
      ingredients: [
        { name: "Steel Plate", count: 8 },
        { name: "Cast Copper Plate", count: 2 },
        { name: "Steel Pipe", count: 4 },
        { name: "Motor", count: 1 },
        { name: "Titanium Drill", count: 1 }
      ]
    }],
    notes: ["Speed, Power Saving and Overdrive upgrades change extraction delay and HE consumption."]
  },
  shredder: {
    description: "Recycling machine that breaks a large set of blocks and materials into powders, scrap and other reusable outputs.",
    requires: ["HE power", "Two valid shredder blades", "A supported recipe input"],
    stats: [
      { label: "Energy buffer", value: "10,000 HE" },
      { label: "Energy use", value: "5 HE/t" },
      { label: "Processing time", value: "60 ticks / 3 s" },
      { label: "Input slots", value: "9" },
      { label: "Output slots", value: "18" },
      { label: "Blade slots", value: "2" }
    ],
    construction: [{
      method: "Assembly Machine",
      duration: "100 ticks / 5 s",
      energy: "100 HE/t",
      ingredients: [
        { name: "Steel Plate", count: 8 },
        { name: "Copper Plate", count: 4 },
        { name: "Motor", count: 2 }
      ]
    }],
    recipes: ["Steel and metal recycling", "Ore crushing", "Concrete recycling", "Stone and brick crushing", "Wood processing", "Powder recycling", "Vanilla block recycling"],
    notes: ["0.0.5-B contains a large Shredder recipe catalog; the page groups it instead of showing hundreds of nearly identical rows at once."]
  },
  soldering_station: {
    description: "Electronics workstation for PCB, topping and solder recipes. Supports fluid soldering media, batteries and machine upgrades.",
    requires: ["HE power", "Matching PCB / toppings / solder ingredients", "Required soldering fluid when specified"],
    stats: [
      { label: "Base energy buffer", value: "2,000 HE" },
      { label: "Fluid tank", value: "8,000 mB" },
      { label: "Base fallback consumption", value: "100 HE/t" },
      { label: "Upgrade slots", value: "2" }
    ],
    construction: [
      { method: "HBM Anvil (Tier 2)", tier: "2", ingredients: [{name:"Cast Steel Plate",count:2},{name:"Copper Coil",count:4},{name:"Tungsten Bolt",count:4},{name:"Vacuum Tube",count:2}] },
      { method: "Assembly Machine", duration: "300 ticks / 15 s", energy: "250 HE/t", ingredients: [{name:"Steel Plate",count:2},{name:"Copper Coil",count:4},{name:"Tungsten Bolt",count:4},{name:"Vacuum Tube",count:2}] }
    ],
    notes: ["Recipe duration and HE/t are defined per recipe. Speed, Power Saving and Overdrive upgrades modify both."]
  },
  assembly_machine: {
    description: "General-purpose powered manufacturing machine for complex multi-component recipes.",
    requires: ["HE power", "Selected recipe", "All required ingredients"],
    stats: [
      { label: "Energy buffer", value: "100,000 HE" },
      { label: "Input slots", value: "12" },
      { label: "Upgrade slots", value: "2" },
      { label: "Battery slot", value: "1" }
    ],
    construction: [
      { method: "HBM Anvil (Tier 2)", tier: "2", ingredients: [{name:"Steel Ingot",count:8},{name:"Copper Plate",count:4},{name:"Motor",count:2},{name:"Vacuum Tube",count:4}] },
      { method: "Assembly Machine", duration: "200 ticks / 10 s", energy: "100 HE/t", ingredients: [{name:"Steel Ingot",count:4},{name:"Copper Plate",count:4},{name:"Motor",count:2},{name:"Analog Circuit",count:1}] }
    ],
    recipes: ["Shredder", "Assembly Machine", "Sliding Seal Door", "QE Containment Door", "Hazmat Cloth", "Metal Plates", "Fire Proximity Cloth", "Activated Carbon Filter", "Thermoelectric Element", "Magnetron", "Fluid Tank", "Chemical Plant", "Fluid Pack", "Titanium Drill", "Oil Derrick"]
  },
  chemical_plant: {
    description: "Powered chemical processing multiblock with item inputs, fluid inputs and fluid outputs.",
    requires: ["HE power", "Selected chemical recipe", "Required items and fluids"],
    stats: [
      { label: "Energy buffer", value: "100,000 HE" },
      { label: "Fluid capacity", value: "24,000 mB per stored fluid" },
      { label: "Item inputs", value: "3" },
      { label: "Upgrade slots", value: "2" }
    ],
    construction: [{
      method: "Assembly Machine",
      duration: "200 ticks / 10 s",
      energy: "100 HE/t",
      ingredients: [{name:"Steel Ingot",count:8},{name:"Copper Pipe",count:2},{name:"Insulator",count:16},{name:"Motor",count:2},{name:"Tungsten Coil",count:2},{name:"Analog Circuit",count:1}]
    }],
    recipes: ["Concrete", "Asbestos Concrete", "Liquid Concrete", "Hydrogen from Coal", "Hydrogen from Coal Coke", "Hydrogen from Lignite Coke", "Hydrogen from Petroleum Coke", "Hydrogen Peroxide", "Sulfuric Acid", "Nitric Acid", "Ethanol", "Lead-Acid Battery", "Bio Solid Fuel"],
    notes: ["Example: Sulfuric Acid uses 1 Sulfur + 1,000 mB Hydrogen Peroxide + 1,000 mB Water → 2,000 mB Sulfuric Acid in 50 ticks at 100 HE/t."]
  },
  industrial_mixer: {
    description: "Powered industrial fluid mixer with two fluid inputs, one solid input and one fluid output.",
    requires: ["HE power", "Recipe fluids", "Solid ingredient when required"],
    stats: [
      { label: "Energy buffer", value: "10,000 HE" },
      { label: "Input tank 1", value: "16,000 mB" },
      { label: "Input tank 2", value: "16,000 mB" },
      { label: "Output tank", value: "24,000 mB" },
      { label: "Base consumption", value: "50 HE/t" }
    ],
    construction: [{
      method: "Crafting Table",
      pattern: ["PIP", "GCG", "PMP"],
      ingredients: [{name:"Steel Plate",count:4},{name:"High-Speed Steel Ingot",count:1},{name:"Glass Pane",count:2},{name:"Vacuum Tube",count:1},{name:"Motor",count:1}]
    }],
    notes: ["Speed, Power Saving and Overdrive upgrades affect power use and processing speed."]
  },
  air_intake: {
    description: "Powered air handling machine that produces compressed air for compatible fluid networks and recipes.",
    requires: ["HE power", "Free fluid output capacity"],
    stats: [
      { label: "Energy buffer", value: "2,000 HE" },
      { label: "Power use", value: "100 HE/t" },
      { label: "Air capacity", value: "1,000 mB" }
    ],
    construction: [{
      method: "Crafting Table",
      pattern: ["GGG", "PMP", "PTP"],
      ingredients: [{name:"Steel Grate",count:3},{name:"Steel Plate",count:3},{name:"Motor",count:1},{name:"Steel Tank",count:1}]
    }]
  },
  arc_welder: {
    description: "Powered welding machine for welded metal plates and other heavy manufacturing recipes.",
    requires: ["HE power", "Recipe ingredients", "Required fluid when specified"],
    stats: [
      { label: "Base energy buffer", value: "2,000 HE" },
      { label: "Fluid capacity", value: "24,000 mB" },
      { label: "Upgrade slots", value: "2" }
    ],
    construction: [{
      method: "HBM Anvil (Tier 2)",
      tier: "2",
      ingredients: [{name:"Cast Steel Plate",count:4},{name:"Tungsten Ingot",count:8},{name:"10k-20Hz Transformer",count:1},{name:"Graphite Electrode",count:2}]
    }],
    notes: ["Each welding recipe defines its own duration and HE/t consumption. Upgrades modify both."]
  },
  transformer: {
    description: "Electrical infrastructure component used by higher-tier industrial machines such as the Arc Welder.",
    requires: [],
    stats: [],
    construction: [{
      method: "Crafting Table",
      pattern: ["SCS", "MDM", "SCS"],
      ingredients: [{name:"Iron Ingot",count:4},{name:"Capacitor",count:2},{name:"Copper Coil",count:2},{name:"Red Copper Ingot",count:1}]
    }]
  },
  battery_socket: {
    description: "Battery-powered HE network interface. Can input, output, do both, or disable transfer; redstone can switch between two configured modes.",
    requires: ["Compatible HBM battery"],
    stats: [
      { label: "Network search range", value: "64 blocks Manhattan" },
      { label: "Network scan limit", value: "4,096 positions" },
      { label: "Modes", value: "Input / Both / Output / None" }
    ],
    construction: [{
      method: "Crafting Table",
      pattern: ["I I", "I I", "IRI"],
      ingredients: [{name:"Insulator",count:6},{name:"Copper Coil",count:1}]
    }]
  },
  firebox: {
    description: "Fuel-fired heat source for the foundry chain.",
    requires: ["Burnable fuel"],
    stats: [{ label: "Maximum heat", value: "100,000" }, { label: "Base heat", value: "100" }],
    construction: [{ method: "HBM Anvil (Tier 2)", tier: "2", ingredients: [{name:"Furnace",count:1},{name:"Steel Plate",count:8},{name:"Copper Ingot",count:8}] }]
  },
  heating_oven: {
    description: "Higher-capacity heat machine that can pull heat from a source below it and feed the foundry chain.",
    requires: ["Heat source below, such as Firebox"],
    stats: [{ label: "Maximum heat", value: "500,000" }, { label: "Base heat", value: "500" }, { label: "Heat transfer efficiency", value: "50%" }],
    construction: [{ method: "HBM Anvil (Tier 2)", tier: "2", ingredients: [{name:"Fire Brick",count:16},{name:"Cast Steel Plate",count:4},{name:"Copper Ingot",count:8}] }]
  },
  crucible: {
    description: "Foundry crucible for melting materials, holding molten recipe/waste material and pouring into connected casting blocks.",
    requires: ["Heat", "Foundry-compatible material input"],
    stats: [
      { label: "Maximum heat", value: "100,000" },
      { label: "Processing heat", value: "20,000" },
      { label: "Pour rate", value: "3 nuggets per operation" }
    ],
    construction: [{ method: "HBM Anvil (Tier 2)", tier: "2", ingredients: [{name:"Fire Brick",count:20},{name:"Steel Plate",count:8},{name:"Copper Ingot",count:8}] }]
  },
  iron_anvil: {
    description: "Tier-based HBM construction anvil for early forging and machine construction recipes.",
    requires: ["Matching recipe inputs"],
    stats: [{ label: "Tier", value: "Iron / early recipes" }],
    construction: []
  },
  steel_anvil: {
    description: "Higher-tier HBM construction anvil for advanced forging and machine construction recipes.",
    requires: ["Matching recipe inputs"],
    stats: [{ label: "Tier", value: "Steel / Tier 2 recipes" }],
    construction: [],
    recipes: ["Assembly Machine", "Blast Furnace", "Soldering Station", "Firebox", "Heating Oven", "Crucible", "Arc Welder", "Pipes", "Molds", "Forged Plates", "Steel Anvil"]
  },
  foundry_system: {
    description: "Casting system made from the Crucible, heat sources, channels, outlets, tanks, basins and molds.",
    requires: ["Crucible", "Heat source", "Foundry channels / outlet", "Mold or basin depending on output"],
    stats: [],
    construction: []
  }
};
