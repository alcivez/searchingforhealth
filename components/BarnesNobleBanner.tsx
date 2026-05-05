export default function BarnesNobleBanner() {
  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-900 mb-0.5">Barnes & Noble</h3>
          <a
            href="https://www.barnesandnoble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 text-xs font-semibold"
          >
            Visit Store →
          </a>
        </div>
      </div>
    </div>
  );
}