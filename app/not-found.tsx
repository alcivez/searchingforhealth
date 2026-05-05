import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-400 mb-2">404</h1>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto mb-6"></div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track to finding great health resources.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition-all"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 001 1v4a1 1 0 001 1h3a1 1 0 001-1v-10m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center justify-center border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold py-3 px-8 rounded-lg transition-all"
          >
            Browse Books
          </Link>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>Looking for something specific? Try our</p>
          <div className="flex gap-4 justify-center mt-2">
            <Link href="/certified-health-coach" className="text-orange-500 hover:text-orange-600">
              Health Coaches
            </Link>
            <span>•</span>
            <Link href="/categories" className="text-orange-500 hover:text-orange-600">
              Categories
            </Link>
            <span>•</span>
            <Link href="/our-purpose" className="text-orange-500 hover:text-orange-600">
              Our Purpose
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}