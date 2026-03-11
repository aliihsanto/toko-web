const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

fal.config({
  credentials: "74db64cf-3b60-48d2-9d5f-bebaef4dd435:8b122193c530e03efc8064b73fb536a4",
});

const PUBLIC = path.join(__dirname, "..", "public", "images");

// Homepage images regenerated with nano-banana-2 for maximum quality
const IMAGES = [
  // Hero images (most visible, highest priority)
  {
    category: "hero",
    name: "trade-hero",
    prompt: "Breathtaking aerial photograph of a massive modern container port at golden hour, thousands of colorful shipping containers in perfect rows, giant cargo ships docked alongside enormous cranes, warm Mediterranean sunlight casting long shadows, crystal clear detail, hyper-realistic professional photography, cinematic ultra wide angle lens, 8k resolution, magazine cover quality",
    size: "landscape_16_9",
  },
  {
    category: "hero",
    name: "istanbul-skyline",
    prompt: "Stunning panoramic photograph of Istanbul at golden hour sunset, the iconic Bosphorus Bridge majestically connecting Europe and Asia, multiple cargo ships sailing through the glittering strait, warm golden light reflecting on calm waters, modern glass skyscrapers alongside historic Ottoman mosques and minarets silhouetted against an orange-pink sky, ultra sharp detail, professional travel photography, cinematic ultra wide angle, 8k quality",
    size: "landscape_16_9",
  },
  {
    category: "hero",
    name: "global-trade",
    prompt: "Dramatic aerial photograph of a massive modern cargo ship fully loaded with colorful shipping containers sailing through crystal clear turquoise Mediterranean waters, dramatic cumulus clouds in deep blue sky, sunlight sparkling on waves, drone perspective from 200 meters above, hyper-realistic professional maritime photography, cinematic composition, 8k resolution",
    size: "landscape_16_9",
  },
  {
    category: "hero",
    name: "warehouse",
    prompt: "Ultra modern bright logistics warehouse interior, perfectly organized high-bay shelving system with colorful packages, professional workers in smart uniforms using digital tablets for inventory management, warm natural sunlight streaming through massive floor-to-ceiling windows, polished concrete floors reflecting light, clean minimalist professional environment, commercial architecture photography, 8k hyper-realistic",
    size: "landscape_16_9",
  },
  {
    category: "hero",
    name: "handshake-deal",
    prompt: "Two confident business professionals firmly shaking hands in a stunning modern glass corner office with panoramic city skyline view, warm golden hour natural light flooding in, one wearing a perfectly tailored navy suit, sharp shallow depth of field with beautiful bokeh, professional corporate portrait photography style, 8k hyper-realistic, magazine editorial quality",
    size: "landscape_16_9",
  },
  // Services images (shown in service cards on homepage)
  {
    category: "services",
    name: "import",
    prompt: "Magnificent container ship arriving at a modern Turkish port, Istanbul skyline with mosques and bridges visible in the golden hour background, towering cargo cranes loading colorful containers, warm amber and teal tones, professional maritime photography, hyper-realistic, 8k quality, National Geographic style",
    size: "landscape_4_3",
  },
  {
    category: "services",
    name: "export",
    prompt: "Impressive overhead photograph of a well-organized export warehouse, neatly stacked pallets of packaged goods ready for international shipping, modern forklift with skilled operator, bright LED warehouse lighting, Turkish flag proudly displayed on wall, clean modern industrial facility, professional commercial photography, hyper-realistic 8k",
    size: "landscape_4_3",
  },
  {
    category: "services",
    name: "sourcing",
    prompt: "Professional female quality inspector carefully examining premium textile fabric samples in a modern bright Turkish manufacturing facility, using digital tablet for quality documentation, beautiful rolls of colorful fabric in organized shelves behind her, soft natural window light, shallow depth of field, professional industrial portrait photography, hyper-realistic 8k",
    size: "landscape_4_3",
  },
  {
    category: "services",
    name: "transit-trade",
    prompt: "Spectacular view of the busy Bosphorus strait with multiple cargo vessels and tankers passing between Europe and Asia, both Istanbul bridges visible in frame, dramatic golden hour sky with scattered clouds, the city sprawling on both shores, professional aerial maritime photography, hyper-realistic, cinematic 8k quality",
    size: "landscape_4_3",
  },
  // First 4 sectors (shown in sectors preview on homepage)
  {
    category: "sectors",
    name: "food",
    prompt: "Exquisite display of premium Turkish food products - golden olive oil in crystal bottles, dried figs and apricots, pistachios and hazelnuts in wooden bowls, vibrant saffron and paprika spices, artisan honey in glass jars - beautifully arranged on a rustic handcrafted wooden table with linen cloth, warm Rembrandt natural side lighting, professional food photography for gourmet magazine, hyper-realistic 8k",
    size: "landscape_4_3",
  },
  {
    category: "sectors",
    name: "textile",
    prompt: "Modern Turkish textile factory interior with impressive rows of vibrant colorful fabric rolls in every hue of the rainbow, state-of-the-art computerized weaving machines in smooth operation, clean bright industrial space with large skylights, professional workers in white coats monitoring production quality, professional industrial photography, hyper-realistic 8k quality",
    size: "landscape_4_3",
  },
  {
    category: "sectors",
    name: "machinery",
    prompt: "State-of-the-art CNC machining center and industrial robots in a pristine Turkish manufacturing facility, precision metal components with mirror finish, cool blue LED accent lighting contrasting with warm workshop tones, sparks from precision cutting visible, professional industrial engineering photography, hyper-realistic 8k quality",
    size: "landscape_4_3",
  },
  {
    category: "sectors",
    name: "chemicals",
    prompt: "Gleaming modern chemical processing plant interior with polished stainless steel reactors, pipes and valves, visible quality control laboratory area with scientist in white coat examining samples, safety equipment and gauges prominently displayed, clean bright professional environment with subtle blue lighting, professional industrial photography, hyper-realistic 8k",
    size: "landscape_4_3",
  },
];

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
        file.on("finish", () => file.close(resolve));
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function generateImage(item) {
  const dir = path.join(PUBLIC, item.category);
  const filePath = path.join(dir, `${item.name}.jpg`);

  // Always overwrite for HQ regeneration
  console.log(`  GEN  ${item.category}/${item.name} (nano-banana-2)...`);

  try {
    const result = await fal.subscribe("fal-ai/nano-banana-2", {
      input: {
        prompt: item.prompt,
        image_size: item.size || "landscape_4_3",
        num_images: 1,
        safety_tolerance: "5",
      },
    });

    const imageUrl = result.data.images[0].url;
    await downloadFile(imageUrl, filePath);

    const stats = fs.statSync(filePath);
    console.log(`  OK   ${item.category}/${item.name}.jpg (${(stats.size / 1024).toFixed(0)} KB)`);
    return filePath;
  } catch (err) {
    console.error(`  FAIL ${item.category}/${item.name}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`\n=== HOMEPAGE HQ IMAGE GENERATION (nano-banana-2) ===`);
  console.log(`Total: ${IMAGES.length} images\n`);

  // Run 2 at a time for quality model (may be slower)
  for (let i = 0; i < IMAGES.length; i += 2) {
    const batch = IMAGES.slice(i, i + 2);
    await Promise.all(batch.map((item) => generateImage(item)));
  }

  console.log("\n=== DONE ===");
}

main().catch(console.error);
