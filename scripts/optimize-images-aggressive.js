const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Optimize book images
async function optimizeBookImages() {
  const booksDir = path.join(__dirname, '../public/images/books');
  const files = fs.readdirSync(booksDir).filter(f => f.endsWith('.jpg'));

  console.log(`Optimizing ${files.length} book images...`);

  for (const file of files) {
    const inputPath = path.join(booksDir, file);
    const webpPath = path.join(booksDir, file.replace('.jpg', '.webp'));

    try {
      // Get image info
      const metadata = await sharp(inputPath).metadata();
      const originalSize = fs.statSync(inputPath).size;

      // Optimize with better quality settings
      await sharp(inputPath)
        .resize(300, 450, { // Standard book cover dimensions
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({
          quality: 75, // Good balance of quality and size
          effort: 6, // Higher compression effort
          smartSubsample: true
        })
        .toFile(webpPath);

      const newSize = fs.statSync(webpPath).size;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✓ ${file}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }
}

// Optimize promo images
async function optimizePromoImages() {
  const promoFiles = [
    'promo-1.png',
    'promo-2.png',
    'promo-3.png',
    'promo-4.png'
  ];

  console.log('\nOptimizing promo images...');

  for (const file of promoFiles) {
    const inputPath = path.join(__dirname, `../public/${file}`);
    const webpPath = path.join(__dirname, `../public/${file.replace('.png', '.webp')}`);

    if (!fs.existsSync(inputPath)) {
      console.log(`✗ ${file} not found, skipping...`);
      continue;
    }

    try {
      const originalSize = fs.statSync(inputPath).size;

      // Optimize promo images with aggressive compression
      await sharp(inputPath)
        .resize(800, 800, { // Square promo images
          fit: 'cover',
          withoutEnlargement: true
        })
        .webp({
          quality: 70, // Lower quality for promo images
          effort: 6,
          smartSubsample: true
        })
        .toFile(webpPath);

      const newSize = fs.statSync(webpPath).size;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✓ ${file}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }
}

// Optimize logo and favicon
async function optimizeBrandImages() {
  console.log('\nOptimizing brand images...');

  const brandFiles = [
    { input: 'logo.png', output: 'logo.webp' },
    { input: 'SFH-Favicon-.png', output: 'SFH-Favicon-.webp' }
  ];

  for (const { input, output } of brandFiles) {
    const inputPath = path.join(__dirname, `../public/${input}`);
    const outputPath = path.join(__dirname, `../public/${output}`);

    if (!fs.existsSync(inputPath)) {
      console.log(`✗ ${input} not found, skipping...`);
      continue;
    }

    try {
      const originalSize = fs.statSync(inputPath).size;

      await sharp(inputPath)
        .webp({
          quality: 80,
          effort: 6
        })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✓ ${input}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`✗ Error processing ${input}:`, error.message);
    }
  }
}

// Run all optimizations
async function main() {
  console.log('🚀 Starting image optimization...\n');

  await optimizeBookImages();
  await optimizePromoImages();
  await optimizeBrandImages();

  console.log('\n✨ Image optimization complete!');
}

main().catch(console.error);