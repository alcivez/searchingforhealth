'use client';

import { useState } from 'react';
import Link from 'next/link';

const healthLeaders = [
  { name: 'Dr. Joseph Mercola', slug: 'dr-joseph-mercola' },
  { name: 'Joe Rogan', slug: 'joe-rogan' },
  { name: 'Dr. Steven Gundry', slug: 'dr-steven-gundry' },
  { name: 'Dr. Mark Sircus', slug: 'dr-mark-sircus' },
  { name: 'Dr. Barbara O\'Neill', slug: 'dr-barbara-oneill' },
  { name: 'Dr. Robert Morse', slug: 'dr-robert-morse' },
  { name: 'Dr. Sebi', slug: 'dr-sebi' },
  { name: 'Dr. Joel Wallach', slug: 'dr-joel-wallach' },
  { name: 'Dr. Thomas Levy', slug: 'dr-thomas-levy' },
  { name: 'Dr. Al Sears', slug: 'dr-al-sears' },
  { name: 'Ben Greenfield', slug: 'ben-greenfield' },
  { name: 'Gary Brecka', slug: 'gary-brecka' },
];

const mainCategories = [
  { name: 'Diet', slug: 'diet' },
  { name: 'Disease Prevention', slug: 'disease-prevention' },
  { name: 'Lifestyle', slug: 'lifestyle' },
  { name: 'Education', slug: 'education' },
  { name: 'Medical', slug: 'medical' },
  { name: 'Healing', slug: 'healing' },
];

export default function Navigation() {
  const [healthLeadersOpen, setHealthLeadersOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#222222] sticky top-0 z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Full size with embedded text */}
          <Link href="/" className="group">
            <div className="relative w-64 h-24 group-hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="Searching for Health"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Right side - Navigation and Search */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-orange-400 font-medium transition-colors text-sm py-2">
                Home
              </Link>

              {/* Health Leaders Dropdown */}
              <div className="relative group">
                <button
                  className="text-white hover:text-orange-400 font-medium transition-colors flex items-center text-sm py-2"
                  onMouseEnter={() => setHealthLeadersOpen(true)}
                  onMouseLeave={() => setHealthLeadersOpen(false)}
                >
                  Health Leaders
                  <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {healthLeadersOpen && (
                  <div
                    className="absolute left-0 mt-0 w-48 bg-[#222222] rounded-lg shadow-xl py-2 z-50 border border-zinc-700"
                    onMouseEnter={() => setHealthLeadersOpen(true)}
                    onMouseLeave={() => setHealthLeadersOpen(false)}
                  >
                    {healthLeaders.map((leader) => (
                      <Link
                        key={leader.slug}
                        href={`/tags/${leader.slug}`}
                        className="block px-4 py-2 text-xs text-gray-300 hover:bg-zinc-700 hover:text-white transition-colors"
                      >
                        {leader.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button
                  className="text-white hover:text-orange-400 font-medium transition-colors flex items-center text-sm py-2"
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                >
                  Categories
                  <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {categoriesOpen && (
                  <div
                    className="absolute left-0 mt-0 w-36 bg-[#222222] rounded-lg shadow-xl py-2 z-50 border border-zinc-700"
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                  >
                    {mainCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categories/${category.slug}`}
                        className="block px-4 py-2 text-xs text-gray-300 hover:bg-zinc-700 hover:text-white transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <div className="border-t border-zinc-700 mt-2 pt-2">
                      <Link
                        href="/categories"
                        className="block px-4 py-2 text-xs text-gray-300 hover:bg-zinc-700 hover:text-white transition-colors font-medium"
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/certified-health-coach" className="text-white hover:text-orange-400 font-medium transition-colors text-sm py-2">
                Health Coach
              </Link>
              <Link href="/our-purpose" className="text-white hover:text-orange-400 font-medium transition-colors text-sm py-2">
                Purpose
              </Link>
              <Link href="/testimonials" className="text-white hover:text-orange-400 font-medium transition-colors text-sm py-2">
                Testimonials
              </Link>
            </nav>

            {/* Search Icon */}
            <div className="hidden md:block">
              <button className="text-orange-400 hover:text-yellow-500 transition-colors p-2 rounded-lg hover:bg-zinc-800">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-white hover:text-orange-400 hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-700">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-orange-400 font-medium py-4 text-sm">
                Home
              </Link>
              <div className="py-4">
                <div className="text-white font-medium mb-4 text-sm">Health Leaders</div>
                <div className="pl-4 space-y-4">
                  {healthLeaders.map((leader) => (
                    <Link
                      key={leader.slug}
                      href={`/tags/${leader.slug}`}
                      className="block text-sm text-gray-300 hover:text-white py-4"
                    >
                      {leader.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="py-4">
                <div className="text-white font-medium mb-4 text-sm">Categories</div>
                <div className="pl-4 space-y-4">
                  {mainCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="block text-sm text-gray-300 hover:text-white py-4"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className="block text-sm text-gray-300 hover:text-white py-4 font-medium"
                  >
                    View All Categories →
                  </Link>
                </div>
              </div>
              <Link href="/certified-health-coach" className="text-white hover:text-orange-400 font-medium py-4 text-sm">
                Health Coach
              </Link>
              <Link href="/our-purpose" className="text-white hover:text-orange-400 font-medium py-4 text-sm">
                Purpose
              </Link>
              <Link href="/testimonials" className="text-white hover:text-orange-400 font-medium py-4 text-sm">
                Testimonials
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}