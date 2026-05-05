import { notFound } from 'next/navigation';
import books from '../../../lib/data/books.json';
import categories from '../../../lib/data/categories.json';

interface BookPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all books
export async function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }));
}

// Get book data by slug
function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug);
}

// Get category data by ID
function getCategoryById(id: number) {
  return categories.find((cat) => cat.id === id);
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  // Get unique categories
  const bookCategories = book.categories
    .map((catId) => getCategoryById(catId))
    .filter((cat): cat is NonNullable<typeof cat> => cat !== undefined)
    .filter((category, index, self) =>
      index === self.findIndex((c) => c.id === category.id)
    );

  // Get unique tags
  const uniqueTags = book.tags && book.tags.length > 0
    ? Array.from(new Set(book.tags))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="flex flex-col md:flex-row">
            {/* Book Cover - Compact */}
            <div className="md:w-40 flex-shrink-0">
              <div className="h-56 md:h-full bg-gray-100 flex items-center justify-center p-3">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400 text-xs">No cover</div>
                )}
              </div>
            </div>

            {/* Book Details - Compact */}
            <div className="flex-1 p-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h1>
                  {book.subtitle && (
                    <h2 className="text-xs text-gray-600 mb-1">{book.subtitle}</h2>
                  )}
                  <p className="text-xs text-gray-700">by {book.author}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-green-600">{book.price}</span>
                </div>
              </div>

              {/* Format Badges */}
              {book.formats && book.formats.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {book.formats.map((format) => (
                    <span
                      key={format}
                      className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              )}

              {/* Categories and Tags */}
              <div className="flex flex-wrap gap-3 mb-3 text-xs">
                {bookCategories.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700">Categories:</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {bookCategories.map((category) => (
                        <a
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className="text-orange-500 hover:text-orange-600"
                        >
                          {category.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {uniqueTags.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700">Tags:</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {uniqueTags.map((tag) => (
                        <a
                          key={tag}
                          href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-orange-500 hover:text-orange-600"
                        >
                          {tag}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Description</h3>
                <div
                  className="prose prose-xs max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: book.description }}
                />
              </div>

              {/* Book Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs">
                {book.isbn && (
                  <div>
                    <span className="font-semibold text-gray-700">ISBN:</span>
                    <p className="text-gray-900">{book.isbn}</p>
                  </div>
                )}
                {book.publisher && (
                  <div>
                    <span className="font-semibold text-gray-700">Publisher:</span>
                    <p className="text-gray-900">{book.publisher}</p>
                  </div>
                )}
                {book.publishDate && (
                  <div>
                    <span className="font-semibold text-gray-700">Published:</span>
                    <p className="text-gray-900">{book.publishDate}</p>
                  </div>
                )}
                {book.pages > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700">Pages:</span>
                    <p className="text-gray-900">{book.pages}</p>
                  </div>
                )}
                {book.language && (
                  <div>
                    <span className="font-semibold text-gray-700">Language:</span>
                    <p className="text-gray-900">{book.language}</p>
                  </div>
                )}
              </div>

              {/* Affiliate Links */}
              <div className="border-t border-gray-200 pt-3">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Buy This Book</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {book.affiliateLinks.amazon && (
                    <a
                      href={book.affiliateLinks.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold py-1.5 px-3 rounded text-xs transition-all"
                    >
                      Amazon
                    </a>
                  )}

                  {book.affiliateLinks.amazonKindle && (
                    <a
                      href={book.affiliateLinks.amazonKindle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold py-1.5 px-3 rounded text-xs transition-all"
                    >
                      Kindle
                    </a>
                  )}

                  {book.affiliateLinks.barnesNoble && (
                    <a
                      href={book.affiliateLinks.barnesNoble}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold py-1.5 px-3 rounded text-xs transition-all"
                    >
                      Barnes & Noble
                    </a>
                  )}

                  {book.affiliateLinks.appleBooks && (
                    <a
                      href={book.affiliateLinks.appleBooks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold py-1.5 px-3 rounded text-xs transition-all"
                    >
                      Apple Books
                    </a>
                  )}

                  {book.affiliateLinks.bookshop && (
                    <a
                      href={book.affiliateLinks.bookshop}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold py-1.5 px-3 rounded text-xs transition-all"
                    >
                      Bookshop
                    </a>
                  )}

                  {book.affiliateLinks.lifeway && (
                    <a
                      href={book.affiliateLinks.lifeway}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold py-1.5 px-3 rounded text-xs transition-all"
                    >
                      Lifeway
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}