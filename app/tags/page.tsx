import books from '../../lib/data/books.json';

// Get all unique tags
function getAllTags() {
  const tagMap = new Map<string, { name: string; count: number }>();

  books.forEach((book) => {
    if (book.tags && book.tags.length > 0) {
      book.tags.forEach((tag) => {
        const slug = tag.toLowerCase().replace(/\s+/g, '-');
        if (tagMap.has(slug)) {
          tagMap.get(slug)!.count++;
        } else {
          tagMap.set(slug, { name: tag, count: 1 });
        }
      });
    }
  });

  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
}

// Get books by tag
function getBooksByTag(tagName: string) {
  return books.filter((book) =>
    book.tags && book.tags.some(tag =>
      tag.toLowerCase().replace(/\s+/g, '-') === tagName.toLowerCase()
    )
  );
}

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Health Leaders & Tags</h1>
          <p className="text-sm text-gray-600">Browse books by health leaders and topics - {tags.length} tags available</p>
        </div>

        {/* Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {tags.map((tag) => (
            <div
              key={tag.name}
              className="bg-white rounded-lg p-3 hover:shadow-md transition-all border border-gray-200 hover:border-orange-300 text-center group"
            >
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
                <a href={`/tags/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  {tag.name}
                </a>
              </h3>

              <p className="text-xs text-gray-600 mb-1">
                {tag.count} {tag.count === 1 ? 'book' : 'books'}
              </p>

              <a
                href={`/tags/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block text-orange-500 hover:text-orange-600 font-semibold text-xs transition-colors"
              >
                Browse →
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}