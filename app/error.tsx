'use client';

import Link from 'next/link';

export default function ServerError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-400 mb-2">503</h1>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto mb-6"></div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Unavailable</h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We're currently performing maintenance on our servers. Please check back in a few minutes. We apologize for any inconvenience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition-all"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Page
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center justify-center border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold py-3 px-8 rounded-lg transition-all"
          >
            Browse Books
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow p-6 max-w-md mx-auto">
          <div className="flex items-start">
            <svg className="h-6 w-6 text-orange-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left">
              <p className="font-semibold text-gray-900 mb-2">What's happening?</p>
              <p className="text-gray-600 text-sm">
                We're currently performing scheduled maintenance to improve our services. This usually takes just a few minutes. Thank you for your patience!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>Need immediate assistance?</p>
          <Link href="/contact" className="text-orange-500 hover:text-orange-600">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}