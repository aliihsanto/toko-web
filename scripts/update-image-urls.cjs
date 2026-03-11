const fs = require("fs");
const path = require("path");

// ===================== UPDATE PRODUCTS.TS =====================
const productsPath = path.join(__dirname, "..", "src", "data", "pseo", "products.ts");
let productsContent = fs.readFileSync(productsPath, "utf8");

// Pattern: slug: "food-grains", ... image: "https://images.unsplash.com/..."
// The slug and image fields are on different lines, with sectorSlug in between
const productsBefore = productsContent;
productsContent = productsContent.replace(
  /slug: "([^"]+)",\s*\n(\s*sectorSlug: "[^"]+",)\s*\n(\s*)image: "https:\/\/images\.unsplash\.com[^"]*"/g,
  (match, slug, sectorLine, indent) => {
    return `slug: "${slug}",\n${sectorLine}\n${indent}image: "/images/products/${slug}.jpg"`;
  }
);

const productsChanged = productsContent !== productsBefore;
if (productsChanged) {
  fs.writeFileSync(productsPath, productsContent, "utf8");
  // Count how many replacements
  const countBefore = (productsBefore.match(/images\.unsplash\.com/g) || []).length;
  const countAfter = (productsContent.match(/images\.unsplash\.com/g) || []).length;
  console.log(`products.ts: Replaced ${countBefore - countAfter} Unsplash URLs (${countAfter} remaining)`);
} else {
  console.log("products.ts: No changes made (pattern may not match)");
  // Try alternate approach - replace any unsplash URL on image: lines, extracting slug from context
  console.log("Trying alternate approach...");

  // Split into product blocks and replace
  const blocks = productsContent.split(/(?=\{\s*\n\s*slug:)/);
  let replacements = 0;
  const updatedBlocks = blocks.map(block => {
    const slugMatch = block.match(/slug:\s*"([^"]+)"/);
    if (slugMatch) {
      const slug = slugMatch[1];
      const newBlock = block.replace(
        /image:\s*"https:\/\/images\.unsplash\.com[^"]*"/,
        `image: "/images/products/${slug}.jpg"`
      );
      if (newBlock !== block) replacements++;
      return newBlock;
    }
    return block;
  });

  if (replacements > 0) {
    productsContent = updatedBlocks.join("");
    fs.writeFileSync(productsPath, productsContent, "utf8");
    console.log(`products.ts: Replaced ${replacements} Unsplash URLs (alternate approach)`);
  } else {
    console.log("products.ts: Still no changes. Check file format manually.");
  }
}

// ===================== UPDATE CUSTOMS.TS =====================
const customsPath = path.join(__dirname, "..", "src", "data", "pseo", "customs.ts");
let customsContent = fs.readFileSync(customsPath, "utf8");

const customsBefore = customsContent;

// customs.ts uses JSON-style "slug": "value" with quotes around keys
customsContent = customsContent.replace(
  /"slug":\s*"([^"]+)"([\s\S]*?)"image":\s*"https:\/\/images\.unsplash\.com[^"]*"/g,
  (match, slug, between) => {
    return `"slug": "${slug}"${between}"image": "/images/customs/${slug}.jpg"`;
  }
);

const customsChanged = customsContent !== customsBefore;
if (customsChanged) {
  fs.writeFileSync(customsPath, customsContent, "utf8");
  const countBefore = (customsBefore.match(/images\.unsplash\.com/g) || []).length;
  const countAfter = (customsContent.match(/images\.unsplash\.com/g) || []).length;
  console.log(`customs.ts: Replaced ${countBefore - countAfter} Unsplash URLs (${countAfter} remaining)`);
} else {
  console.log("customs.ts: No changes made");
}

// Final verification
const finalProducts = fs.readFileSync(productsPath, "utf8");
const finalCustoms = fs.readFileSync(customsPath, "utf8");
const remainingProducts = (finalProducts.match(/images\.unsplash\.com/g) || []).length;
const remainingCustoms = (finalCustoms.match(/images\.unsplash\.com/g) || []).length;
const localProducts = (finalProducts.match(/\/images\/products\//g) || []).length;
const localCustoms = (finalCustoms.match(/\/images\/customs\//g) || []).length;

console.log("\n=== VERIFICATION ===");
console.log(`products.ts: ${localProducts} local image refs, ${remainingProducts} Unsplash refs remaining`);
console.log(`customs.ts: ${localCustoms} local image refs, ${remainingCustoms} Unsplash refs remaining`);
