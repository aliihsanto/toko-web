const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

fal.config({
  credentials: "74db64cf-3b60-48d2-9d5f-bebaef4dd435:8b122193c530e03efc8064b73fb536a4",
});

const COUNTRIES_DIR = path.join(__dirname, "..", "public", "images", "countries");

const MISSING_COUNTRIES = [
  {
    name: "iraq",
    prompt: "Panoramic view of Baghdad cityscape with modern buildings and the Tigris river, warm golden hour lighting, professional architectural photography, cinematic photorealistic",
  },
  {
    name: "israel",
    prompt: "Tel Aviv modern skyline with Mediterranean sea coastline, vibrant urban business district, professional travel photography, cinematic photorealistic",
  },
  {
    name: "romania",
    prompt: "Bucharest Palace of Parliament and modern business district panorama, European architecture, professional travel photography, cinematic photorealistic",
  },
  {
    name: "bulgaria",
    prompt: "Sofia city panorama with Alexander Nevsky Cathedral and Vitosha mountain backdrop, European urban landscape, professional travel photography, cinematic photorealistic",
  },
  {
    name: "poland",
    prompt: "Warsaw modern business district skyline with historic old town, European capital city, professional architectural photography, cinematic photorealistic",
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

async function generateImage(item) {
  const filePath = path.join(COUNTRIES_DIR, `${item.name}.jpg`);

  if (fs.existsSync(filePath)) {
    console.log(`  SKIP ${item.name}.jpg (already exists)`);
    return filePath;
  }

  console.log(`  GEN  ${item.name}...`);

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
    await downloadFile(imageUrl, filePath);
    const stats = fs.statSync(filePath);
    console.log(`  OK   ${item.name}.jpg (${(stats.size / 1024).toFixed(0)} KB)`);
    return filePath;
  } catch (err) {
    console.error(`  FAIL ${item.name}: ${err.message}`);
    return null;
  }
}

async function main() {
  // Ensure directory exists
  if (!fs.existsSync(COUNTRIES_DIR)) {
    fs.mkdirSync(COUNTRIES_DIR, { recursive: true });
  }

  console.log(`=== Generating 5 missing country images ===`);
  console.log(`Output: ${COUNTRIES_DIR}\n`);

  // Generate 2 at a time to avoid rate limits
  for (let i = 0; i < MISSING_COUNTRIES.length; i += 2) {
    const batch = MISSING_COUNTRIES.slice(i, i + 2);
    await Promise.all(batch.map((item) => generateImage(item)));
  }

  console.log("\n=== DONE ===");

  // Verify
  const expected = MISSING_COUNTRIES.map((c) => `${c.name}.jpg`);
  const existing = expected.filter((f) => fs.existsSync(path.join(COUNTRIES_DIR, f)));
  console.log(`\nVerification: ${existing.length}/${expected.length} images created`);
  existing.forEach((f) => console.log(`  ✓ ${f}`));
  const missing = expected.filter((f) => !fs.existsSync(path.join(COUNTRIES_DIR, f)));
  if (missing.length > 0) {
    missing.forEach((f) => console.log(`  ✗ ${f} MISSING`));
  }
}

main().catch(console.error);
