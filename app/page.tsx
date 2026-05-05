'use client';

import { useEffect, useState } from 'react';
import books from '../lib/data/books.json';
import categories from '../lib/data/categories.json';
import BookCard from '../components/BookCard';
import PromoImages from '../components/PromoImages';

// Get books by category ID
function getBooksByCategory(categoryId: number) {
  return books.filter((book) => book.categories.includes(categoryId));
}

// Get random books
function getRandomBooks(count: number) {
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function HomePage() {
  const [randomBooks, setRandomBooks] = useState<typeof books>([]);

  useEffect(() => {
    // Set random books on client side only to avoid hydration mismatch
    setRandomBooks(getRandomBooks(24));

    // Register service worker for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Health Library Collection</h1>
          <p className="text-sm text-gray-600">
            Discover {books.length} carefully curated books on health, wellness, nutrition, and natural healing
          </p>
        </div>

        {/* Search/Filter Bar - Compact Single Line */}
        <div className="bg-white rounded-lg shadow p-3 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Book Title Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-sm text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-40">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white text-sm text-gray-900">
                <option>All Categories</option>
                {categories.slice(0, 10).map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Dropdown */}
            <div className="w-full md:w-40">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white text-sm text-gray-900">
                <option>All Authors</option>
                {Array.from(new Set(books.map(book => book.author))).slice(0, 10).map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>

            {/* Format Dropdown */}
            <div className="w-full md:w-32">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white text-sm text-gray-900">
                <option>All Formats</option>
                <option>Audiobook</option>
                <option>Hardcover</option>
                <option>Paperback</option>
                <option>Kindle</option>
              </select>
            </div>

            {/* Search Button */}
            <button className="bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm whitespace-nowrap">
              Search
            </button>

            {/* Reset Button */}
            <button className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Random Books - 24 books, 4 rows x 6 columns */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-900">Featured Books</h2>
            <a href="/books" className="text-orange-500 hover:text-orange-600 font-semibold text-xs flex items-center gap-1 transition-colors">
              View All
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {randomBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Promo Images - 3 random images per page load */}
        <PromoImages />
      </main>
    </div>
  );
}