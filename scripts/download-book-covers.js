const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const https = require('https');
const http = require('http');

// Configuration
const PROJECT_DIR = path.join(__dirname, '..');
const XML_EXPORT_FILE = path.join(PROJECT_DIR, 'wordpress-export.xml');
const BOOKS_DATA_FILE = path.join(PROJECT_DIR, 'lib/data/books.json');
const IMAGES_DIR = path.join(PROJECT_DIR, 'public/images/books');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Parse WordPress XML export
async function parseWordPressXML(xmlFilePath) {
  console.log('Parsing WordPress XML export...');

  try {
    const xmlContent = fs.readFileSync(xmlFilePath, 'utf8');
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlContent);

    return result;
  } catch (error) {
    console.error('Error parsing XML:', error.message);
    throw error;
  }
}

// Download image from URL
function downloadImage(url, destination) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destination);

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        file.close();
        fs.unlinkSync(destination); // Delete the file if download failed
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(destination); // Delete the file if error occurred
      reject(err);
    });
  });
}

// Extract attachments and map to books
function extractAttachments(xmlData) {
  console.log('Extracting attachments from XML...');

  const attachments = {};
  const items = xmlData.rss?.channel?.[0]?.item || [];

  items.forEach((item) => {
    const postType = item['wp:post_type']?.[0];
    const postId = item['wp:post_id']?.[0];
    const postParent = item['wp:post_parent']?.[0];
    const attachmentUrl = item['wp:attachment_url']?.[0];

    if (postType === 'attachment' && attachmentUrl) {
      // Store attachment by ID
      attachments[postId] = {
        url: attachmentUrl,
        parentId: postParent
      };
    }
  });

  console.log(`✅ Found ${Object.keys(attachments).length} attachments`);
  return attachments;
}

// Extract books with their thumbnail IDs
function extractBookThumbnails(xmlData) {
  console.log('Extracting book thumbnails...');

  const bookThumbnails = {};
  const items = xmlData.rss?.channel?.[0]?.item || [];

  items.forEach((item) => {
    const postType = item['wp:post_type']?.[0];
    const postId = item['wp:post_id']?.[0];
    const postName = item['wp:post_name']?.[0];

    if (postType === 'books') {
      // Find thumbnail_id from postmeta
      const wpMeta = item['wp:postmeta'] || [];
      const thumbnailId = wpMeta.find(meta => meta['wp:meta_key']?.[0] === '_thumbnail_id')?.['wp:meta_value']?.[0];

      if (thumbnailId) {
        bookThumbnails[postId] = {
          thumbnailId: thumbnailId,
          slug: postName
        };
      }
    }
  });

  console.log(`✅ Found ${Object.keys(bookThumbnails).length} books with thumbnails`);
  return bookThumbnails;
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('BOOK COVER IMAGE DOWNLOADER');
  console.log('='.repeat(60));
  console.log(`Date: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  // Check if XML file exists
  if (!fs.existsSync(XML_EXPORT_FILE)) {
    console.log('❌ WordPress XML export file not found!');
    process.exit(1);
  }

  // Check if books data exists
  if (!fs.existsSync(BOOKS_DATA_FILE)) {
    console.log('❌ Books data file not found! Run parse-wordpress-xml.js first.');
    process.exit(1);
  }

  try {
    // Parse XML
    const xmlData = await parseWordPressXML(XML_EXPORT_FILE);

    // Extract attachments
    const attachments = extractAttachments(xmlData);

    // Extract book thumbnails
    const bookThumbnails = extractBookThumbnails(xmlData);

    // Load books data
    const booksData = JSON.parse(fs.readFileSync(BOOKS_DATA_FILE, 'utf8'));

    console.log(`\n📚 Processing ${booksData.length} books...`);

    let downloadedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Process each book
    for (const book of booksData) {
      const bookId = book.id.toString();
      const thumbnailInfo = bookThumbnails[bookId];

      if (thumbnailInfo && thumbnailInfo.thumbnailId) {
        const attachment = attachments[thumbnailInfo.thumbnailId];

        if (attachment && attachment.url) {
          // Generate filename from slug
          const filename = `${thumbnailInfo.slug}.jpg`;
          const destination = path.join(IMAGES_DIR, filename);

          // Check if file already exists
          if (fs.existsSync(destination)) {
            console.log(`⏭️  Skipping existing: ${filename}`);
            book.coverImage = `/images/books/${filename}`;
            skippedCount++;
            continue;
          }

          try {
            console.log(`⬇️  Downloading: ${filename}`);
            await downloadImage(attachment.url, destination);
            book.coverImage = `/images/books/${filename}`;
            downloadedCount++;
          } catch (error) {
            console.error(`❌ Error downloading ${filename}:`, error.message);
            errorCount++;
          }
        } else {
          console.log(`⚠️  No attachment found for thumbnail ID ${thumbnailInfo.thumbnailId}`);
        }
      } else {
        console.log(`⚠️  No thumbnail found for book: ${book.title}`);
      }
    }

    // Save updated books data
    fs.writeFileSync(BOOKS_DATA_FILE, JSON.stringify(booksData, null, 2));
    console.log('✅ Updated books.json with cover image paths');

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('IMAGE DOWNLOAD COMPLETED!');
    console.log('='.repeat(60));
    console.log(`✅ Downloaded: ${downloadedCount} images`);
    console.log(`⏭️  Skipped: ${skippedCount} images (already exist)`);
    console.log(`❌ Errors: ${errorCount} images`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n❌ DOWNLOAD FAILED:', error);
    process.exit(1);
  }
}

// Run the downloader
main();