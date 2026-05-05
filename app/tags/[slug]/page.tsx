import { notFound } from 'next/navigation';
import books from '../../../lib/data/books.json';
import BookCard from '../../../components/BookCard';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

  return Array.from(tagMap.values());
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: tag.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Get tag data by slug
function getTagBySlug(slug: string) {
  const tags = getAllTags();
  return tags.find((tag) => tag.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase());
}

// Get books by tag
function getBooksByTag(tagName: string) {
  return books.filter((book) =>
    book.tags && book.tags.some(tag =>
      tag.toLowerCase().replace(/\s+/g, '-') === tagName.toLowerCase()
    )
  );
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const tagBooks = getBooksByTag(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{tag.name}</h1>
          <p className="text-xs text-gray-500">
            {tagBooks.length} {tagBooks.length === 1 ? 'book' : 'books'} with this tag
          </p>
        </div>

        {/* Books Grid */}
        {tagBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {tagBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 text-sm">No books found with this tag.</p>
            <a href="/books" className="text-orange-500 hover:text-orange-600 mt-2 inline-block text-xs">
              Browse all books
            </a>
          </div>
        )}
      </main>
    </div>
  );
}