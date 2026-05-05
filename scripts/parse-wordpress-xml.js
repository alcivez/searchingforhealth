const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Configuration
const DATA_DIR = path.join(__dirname, '../lib/data');
const XML_EXPORT_FILE = path.join(__dirname, '../wordpress-export.xml');

// Data storage
const data = {
  books: [],
  categories: [],
  tags: [],
  healthLeaders: [],
  pages: {}
};

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

// Extract books from WordPress XML
function extractBooksFromXML(xmlData, categoryMap) {
  console.log('Extracting books from XML...');

  const books = [];

  // First, build a map of attachment IDs to URLs
  const attachmentMap = new Map();
  const items = xmlData.rss?.channel?.[0]?.item || [];

  items.forEach((item) => {
    const postType = item['wp:post_type']?.[0];
    const postId = item['wp:post_id']?.[0];
    const attachmentUrl = item['wp:attachment_url']?.[0];

    if (postType === 'attachment' && postId && attachmentUrl) {
      attachmentMap.set(postId, attachmentUrl);
    }
  });

  console.log(`Built attachment map with ${attachmentMap.size} images`);

  // Now extract books
  items.forEach((item, index) => {
    // Check if this item is a book - be more inclusive to capture all books
    const postType = item['wp:post_type']?.[0];
    const categories = item.category || [];
    const title = item.title?.[0] || '';

    // More inclusive book detection - capture posts that are likely books
    const isBook = postType === 'books' || // Custom books post type (plural!)
                  postType === 'book' || // Custom book post type (singular)
                  postType === 'post'; // Regular posts

    // Skip pages and other non-book content
    if (postType === 'page' || postType === 'attachment') {
      return;
    }

    if (isBook && title) {
      const title = item.title?.[0] || '';
      const content = item['content:encoded']?.[0] || '';
      const excerpt = item['excerpt:encoded']?.[0] || '';
      const pubDate = item.pubDate?.[0] || '';
      const postName = item['wp:post_name']?.[0] || '';
      const postId = item['wp:post_id']?.[0] || index + 1;

      // Extract categories - match by name/slug since term_id is not available
      const itemCategories = categories
        .filter(cat => (cat.$.domain === 'category' || cat.$.domain === 'book_category') && cat._)
        .map(cat => {
          const categoryName = cat._;
          const categorySlug = cat.$.nicename;
          // Find matching category ID from the category map
          const matchedCategory = Array.from(categoryMap.values()).find(
            c => c.name === categoryName || c.slug === categorySlug
          );
          return matchedCategory ? matchedCategory.id : null;
        })
        .filter(id => id !== null)
        .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

      // Extract formats from book_format categories
      const itemFormats = categories
        .filter(cat => cat.$.domain === 'book_format')
        .map(cat => cat._ || '')
        .filter(format => format.trim() !== '');

      // Extract tags from post_tag categories (health leaders)
      const itemTags = categories
        .filter(cat => cat.$.domain === 'post_tag')
        .map(cat => cat._ || '')
        .filter(tag => tag.trim() !== '')
        .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

      // Extract custom fields (meta data)
      const wpMeta = item['wp:postmeta'] || [];
      const metaFields = {};
      wpMeta.forEach(meta => {
        const key = meta['wp:meta_key']?.[0];
        const value = meta['wp:meta_value']?.[0];
        if (key && value !== undefined) {
          metaFields[key] = value;
        }
      });

      // Extract cover image from thumbnail_id
      const thumbnailId = metaFields._thumbnail_id || metaFields.wbg_thumbnail_id;
      let coverImage = '';
      if (thumbnailId && attachmentMap.has(thumbnailId)) {
        coverImage = attachmentMap.get(thumbnailId);
      }

      // Extract affiliate links from meta fields (using wbg_ prefix)
      const affiliateLinks = {
        amazon: metaFields.wbg_mss_amazon || metaFields.wbg_download_link || '',
        amazonKindle: metaFields.wbg_mss_amazon_kindle || '',
        barnesNoble: metaFields['wbg_mss_barnes_&_noble'] || '',
        audible: '', // No audible field found
        appleBooks: metaFields.wbg_mss_apple_books || '',
        bookshop: metaFields.wbg_mss_bookshop_org || '',
        lifeway: metaFields.wbg_mss_lifeway || ''
      };

      // Extract book-specific metadata (using wbg_ prefix)
      const bookData = {
        id: parseInt(postId),
        slug: postName || `book-${postId}`,
        title: title,
        subtitle: metaFields.wbg_sub_title || '',
        author: metaFields.wbg_author || 'Unknown Author',
        coAuthors: [],
        isbn: metaFields.wbg_isbn || metaFields.wbg_isbn_13 || '',
        publisher: metaFields.wbg_publisher || '',
        publishDate: metaFields.wbg_published_on || pubDate,
        coverImage: coverImage,
        description: content,
        excerpt: excerpt,
        categories: itemCategories,
        formats: itemFormats,
        tags: itemTags,
        price: metaFields.wbgp_sale_price ? `$${(parseInt(metaFields.wbgp_sale_price) / 100).toFixed(2)}` :
               metaFields.wbgp_regular_price ? `$${(parseInt(metaFields.wbgp_regular_price) / 100).toFixed(2)}` : '$0.00',
        pages: parseInt(metaFields.wbg_pages || '0'),
        language: metaFields.wbg_language || 'English',
        affiliateLinks: affiliateLinks,
        seo: {
          title: metaFields._yoast_wpseo_title || '',
          description: metaFields._yoast_wpseo_metadesc || '',
          keywords: metaFields._yoast_wpseo_focuskw ? [metaFields._yoast_wpseo_focuskw] : []
        },
        rating: 0,
        reviewsCount: 0,
        featured: metaFields.wbg_is_featured === 'yes' || metaFields.wbg_is_featured === '1',
        bestseller: false
      };

      books.push(bookData);
    }
  });

  console.log(`✅ Extracted ${books.length} books from XML`);
  return books;
}

// Extract categories from WordPress XML
function extractCategoriesFromXML(xmlData) {
  console.log('Extracting categories from XML...');

  const categories = [];

  // WordPress categories are in <wp:category> tags
  const wpCategories = xmlData.rss?.channel?.[0]['wp:category'] || [];

  wpCategories.forEach((cat, index) => {
    const categoryData = {
      id: parseInt(cat['wp:category_id']?.[0] || index + 1),
      slug: cat['wp:category_nicename']?.[0] || '',
      name: cat['wp:cat_name']?.[0] || '',
      description: cat['wp:category_description']?.[0] || '',
      count: parseInt(cat['wp:category_count']?.[0] || '0'),
      parent: parseInt(cat['wp:category_parent']?.[0] || '0')
    };

    categories.push(categoryData);
  });

  console.log(`✅ Extracted ${categories.length} categories from XML`);
  return categories;
}

// Extract tags from WordPress XML
function extractTagsFromXML(xmlData) {
  console.log('Extracting tags from XML...');

  const tags = [];
  const tagMap = new Map();

  // WordPress tags are in <wp:tag> tags
  const wpTags = xmlData.rss?.channel?.[0]['wp:tag'] || [];

  wpTags.forEach((tag, index) => {
    const tagData = {
      id: parseInt(tag['wp:tag_id']?.[0] || index + 1),
      slug: tag['wp:tag_slug']?.[0] || '',
      name: tag['wp:tag_name']?.[0] || '',
      count: parseInt(tag['wp:tag_count']?.[0] || '0')
    };

    tags.push(tagData);
    tagMap.set(tagData.slug, tagData);
  });

  console.log(`✅ Extracted ${tags.length} tags from XML`);
  return { tags, tagMap };
}

// Extract pages from WordPress XML
function extractPagesFromXML(xmlData) {
  console.log('Extracting pages from XML...');

  const pages = {};

  const items = xmlData.rss?.channel?.[0]?.item || [];

  items.forEach((item) => {
    const postType = item['wp:post_type']?.[0];

    if (postType === 'page') {
      const slug = item['wp:post_name']?.[0] || '';
      const pageData = {
        id: parseInt(item['wp:post_id']?.[0] || '0'),
        slug: slug,
        title: item.title?.[0] || '',
        content: item['content:encoded']?.[0] || '',
        excerpt: item['excerpt:encoded']?.[0] || '',
        seo: {
          title: item['wp:postmeta']?.find(m => m['wp:meta_key']?.[0] === '_yoast_wpseo_title')?.['wp:meta_value']?.[0] || '',
          description: item['wp:postmeta']?.find(m => m['wp:meta_key']?.[0] === '_yoast_wpseo_metadesc')?.['wp:meta_value']?.[0] || ''
        }
      };

      pages[slug] = pageData;
    }
  });

  console.log(`✅ Extracted ${Object.keys(pages).length} pages from XML`);
  return pages;
}

// Helper functions to extract data from content
function extractAuthorFromContent(content) {
  const authorMatch = content.match(/by\s+([^.]+)/i) || content.match(/author:\s*([^.]+)/i);
  return authorMatch ? authorMatch[1].trim() : 'Unknown Author';
}

function extractImageFromContent(content) {
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch ? imgMatch[1] : '';
}

function extractPriceFromContent(content) {
  const priceMatch = content.match(/\$\d+\.?\d*/);
  return priceMatch ? priceMatch[0] : '$0.00';
}

// Save data to JSON files
function saveData() {
  // Ensure directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Save books
  fs.writeFileSync(
    path.join(DATA_DIR, 'books.json'),
    JSON.stringify(data.books, null, 2)
  );
  console.log('✅ Saved books.json');

  // Save categories
  fs.writeFileSync(
    path.join(DATA_DIR, 'categories.json'),
    JSON.stringify(data.categories, null, 2)
  );
  console.log('✅ Saved categories.json');

  // Save tags
  fs.writeFileSync(
    path.join(DATA_DIR, 'tags.json'),
    JSON.stringify(data.tags, null, 2)
  );
  console.log('✅ Saved tags.json');

  // Save health leaders (empty for now)
  fs.writeFileSync(
    path.join(DATA_DIR, 'health-leaders.json'),
    JSON.stringify(data.healthLeaders, null, 2)
  );
  console.log('✅ Saved health-leaders.json');

  // Save pages
  fs.writeFileSync(
    path.join(DATA_DIR, 'pages.json'),
    JSON.stringify(data.pages, null, 2)
  );
  console.log('✅ Saved pages.json');
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('WORDPRESS XML EXPORT PARSER');
  console.log('='.repeat(60));
  console.log(`Looking for: ${XML_EXPORT_FILE}`);
  console.log(`Date: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  // Check if XML file exists
  if (!fs.existsSync(XML_EXPORT_FILE)) {
    console.log('\\n❌ WordPress XML export file not found!');
    console.log('\\nPlease follow these steps:');
    console.log('1. Log in to your WordPress admin panel');
    console.log('2. Go to Tools → Export');
    console.log('3. Select "All content" or specific post types');
    console.log('4. Click "Download Export File"');
    console.log('5. Save the file as: wordpress-export.xml');
    console.log('6. Place it in the project root directory');
    console.log('\\nThen run this script again.');
    console.log('='.repeat(60));
    process.exit(1);
  }

  try {
    // Parse XML
    const xmlData = await parseWordPressXML(XML_EXPORT_FILE);

    // Extract categories first to build category map
    data.categories = extractCategoriesFromXML(xmlData);

    // Build category name/slug to ID map
    const categoryMap = new Map();
    data.categories.forEach(cat => {
      categoryMap.set(cat.name, cat);
      categoryMap.set(cat.slug, cat);
    });

    // Extract books with category map
    data.books = extractBooksFromXML(xmlData, categoryMap);

    const tagsData = extractTagsFromXML(xmlData);
    data.tags = tagsData.tags;
    data.pages = extractPagesFromXML(xmlData);

    // Save data
    saveData();

    // Summary
    console.log('\\n' + '='.repeat(60));
    console.log('XML PARSING COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`📚 Books: ${data.books.length}`);
    console.log(`📁 Categories: ${data.categories.length}`);
    console.log(`🏷️  Tags: ${data.tags.length}`);
    console.log(`📄 Pages: ${Object.keys(data.pages).length}`);
    console.log('='.repeat(60));
    console.log('\\n✅ All data saved to /lib/data/');
    console.log('✅ Ready for site implementation');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\\n❌ PARSING FAILED:', error);
    process.exit(1);
  }
}

// Run the parser
main();