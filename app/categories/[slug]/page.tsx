import { notFound } from 'next/navigation';
import categories from '../../../lib/data/categories.json';
import books from '../../../lib/data/books.json';
import BookCard from '../../../components/BookCard';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Get category data by slug
function getCategoryBySlug(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}

// Get books by category ID
function getBooksByCategory(categoryId: number) {
  return books.filter((book) => book.categories.includes(categoryId));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryBooks = getBooksByCategory(category.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{category.name}</h1>
          {category.description && (
            <p className="text-sm text-gray-600 mb-1">{category.description}</p>
          )}
          <p className="text-xs text-gray-500">
            {categoryBooks.length} {categoryBooks.length === 1 ? 'book' : 'books'} in this category
          </p>
        </div>

        {/* Books Grid */}
        {categoryBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {categoryBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 text-sm">No books found in this category.</p>
            <a href="/books" className="text-orange-500 hover:text-orange-600 mt-2 inline-block text-xs">
              Browse all books
            </a>
          </div>
        )}
      </main>
    </div>
  );
}