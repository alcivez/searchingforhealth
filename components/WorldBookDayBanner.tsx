export default function WorldBookDayBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-3 rounded-lg">
      <div className="text-center">
        <h3 className="text-sm font-bold mb-0.5">📚 World Book Day</h3>
        <a
          href="/books"
          className="inline-block bg-white text-orange-500 px-2 py-1 rounded text-xs font-semibold hover:bg-gray-100 transition-colors"
        >
          Explore Books
        </a>
      </div>
    </div>
  );
}