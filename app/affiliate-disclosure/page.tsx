export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Affiliate Disclosure</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Affiliate Relationship Disclosure</h2>

            <p className="text-gray-700 mb-4">
              Searching for Health is a participant in various affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to partner websites.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Amazon Associates</h3>
            <p className="text-gray-700 mb-4">
              Searching for Health is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Other Affiliate Programs</h3>
            <p className="text-gray-700 mb-4">
              We may also participate in other affiliate programs with companies like Barnes & Noble, Apple Books, and other book retailers. When you click on links to these companies and make a purchase, we may receive a small commission at no additional cost to you.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Commitment to You</h3>
            <p className="text-gray-700 mb-4">
              We want to be transparent about our affiliate relationships. Our primary goal is to provide valuable information and resources to help you on your health journey. The commissions we earn help support the maintenance and operation of this website, allowing us to continue providing free content to our readers.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">No Additional Cost</h3>
            <p className="text-gray-700 mb-4">
              Please note that using our affiliate links does not result in any additional cost to you. The price you pay is the same as if you went directly to the retailer's website.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Independent Recommendations</h3>
            <p className="text-gray-700 mb-4">
              Our book recommendations and reviews are based on our genuine assessment of the content and value they provide. We do not recommend products solely for the purpose of earning commissions. Our editorial content is independent and not influenced by affiliate partnerships.
            </p>

            <p className="text-gray-700 mb-4">
              If you have any questions about our affiliate relationships or this disclosure, please don't hesitate to contact us.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}