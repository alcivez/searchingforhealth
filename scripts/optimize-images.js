const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// Get all image files in directory recursively
function getImageFiles(dir) {
  const files = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getImageFiles(fullPath));
    } else if (IMAGE_EXTENSIONS.includes(path.extname(item).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

// Optimize a single image
async function optimizeImage(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase();
    const stats = fs.statSync(imagePath);
    const originalSize = stats.size;

    // Skip already optimized images or very small files
    if (originalSize < 1024) {
      console.log(`⏭️  Skipping (too small): ${path.relative(PUBLIC_DIR, imagePath)}`);
      return;
    }

    // Read the image
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // Determine output format
    let outputFormat = ext;
    let quality = 80;

    // Convert PNG to WebP for better compression
    if (ext === '.png') {
      outputFormat = '.webp';
      quality = 85;
    }
    // Convert JPEG to WebP for better compression
    else if (ext === '.jpg' || ext === '.jpeg') {
      outputFormat = '.webp';
      quality = 85;
    }

    // Create output path
    const outputPath = imagePath.replace(ext, outputFormat);

    // Optimize the image
    let pipeline = image;

    // Resize if too large (max 1920px width)
    if (metadata.width > 1920) {
      pipeline = pipeline.resize(1920, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Apply format-specific optimizations
    if (outputFormat === '.webp') {
      pipeline = pipeline.webp({ quality, effort: 6 });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality, compressionLevel: 9 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality, progressive: true });
    }

    // Save optimized image
    await pipeline.toFile(outputPath);

    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`✅ Optimized: ${path.relative(PUBLIC_DIR, imagePath)}`);
    console.log(`   ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings}% reduction)`);

    // If we created a WebP version, we might want to keep the original
    // or replace it. For now, we'll keep both and let the developer decide.

  } catch (error) {
    console.error(`❌ Error optimizing ${imagePath}:`, error.message);
  }
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('IMAGE OPTIMIZATION WITH SHARP');
  console.log('='.repeat(60));
  console.log(`Scanning: ${PUBLIC_DIR}`);
  console.log('='.repeat(60));

  // Get all image files
  const imageFiles = getImageFiles(PUBLIC_DIR);

  console.log(`Found ${imageFiles.length} images to optimize`);
  console.log('='.repeat(60));

  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  // Optimize each image
  let successCount = 0;
  let errorCount = 0;

  for (const imagePath of imageFiles) {
    try {
      await optimizeImage(imagePath);
      successCount++;
    } catch (error) {
      errorCount++;
    }
  }

  // Summary
  console.log('='.repeat(60));
  console.log('OPTIMIZATION COMPLETED');
  console.log('='.repeat(60));
  console.log(`✅ Successfully optimized: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(60));
  console.log('\n💡 Tips:');
  console.log('   - WebP versions have been created for PNG and JPEG images');
  console.log('   - Update your image src attributes to use .webp extensions');
  console.log('   - Original files are preserved for fallback');
  console.log('='.repeat(60));
}

// Run the optimizer
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});