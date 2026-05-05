const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Configuration
const DATA_DIR = path.join(__dirname, '../lib/data');
const XML_EXPORT_FILE = path.join(__dirname, '../wordpress-export.xml');

// Parse WordPress XML export
async function parseWordPressXML(xmlFilePath) {
  console.log('Parsing WordPress XML export for health coaches...');

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

// Extract health coaches from WordPress XML
function extractHealthCoachesFromXML(xmlData) {
  console.log('Extracting health coaches from XML...');

  const healthCoaches = [];
  const items = xmlData.rss?.channel?.[0]?.item || [];

  // First, build a map of attachment IDs to URLs
  const attachmentMap = new Map();
  items.forEach((item) => {
    const postType = item['wp:post_type']?.[0];
    const postId = item['wp:post_id']?.[0];
    const attachmentUrl = item['wp:attachment_url']?.[0];

    if (postType === 'attachment' && postId && attachmentUrl) {
      attachmentMap.set(postId, attachmentUrl);
    }
  });

  console.log(`Built attachment map with ${attachmentMap.size} images`);

  // Now extract health coaches
  items.forEach((item) => {
    const postType = item['wp:post_type']?.[0];

    // Check if this item is a health coach listing
    if (postType === 'at_biz_dir') {
      const title = item.title?.[0] || '';
      const content = item['content:encoded']?.[0] || '';
      const excerpt = item['excerpt:encoded']?.[0] || '';
      const postName = item['wp:post_name']?.[0] || '';
      const postId = item['wp:post_id']?.[0];
      const status = item['wp:status']?.[0] || '';

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

      // Extract categories
      const categories = item.category || [];
      const itemCategories = categories
        .filter(cat => cat.$.domain === 'at_biz_dir-category')
        .map(cat => cat._ || '')
        .filter(cat => cat.trim() !== '');

      // Extract locations
      const locations = categories
        .filter(cat => cat.$.domain === 'at_biz_dir-location')
        .map(cat => cat._ || '')
        .filter(loc => loc.trim() !== '');

      // Extract tags
      const tags = categories
        .filter(cat => cat.$.domain === 'at_biz_dir-tags')
        .map(cat => cat._ || '')
        .filter(tag => tag.trim() !== '');

      // Extract profile image from thumbnail_id
      const thumbnailId = metaFields._thumbnail_id;
      let profileImage = '';
      if (thumbnailId && attachmentMap.has(thumbnailId)) {
        profileImage = attachmentMap.get(thumbnailId);
      }

      // Extract contact information
      const contactInfo = {
        phone: metaFields._phone || '',
        email: metaFields._email || '',
        website: metaFields._website || '',
        address: metaFields._address || '',
        city: metaFields._city || '',
        state: metaFields._state || '',
        zip: metaFields._zip || '',
        country: metaFields._country || ''
      };

      // Extract social media
      const socialMedia = {
        facebook: metaFields._facebook || '',
        twitter: metaFields._twitter || '',
        linkedin: metaFields._linkedin || '',
        youtube: metaFields._youtube || ''
      };

      // Extract business hours
      const businessHours = metaFields._business_hours || '';

      // Extract pricing
      const pricing = metaFields._price || metaFields._pricing || '';

      const healthCoachData = {
        id: parseInt(postId),
        slug: postName || `health-coach-${postId}`,
        name: title,
        description: content,
        excerpt: excerpt,
        profileImage: profileImage,
        categories: itemCategories,
        locations: locations,
        tags: tags,
        contactInfo: contactInfo,
        socialMedia: socialMedia,
        businessHours: businessHours,
        pricing: pricing,
        status: status,
        featured: metaFields._featured === '1' || metaFields._featured === 'yes',
        verified: metaFields._verified === '1' || metaFields._verified === 'yes',
        rating: parseFloat(metaFields._rating || '0'),
        reviewCount: parseInt(metaFields._review_count || '0'),
        createdAt: item['wp:post_date']?.[0] || '',
        updatedAt: item['wp:post_modified']?.[0] || ''
      };

      healthCoaches.push(healthCoachData);
    }
  });

  console.log(`✅ Extracted ${healthCoaches.length} health coaches from XML`);
  return healthCoaches;
}

// Save data to JSON file
function saveData(healthCoaches) {
  // Ensure directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Save health coaches
  fs.writeFileSync(
    path.join(DATA_DIR, 'health-coaches.json'),
    JSON.stringify(healthCoaches, null, 2)
  );
  console.log('✅ Saved health-coaches.json');
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('HEALTH COACHES EXTRACTOR');
  console.log('='.repeat(60));
  console.log(`Looking for: ${XML_EXPORT_FILE}`);
  console.log('='.repeat(60));

  // Check if XML file exists
  if (!fs.existsSync(XML_EXPORT_FILE)) {
    console.log('\n❌ WordPress XML export file not found!');
    console.log('\nPlease follow these steps:');
    console.log('1. Log in to your WordPress admin panel');
    console.log('2. Go to Tools → Export');
    console.log('3. Select "All content"');
    console.log('4. Click "Download Export File"');
    console.log('5. Save the file as: wordpress-export.xml');
    console.log('6. Place it in the project root directory');
    console.log('\nThen run this script again.');
    console.log('='.repeat(60));
    process.exit(1);
  }

  try {
    // Parse XML
    const xmlData = await parseWordPressXML(XML_EXPORT_FILE);

    // Extract health coaches
    const healthCoaches = extractHealthCoachesFromXML(xmlData);

    // Save data
    saveData(healthCoaches);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('HEALTH COACHES EXTRACTION COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`👨‍⚕️ Health Coaches: ${healthCoaches.length}`);
    console.log('='.repeat(60));
    console.log('\n✅ All data saved to /lib/data/health-coaches.json');
    console.log('✅ Ready for site implementation');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n❌ EXTRACTION FAILED:', error);
    process.exit(1);
  }
}

// Run the extractor
main();