const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

fal.config({
  credentials: "74db64cf-3b60-48d2-9d5f-bebaef4dd435:8b122193c530e03efc8064b73fb536a4",
});

const PUBLIC = path.join(__dirname, "..", "public", "images");

// ===================== PRODUCT IMAGES =====================
const PRODUCTS = [
  // FOOD sector
  { name: "food-grains", prompt: "Golden wheat grain harvest in professional agricultural trade setting, Turkish grain export quality, large wheat field with harvesting equipment, warm Mediterranean sunlight, photorealistic, cinematic" },
  { name: "food-dairy", prompt: "Premium Turkish dairy products artfully arranged - white cheese, yogurt, butter, milk bottles on marble surface, fresh and appetizing, professional food photography, bright natural lighting" },
  { name: "food-canned-goods", prompt: "High-quality Turkish canned food products - tomato paste, olives, pickles, fruit preserves neatly arranged on wooden shelf, commercial product photography, warm studio lighting, photorealistic" },
  { name: "food-spices", prompt: "Vibrant Turkish spice bazaar display - colorful mounds of paprika, cumin, sumac, saffron, oregano in traditional copper bowls, aromatic market atmosphere, warm golden lighting, photorealistic" },

  // TEXTILE sector
  { name: "textile-fabrics", prompt: "Rolls of premium Turkish textile fabrics in rich colors - silk, cotton, linen on industrial shelves in modern Turkish textile factory, bright clean environment, photorealistic" },
  { name: "textile-ready-to-wear", prompt: "Modern Turkish ready-to-wear fashion production line, stylish garments on hangers, quality inspection station, bright contemporary factory floor, photorealistic" },
  { name: "textile-home-textiles", prompt: "Luxurious Turkish home textiles display - towels, bed linens, decorative pillows in elegant showroom, Denizli quality cotton, soft natural lighting, photorealistic" },
  { name: "textile-industrial", prompt: "Industrial textile manufacturing facility in Turkey, heavy-duty fabric rolls, technical textiles production, automotive and construction grade materials, modern machinery, photorealistic" },

  // MACHINERY sector
  { name: "machinery-industrial", prompt: "Modern Turkish industrial machinery manufacturing facility, CNC machines, metal fabrication equipment, precision engineering floor, blue accent lighting, clean professional environment, photorealistic" },
  { name: "machinery-agricultural", prompt: "Turkish agricultural machinery - modern tractors, harvesters, plowing equipment displayed in large showroom, green and red machines, bright daylight, photorealistic" },
  { name: "machinery-spare-parts", prompt: "Organized warehouse of industrial spare parts - gears, bearings, hydraulic components, precision metal parts on shelving, Turkish manufacturing quality, photorealistic" },
  { name: "machinery-automation", prompt: "Advanced Turkish automation and robotics manufacturing facility, robotic arms on assembly line, digital control panels, futuristic industrial environment, photorealistic" },

  // CHEMICALS sector
  { name: "chemicals-industrial", prompt: "Modern Turkish chemical processing plant interior, stainless steel reactors and pipes, laboratory quality control area, workers in safety equipment, clean bright professional environment, photorealistic" },
  { name: "chemicals-petrochemicals", prompt: "Large-scale Turkish petrochemical refinery at twilight, illuminated towers and pipelines, industrial complex, dramatic sky, professional industrial photography, photorealistic" },
  { name: "chemicals-pharmaceuticals", prompt: "Clean Turkish pharmaceutical manufacturing facility, sterile production line, medicine packaging, lab technicians in white coats, modern GMP-compliant facility, photorealistic" },
  { name: "chemicals-fertilizers", prompt: "Turkish fertilizer production plant, granular fertilizer on conveyor belt, large storage silos, agricultural supply chain, bright industrial setting, photorealistic" },

  // CONSTRUCTION sector
  { name: "construction-building-materials", prompt: "Turkish building materials showroom - marble slabs, ceramic tiles, natural stone samples, glass panels artfully displayed, modern architectural materials, bright professional showroom, photorealistic" },
  { name: "construction-steel", prompt: "Turkish steel manufacturing facility, red-hot steel beams on rolling mill, sparks flying, heavy industry production, dramatic industrial lighting, photorealistic" },
  { name: "construction-cement", prompt: "Modern Turkish cement production facility, large rotating kilns, conveyor systems, cement bags stacked for export, industrial scale operations, photorealistic" },
  { name: "construction-plumbing", prompt: "Premium Turkish plumbing fixtures and fittings display - chrome faucets, copper pipes, brass valves, modern bathroom fixtures in elegant showroom, photorealistic" },

  // RAW MATERIALS sector
  { name: "raw-metals", prompt: "Turkish metal processing facility - copper ingots, aluminum sheets, steel coils stacked in industrial warehouse, metallic surfaces gleaming under bright lights, photorealistic" },
  { name: "raw-minerals", prompt: "Turkish mineral mining and processing - boron, marble blocks, chromite ore, natural mineral deposits, geological richness of Anatolia, warm natural lighting, photorealistic" },
  { name: "raw-timber", prompt: "Premium Turkish timber and wood products - stacked lumber, oak and pine planks, wood processing facility, sawmill operations, warm golden lighting on natural wood textures, photorealistic" },
  { name: "raw-polymers", prompt: "Modern Turkish polymer and plastics manufacturing, colorful plastic granules, extrusion machinery, polymer pellets in industrial containers, clean production facility, photorealistic" },

  // ELECTRONICS sector
  { name: "electronics-components", prompt: "Turkish electronics components manufacturing - circuit boards, semiconductors, resistors, capacitors on assembly line, precision electronics production, bright clean room environment, photorealistic" },
  { name: "electronics-consumer", prompt: "Turkish consumer electronics assembly line - LED TVs, smart home devices, appliances on modern production conveyor, quality testing stations, bright factory floor, photorealistic" },
  { name: "electronics-cables", prompt: "Turkish cable and wire manufacturing facility - copper wire drawing machines, cable spools in various colors, organized industrial production line, photorealistic" },
  { name: "electronics-lighting", prompt: "Modern Turkish LED lighting manufacturing and showroom - contemporary light fixtures, industrial luminaires, decorative lighting display, warm and cool light demonstrations, photorealistic" },

  // AUTOMOTIVE sector
  { name: "auto-parts", prompt: "Turkish automotive parts manufacturing - precision engine components, brake discs, suspension parts, chrome exhaust systems displayed on clean surface, professional industrial photography, photorealistic" },
  { name: "auto-tires", prompt: "Turkish tire manufacturing facility - rows of new tires on production line, rubber compound mixing, quality control inspection, industrial scale tire production, photorealistic" },
  { name: "auto-accessories", prompt: "Premium Turkish automotive accessories display - alloy wheels, leather seat covers, car audio systems, LED headlights in modern showroom, professional product photography, photorealistic" },
  { name: "auto-commercial-vehicles", prompt: "Turkish commercial vehicle manufacturing plant - buses, trucks, trailers on assembly line, large-scale automotive production facility, professional industrial setting, photorealistic" },
];

// ===================== CUSTOMS IMAGES =====================
const CUSTOMS = [
  { name: "customs-eu", prompt: "European Union customs clearance at modern port facility, EU flag visible, professional customs officers inspecting cargo documents, organized container terminal, official regulatory setting, photorealistic" },
  { name: "customs-russia-cis", prompt: "Russian and CIS customs border crossing facility, cargo trucks lined up, customs documentation processing, Eurasian trade corridor, professional border control setting, winter light, photorealistic" },
  { name: "customs-middle-east", prompt: "Middle Eastern customs and trade port facility, modern cargo terminal in Dubai or Saudi Arabia, customs inspection area, desert architecture meeting modern logistics, warm golden light, photorealistic" },
  { name: "customs-north-africa", prompt: "North African port customs facility, Mediterranean cargo terminal, Egyptian or Moroccan trade infrastructure, customs documentation and inspection area, warm sunlight, photorealistic" },
  { name: "customs-east-asia", prompt: "East Asian modern customs facility at major port, Chinese or Japanese cargo terminal, high-tech customs scanning equipment, efficient automated customs processing, photorealistic" },
  { name: "customs-south-america", prompt: "South American port customs facility, Brazilian or Argentine cargo terminal, tropical port setting, customs inspection and documentation area, colorful containers, warm light, photorealistic" },
  { name: "customs-north-america", prompt: "North American customs and border protection facility, US or Canadian port terminal, advanced scanning technology, professional customs officers, modern organized facility, photorealistic" },
  { name: "customs-southeast-asia", prompt: "Southeast Asian customs port facility, Singapore or Thai cargo terminal, tropical port setting with modern infrastructure, customs clearance processing, warm tropical light, photorealistic" },
  { name: "customs-food-safety", prompt: "Food safety customs inspection laboratory, inspector examining food product samples, temperature-controlled facility, health certificates and documentation, sterile professional environment, photorealistic" },
  { name: "customs-textile-regulations", prompt: "Textile customs compliance inspection, fabric samples being tested for quality standards, CE marking documentation, regulatory compliance laboratory, professional testing environment, photorealistic" },
  { name: "customs-chemicals-reach", prompt: "Chemical safety customs inspection, REACH compliance documentation, hazardous materials handling area, safety data sheets, chemical testing laboratory with professional equipment, photorealistic" },
  { name: "customs-machinery-standards", prompt: "Machinery standards customs inspection, CE certification checking of industrial equipment, technical documentation review, engineering compliance testing facility, photorealistic" },
  { name: "customs-dangerous-goods", prompt: "Dangerous goods customs handling facility, hazmat-trained officers inspecting sealed containers, IMDG code documentation, specialized safety equipment, professional hazardous cargo area, photorealistic" },
  { name: "customs-organic-certification", prompt: "Organic product customs certification process, organic food inspection and labeling, green certification stamps and documents, natural products testing, bright clean laboratory, photorealistic" },
  { name: "customs-halal-certification", prompt: "Halal certification customs inspection process, halal documentation and stamps, food product compliance testing, Islamic trade certification office, professional and respectful setting, photorealistic" },
];

async function generateImage(category, item) {
  const dir = path.join(PUBLIC, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, `${item.name}.jpg`);

  if (fs.existsSync(filePath)) {
    console.log(`  SKIP ${category}/${item.name}.jpg (exists)`);
    return filePath;
  }

  console.log(`  GEN  ${category}/${item.name}...`);

  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt: item.prompt,
        image_size: "landscape_16_9",
        num_images: 1,
        safety_tolerance: "5",
      },
    });

    const imageUrl = result.data.images[0].url;

    // Download the image
    await downloadFile(imageUrl, filePath);
    console.log(`  OK   ${category}/${item.name}.jpg`);
    return filePath;
  } catch (err) {
    console.error(`  FAIL ${category}/${item.name}: ${err.message}`);
    return null;
  }
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          downloadFile(response.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function generateBatch(category, items) {
  console.log(`\n=== ${category.toUpperCase()} (${items.length} images) ===`);

  // Run 3 at a time to avoid rate limits
  for (let i = 0; i < items.length; i += 3) {
    const batch = items.slice(i, i + 3);
    await Promise.all(batch.map((item) => generateImage(category, item)));
  }
}

async function main() {
  const arg = process.argv[2]; // "products", "customs", or empty for both

  const tasks = [];
  if (!arg || arg === "products") tasks.push({ category: "products", items: PRODUCTS });
  if (!arg || arg === "customs") tasks.push({ category: "customs", items: CUSTOMS });

  const total = tasks.reduce((sum, t) => sum + t.items.length, 0);
  console.log(`Generating images for: ${tasks.map(t => t.category).join(", ")}`);
  console.log(`Total: ${total} images\n`);

  for (const task of tasks) {
    await generateBatch(task.category, task.items);
  }

  console.log("\n=== DONE ===");
}

main().catch(console.error);
