export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "California, USA",
      text: "Searching for Health has been an incredible resource for me. I've discovered so many books that have completely changed my approach to health and wellness. The recommendations are always spot-on!",
      rating: 5
    },
    {
      name: "John D.",
      location: "Texas, USA",
      text: "As someone who's been on a health journey for years, I wish I had found this site sooner. The curated selection of books is unmatched, and I've learned more in the past 6 months than in the previous 6 years.",
      rating: 5
    },
    {
      name: "Emily R.",
      location: "New York, USA",
      text: "The health coaches directory helped me find the perfect practitioner for my needs. I'm now working with someone who truly understands my health goals. Thank you for creating such a valuable resource!",
      rating: 5
    },
    {
      name: "Michael T.",
      location: "Florida, USA",
      text: "I was skeptical at first, but this site has become my go-to for health information. The books recommended here have helped me overcome chronic health issues that I thought were permanent.",
      rating: 5
    },
    {
      name: "Lisa K.",
      location: "Washington, USA",
      text: "The variety of topics covered is amazing. From nutrition to mental health to natural remedies, there's something for everyone. I've recommended this site to all my friends and family.",
      rating: 5
    },
    {
      name: "David P.",
      location: "Colorado, USA",
      text: "Finding quality health information can be overwhelming, but Searching for Health makes it easy. The books are well-researched and the recommendations are trustworthy. A true gem in the health space.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">What Our Readers Say</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who have transformed their health journey with Searching for Health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Health Journey?</h2>
            <p className="text-white/90 mb-6">
              Join thousands of readers who have transformed their health with our curated collection
            </p>
            <a
              href="/books"
              className="inline-block bg-white text-orange-500 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Our Collection
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}