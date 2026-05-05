import Link from 'next/link';

interface CategoryBadgeProps {
  category: {
    id: number;
    slug: string;
    name: string;
  };
  className?: string;
}

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs hover:bg-gray-200 transition-colors ${className}`}
    >
      {category.name}
    </Link>
  );
}