import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Disclaimer */}
        <div className="text-center mb-4">
          <p className="text-gray-600 text-sm italic max-w-4xl mx-auto">
            *Disclaimer: The content on this website is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Link href="/terms" className="text-orange-400 hover:text-yellow-500 transition-colors text-sm">
            Terms of Use
          </Link>
          <Link href="/privacy" className="text-orange-400 hover:text-yellow-500 transition-colors text-sm">
            Privacy Policy
          </Link>
          <Link href="/affiliate-disclosure" className="text-orange-400 hover:text-yellow-500 transition-colors text-sm">
            Affiliate Disclosure
          </Link>
          <Link href="/disclaimer" className="text-orange-400 hover:text-yellow-500 transition-colors text-sm">
            Disclaimer
          </Link>
          <Link href="/contact" className="text-orange-400 hover:text-yellow-500 transition-colors text-sm">
            Contact Us
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-300 pt-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Searching for Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}