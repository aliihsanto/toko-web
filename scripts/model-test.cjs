const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

fal.config({
  credentials: "74db64cf-3b60-48d2-9d5f-bebaef4dd435:8b122193c530e03efc8064b73fb536a4",
});

const OUT = path.join(__dirname, "..", "public", "images", "_model-test");
fs.mkdirSync(OUT, { recursive: true });

const TEST_PROMPT = "Aerial view of a massive modern container port at golden hour, colorful shipping containers stacked high, cargo ships docked, cranes working, warm Mediterranean sunlight, photorealistic, cinematic wide angle, 8k quality";

const MODELS = [
  {
    id: "fal-ai/flux/schnell",
    name: "flux-schnell",
    input: { prompt: TEST_PROMPT, image_size: "landscape_16_9", num_inference_steps: 4, num_images: 1 },
  },
  {
    id: "fal-ai/flux/dev",
    name: "flux-dev",
    input: { prompt: TEST_PROMPT, image_size: "landscape_16_9", num_inference_steps: 28, num_images: 1, guidance_scale: 3.5 },
  },
  {
    id: "fal-ai/flux-pro/v1.1",
    name: "flux-pro-v1.1",
    input: { prompt: TEST_PROMPT, image_size: "landscape_16_9", num_images: 1, safety_tolerance: "5" },
  },
  {
    id: "fal-ai/recraft-v3",
    name: "recraft-v3",
    input: { prompt: TEST_PROMPT, image_size: "1820x1024", style: "realistic_image", num_images: 1 },
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

async function testModel(model) {
  const filePath = path.join(OUT, `${model.name}.jpg`);
  if (fs.existsSync(filePath)) {
    console.log(`SKIP ${model.name} (exists)`);
    return;
  }

  console.log(`Testing ${model.name} (${model.id})...`);
  const start = Date.now();

  try {
    const result = await fal.subscribe(model.id, { input: model.input });
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    const imageUrl = result.data.images[0].url;

    await downloadFile(imageUrl, filePath);
    const size = (fs.statSync(filePath).size / 1024).toFixed(0);
    console.log(`  OK ${model.name} — ${elapsed}s, ${size}KB`);
  } catch (err) {
    console.log(`  FAIL ${model.name}: ${err.message}`);
  }
}

async function main() {
  console.log("Model Quality Test — same prompt across 4 models\n");
  console.log(`Prompt: "${TEST_PROMPT.substring(0, 80)}..."\n`);

  for (const model of MODELS) {
    await testModel(model);
  }

  console.log(`\nTest images saved to: ${OUT}`);
  console.log("Open them to compare quality, then choose the best model.");
}

main().catch(console.error);
