import pages from '../../lib/data/pages.json';

export default function PrivacyPage() {
  const pageData = pages['privacy-policy'];

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <a href="/" className="text-orange-500 hover:text-orange-600">
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">{pageData.title}</h1>

          <div className="prose prose-lg max-w-none">
            <style>{`
              .prose p, .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6, .prose strong, .prose b, .prose span {
                color: #000000 !important;
              }
              .prose h2 {
                font-size: 1.875rem;
                font-weight: 700;
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                line-height: 1.3;
              }
              .prose h3 {
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 2rem;
                margin-bottom: 0.75rem;
                line-height: 1.4;
              }
              .prose p {
                margin-bottom: 1.25rem;
                line-height: 1.8;
                font-size: 1.125rem;
              }
              .prose strong, .prose b {
                font-weight: 700;
              }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
          </div>
        </div>
      </main>
    </div>
  );
}