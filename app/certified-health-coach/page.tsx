'use client';

import { useState, useEffect } from 'react';
import healthCoaches from '../../lib/data/health-coaches.json';

const COACHES_PER_PAGE = 20;

export default function HealthCoachesDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCoaches, setFilteredCoaches] = useState(healthCoaches.filter(coach => coach.status === 'publish'));

  // Extract unique categories and locations
  const categories: string[] = ['all', ...Array.from(new Set(healthCoaches.flatMap(coach => coach.categories || [])))];
  const locations: string[] = ['all', ...Array.from(new Set(healthCoaches.flatMap(coach => coach.locations || [])))];

  // Filter coaches
  useEffect(() => {
    let filtered = healthCoaches.filter(coach => coach.status === 'publish');

    if (searchTerm) {
      filtered = filtered.filter(coach =>
        coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(coach => (coach.categories || []).includes(selectedCategory));
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(coach => {
        const locs = (coach.locations || []) as string[];
        return locs.includes(selectedLocation);
      });
    }

    setFilteredCoaches(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, selectedLocation]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCoaches.length / COACHES_PER_PAGE);
  const startIndex = (currentPage - 1) * COACHES_PER_PAGE;
  const endIndex = startIndex + COACHES_PER_PAGE;
  const currentCoaches = filteredCoaches.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certified Health Coaches</h1>
          <p className="text-gray-600">
            Browse among {filteredCoaches.length} certified health coaches
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search health coaches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-sm text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white text-sm text-gray-900"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Dropdown */}
            <div className="w-full md:w-48">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white text-sm text-gray-900"
              >
                <option value="all">All Locations</option>
                {locations.slice(1).map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Health Coaches Grid */}
        {currentCoaches.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
              {currentCoaches.map((coach) => (
                <div
                  key={coach.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-orange-300 transition-all duration-300"
                >
                  {/* Profile Image */}
                  <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center">
                    {coach.profileImage ? (
                      <img
                        src={coach.profileImage}
                        alt={coach.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full text-gray-400">
                        <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                    {coach.featured && (
                      <div className="absolute top-2 right-2 bg-orange-400 text-white px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </div>
                    )}
                    {coach.verified && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        ✓ Verified
                      </div>
                    )}
                  </div>

                  {/* Coach Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{coach.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{coach.description}</p>

                    {/* Categories */}
                    {coach.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {coach.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded"
                          >
                            {category}
                          </span>
                        ))}
                        {coach.categories.length > 2 && (
                          <span className="text-gray-500 text-xs">+{coach.categories.length - 2}</span>
                        )}
                      </div>
                    )}

                    {/* Location */}
                    {coach.locations.length > 0 && (
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Location:</span> {coach.locations[0]}
                      </div>
                    )}

                    {/* Contact Info */}
                    {coach.contactInfo.phone && (
                      <div className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Phone:</span> {coach.contactInfo.phone}
                      </div>
                    )}
                    {coach.contactInfo.email && (
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Email:</span> {coach.contactInfo.email}
                      </div>
                    )}

                    {/* Rating */}
                    {coach.rating > 0 && (
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(coach.rating) ? 'fill-current' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({coach.reviewCount} reviews)</span>
                      </div>
                    )}

                    {/* View Profile Button */}
                    <button className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => typeof page === 'number' && setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        currentPage === page
                          ? 'bg-orange-400 text-white border-orange-400'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No health coaches found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}