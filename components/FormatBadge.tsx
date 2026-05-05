interface FormatBadgeProps {
  format: string;
  className?: string;
}

export default function FormatBadge({ format, className = '' }: FormatBadgeProps) {
  const formatColors: Record<string, string> = {
    'Kindle': 'bg-orange-100 text-orange-800',
    'Hardcover': 'bg-purple-100 text-purple-800',
    'Paperback': 'bg-blue-100 text-blue-800',
    'Audiobook': 'bg-green-100 text-green-800',
    'Audio CD': 'bg-teal-100 text-teal-800',
    'Spiral Bound': 'bg-pink-100 text-pink-800',
  };

  const colorClass = formatColors[format] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colorClass} ${className}`}>
      {format}
    </span>
  );
}