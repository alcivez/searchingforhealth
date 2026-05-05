const fs = require('fs');
const path = require('path');

// Read the books data
const booksPath = path.join(__dirname, '../lib/data/books.json');
const booksData = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

// Update each book's coverImage to use local path
const updatedBooks = booksData.map(book => {
  // Construct local image path from slug
  const localImagePath = `/images/books/${book.slug}.jpg`;

  return {
    ...book,
    coverImage: localImagePath
  };
});

// Write updated data back to file
fs.writeFileSync(booksPath, JSON.stringify(updatedBooks, null, 2));

console.log(`Updated ${updatedBooks.length} books with local image paths`);
console.log('Sample updated book:');
console.log(JSON.stringify(updatedBooks[0], null, 2));