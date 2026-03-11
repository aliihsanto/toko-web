const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

fal.config({
  credentials: "74db64cf-3b60-48d2-9d5f-bebaef4dd435:8b122193c530e03efc8064b73fb536a4",
});

const PUBLIC = path.join(__dirname, "..", "public", "images");

// Image definitions grouped by category
const IMAGES = {
  hero: [
    { name: "trade-hero", prompt: "Aerial view of a massive modern container port at golden hour, colorful shipping containers stacked high, cargo ships docked, cranes working, warm Mediterranean sunlight, photorealistic, cinematic wide angle, 8k quality", size: "landscape_16_9" },
    { name: "istanbul-skyline", prompt: "Stunning panoramic view of Istanbul at sunset, Bosphorus bridge connecting Europe and Asia, cargo ships passing through the strait, golden light reflecting on water, modern cityscape with historic mosques silhouetted, photorealistic, ultra wide angle", size: "landscape_16_9" },
    { name: "global-trade", prompt: "Modern cargo ship loaded with colorful containers sailing through turquoise Mediterranean waters, dramatic clouds, aerial drone perspective, photorealistic, cinematic", size: "landscape_16_9" },
    { name: "warehouse", prompt: "Modern bright warehouse interior with organized shelving, workers with tablets checking inventory, natural light streaming through large windows, clean professional environment, photorealistic", size: "landscape_16_9" },
    { name: "handshake-deal", prompt: "Two business professionals shaking hands in modern glass office overlooking city, warm natural light, diverse businesspeople, professional attire, shallow depth of field, photorealistic", size: "landscape_16_9" },
  ],
  services: [
    { name: "import", prompt: "Container ship arriving at a modern Turkish port with Istanbul skyline in background, golden hour lighting, cargo cranes, colorful containers, photorealistic, warm tones", size: "landscape_4_3" },
    { name: "export", prompt: "Overhead view of organized export warehouse with packaged goods ready for shipping, forklift operating, Turkish flags visible, bright clean facility, photorealistic", size: "landscape_4_3" },
    { name: "sourcing", prompt: "Professional quality inspector examining textile fabric samples in a bright modern Turkish factory, taking notes on tablet, rolls of colorful fabric in background, photorealistic", size: "landscape_4_3" },
    { name: "transit-trade", prompt: "Busy Bosphorus strait with cargo vessels passing between continents, Istanbul bridges visible, dramatic sky, representing transit trade between Europe and Asia, photorealistic", size: "landscape_4_3" },
  ],
  sectors: [
    { name: "food", prompt: "Beautiful display of premium Turkish food products - olive oil, dried fruits, nuts, spices, honey in glass jars, arranged on rustic wooden table, warm natural lighting, commercial food photography style", size: "landscape_4_3" },
    { name: "textile", prompt: "Modern Turkish textile factory interior, rows of colorful fabric rolls, weaving machines in operation, clean bright industrial space, workers monitoring quality, photorealistic", size: "landscape_4_3" },
    { name: "machinery", prompt: "Modern industrial machinery and CNC equipment in clean Turkish manufacturing facility, precision engineering, metallic surfaces, blue accent lighting, photorealistic", size: "landscape_4_3" },
    { name: "chemicals", prompt: "Clean modern chemical processing plant with stainless steel tanks and pipes, laboratory quality control area visible, safety equipment, bright professional environment, photorealistic", size: "landscape_4_3" },
    { name: "construction", prompt: "Modern construction materials - steel beams, marble slabs, ceramic tiles, glass panels artfully arranged in bright showroom, Turkish construction industry, photorealistic", size: "landscape_4_3" },
    { name: "raw-materials", prompt: "Natural raw materials - copper ore, iron ingots, marble blocks, wood planks arranged on industrial surface, warm lighting highlighting textures, photorealistic", size: "landscape_4_3" },
    { name: "electronics", prompt: "Modern electronics assembly line in clean Turkish factory, circuit boards, components, workers with precision tools, bright LED lighting, high-tech atmosphere, photorealistic", size: "landscape_4_3" },
    { name: "automotive", prompt: "Turkish automotive parts manufacturing - precision engine components, brake systems, chrome parts displayed on clean surface, professional industrial photography, photorealistic", size: "landscape_4_3" },
  ],
  countries: [
    { name: "germany", prompt: "Hamburg port aerial view with container terminals, Elbe river, modern German cityscape, clear day, photorealistic, warm tones" },
    { name: "uk", prompt: "London Tower Bridge with cargo ship passing through, Thames river, modern London skyline background, golden hour, photorealistic" },
    { name: "usa", prompt: "Port of Los Angeles aerial view, massive container terminal, American flag visible, Pacific ocean, clear blue sky, photorealistic" },
    { name: "canada", prompt: "Vancouver port with mountains in background, container ships, modern Canadian cityscape, natural beauty, photorealistic" },
    { name: "mexico", prompt: "Colorful Mexican port city with modern container terminal, traditional architecture visible, warm tropical lighting, photorealistic" },
    { name: "brazil", prompt: "Santos port in Brazil, largest Latin American port, containers and cargo ships, tropical vegetation, warm sunlight, photorealistic" },
    { name: "japan", prompt: "Yokohama port with Mount Fuji visible in background, modern container terminal, cherry blossoms in foreground, photorealistic" },
    { name: "south-korea", prompt: "Busan port aerial view, modern Korean cityscape, container terminal, bridges, blue ocean, photorealistic" },
    { name: "china", prompt: "Shanghai port panoramic view, modern skyline with Oriental Pearl Tower, massive container operations, golden hour, photorealistic" },
    { name: "india", prompt: "Mumbai port with Gateway of India visible, cargo ships, Indian Ocean, warm tropical light, modern cityscape, photorealistic" },
    { name: "uae", prompt: "Dubai Jebel Ali port aerial view, modern futuristic cityscape, luxury and trade, desert meeting ocean, golden hour, photorealistic" },
    { name: "saudi-arabia", prompt: "Jeddah Islamic Port modern terminal, Red Sea, Saudi Arabian architecture blend, warm desert light, photorealistic" },
    { name: "russia", prompt: "Saint Petersburg port on Baltic Sea, historic Russian architecture, cargo operations, winter light, photorealistic" },
    { name: "france", prompt: "Marseille port with Mediterranean Sea, French coastal architecture, colorful boats and containers, Provencal light, photorealistic" },
    { name: "italy", prompt: "Genoa port, Italian Riviera coastline, colorful buildings, container terminal, Mediterranean blue water, photorealistic" },
    { name: "spain", prompt: "Barcelona port with modern cityscape, Mediterranean Sea, Sagrada Familia silhouette in background, warm Spanish light, photorealistic" },
    { name: "netherlands", prompt: "Rotterdam port aerial view, largest European port, modern Dutch infrastructure, flat landscape, organized containers, photorealistic" },
    { name: "egypt", prompt: "Suez Canal aerial view with cargo ships passing, Egyptian desert landscape, strategic waterway, warm golden light, photorealistic" },
    { name: "australia", prompt: "Sydney port with Opera House and Harbour Bridge visible, container terminal, blue Pacific waters, clear sky, photorealistic" },
    { name: "singapore", prompt: "Singapore port, busiest transshipment hub, futuristic Marina Bay skyline, cargo ships, tropical evening light, photorealistic" },
  ],
  blog: [
    { name: "turkey-export-guide", prompt: "Professional Turkish business meeting about export strategy, modern office with Istanbul view, charts and documents on table, diverse team, photorealistic" },
    { name: "customs-procedures", prompt: "Customs inspection area at modern Turkish border crossing, officers checking cargo documents, organized and professional, photorealistic" },
    { name: "textile-industry", prompt: "Vibrant Turkish textile bazaar meeting modern fashion industry, colorful fabrics, traditional patterns alongside contemporary designs, warm lighting, photorealistic" },
    { name: "food-export", prompt: "Premium Turkish food products - baklava, Turkish delight, olive oil, tea, spices - beautifully arranged for export catalog, professional food photography" },
    { name: "logistics-supply-chain", prompt: "Modern logistics control center with large screens showing global supply chain maps, professionals monitoring shipments, high-tech environment, photorealistic" },
    { name: "trade-agreement", prompt: "International trade agreement signing ceremony, Turkish and global flags, professional conference room, diplomatic setting, photorealistic" },
    { name: "quality-control", prompt: "Quality control laboratory in Turkish manufacturing facility, scientist examining product samples, modern equipment, clean bright lab, photorealistic" },
    { name: "e-commerce-trade", prompt: "Modern e-commerce warehouse for international trade, automated sorting systems, packages with global destination labels, efficient bright space, photorealistic" },
  ],
};

async function generateImage(category, item) {
  const dir = path.join(PUBLIC, category);
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
        image_size: item.size || "landscape_4_3",
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

async function generateCategory(category) {
  const items = IMAGES[category];
  console.log(`\n=== ${category.toUpperCase()} (${items.length} images) ===`);

  // Run 3 at a time to avoid rate limits
  for (let i = 0; i < items.length; i += 3) {
    const batch = items.slice(i, i + 3);
    await Promise.all(batch.map((item) => generateImage(category, item)));
  }
}

async function main() {
  const categories = process.argv[2] ? [process.argv[2]] : Object.keys(IMAGES);

  console.log(`Generating images for: ${categories.join(", ")}`);
  console.log(`Total: ${categories.reduce((sum, cat) => sum + IMAGES[cat].length, 0)} images\n`);

  for (const cat of categories) {
    await generateCategory(cat);
  }

  console.log("\n=== DONE ===");
}

main().catch(console.error);
