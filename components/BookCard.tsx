import Link from 'next/link';
import categories from '../lib/data/categories.json';

interface BookCardProps {
  book: {
    id: number;
    slug: string;
    title: string;
    author: string;
    price: string;
    coverImage: string;
    categories: number[];
    formats: string[];
  };
}

export default function BookCard({ book }: BookCardProps) {
  // Get unique category names
  const bookCategories = book.categories
    .map((catId) => categories.find((cat) => cat.id === catId))
    .filter((cat): cat is NonNullable<typeof cat> => cat !== undefined)
    .filter((category, index, self) =>
      index === self.findIndex((c) => c.id === category.id)
    );

  return (
    <Link href={`/books/${book.slug}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-orange-300 transition-all duration-300 h-full flex flex-col cursor-pointer group w-full max-w-[180px]">
        {/* Book Cover - Fixed width to match book cover */}
        <div className="relative w-full aspect-[2/3] bg-gray-100 flex items-center justify-center p-2 group-hover:bg-gray-50 transition-colors overflow-hidden">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full text-gray-400 text-xs">
              No cover
            </div>
          )}
        </div>

        {/* Book Info - Compact */}
        <div className="p-2 flex flex-col flex-grow">
          {/* Title - Compact */}
          <h3 className="text-xs font-bold text-gray-900 mb-1 line-clamp-2 min-h-[2rem] group-hover:text-orange-500 transition-colors">
            {book.title}
          </h3>

          {/* Formats - Tiny */}
          {book.formats && book.formats.length > 0 && (
            <div className="text-xs text-green-600 mb-1 font-medium">
              {book.formats.slice(0, 2).join(', ')}
              {book.formats.length > 2 && <span className="text-gray-400"> +{book.formats.length - 2}</span>}
            </div>
          )}

          {/* Author - Tiny */}
          <p className="text-xs text-gray-700 mb-1">{book.author}</p>

          {/* Pricing - Compact */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-green-600">{book.price}</span>
          </div>

          {/* Button - Compact */}
          <div className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white px-2 py-1 rounded text-xs font-semibold transition-all flex items-center justify-center gap-1 group-hover:shadow-sm">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}