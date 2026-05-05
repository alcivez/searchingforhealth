export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>

          <div className="prose prose-lg max-w-none">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
              <p className="text-orange-800 font-semibold">
                Please read this disclaimer carefully before using this website.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">General Information</h2>

            <p className="text-gray-700 mb-4">
              The content provided on Searching for Health is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Not Medical Advice</h3>
            <p className="text-gray-700 mb-4">
              The information, books, and resources presented on this website are not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">No Health Claims</h3>
            <p className="text-gray-700 mb-4">
              Searching for Health does not make any health claims or guarantees about the effectiveness of any treatments, supplements, or health strategies discussed in the books or content featured on this website. Individual results may vary.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Consultation</h3>
            <p className="text-gray-700 mb-4">
              Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you think you may have a medical emergency, call your doctor or emergency services immediately.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Book Content</h3>
            <p className="text-gray-700 mb-4">
              The books featured on this website represent the views and opinions of their respective authors. Inclusion of a book does not constitute an endorsement by Searching for Health of its contents or recommendations.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Accuracy of Information</h3>
            <p className="text-gray-700 mb-4">
              While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on this website.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
            <p className="text-gray-700 mb-4">
              In no event shall Searching for Health be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of this website or the information provided herein.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">External Links</h3>
            <p className="text-gray-700 mb-4">
              This website may contain links to external websites that are not provided or maintained by or in any way affiliated with Searching for Health. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>

            <p className="text-gray-700 mb-4">
              By using this website, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}