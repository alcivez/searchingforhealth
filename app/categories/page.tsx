import categories from '../../lib/data/categories.json';
import books from '../../lib/data/books.json';

// Get books by category ID
function getBooksByCategory(categoryId: number) {
  return books.filter((book) => book.categories.includes(categoryId));
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Book Categories</h1>
          <p className="text-sm text-gray-600">Browse books by topic - {categories.length} categories available</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {categories.map((category) => {
            const categoryBooks = getBooksByCategory(category.id);

            return (
              <div
                key={category.id}
                className="bg-white rounded-lg p-3 hover:shadow-md transition-all border border-gray-200 hover:border-orange-300 text-center group"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
                  <a href={`/categories/${category.slug}`}>
                    {category.name}
                  </a>
                </h3>

                {category.description && (
                  <p className="text-gray-600 text-xs mb-1 line-clamp-2">
                    {category.description}
                  </p>
                )}

                <p className="text-xs text-gray-600 mb-1">
                  {categoryBooks.length} {categoryBooks.length === 1 ? 'book' : 'books'}
                </p>

                <a
                  href={`/categories/${category.slug}`}
                  className="inline-block text-orange-500 hover:text-orange-600 font-semibold text-xs transition-colors"
                >
                  Browse →
                </a>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}