import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🛍️</span>
              <span className="text-lg font-bold text-white">My Online Store</span>
            </div>
            <p className="text-sm text-gray-400">
              Quality products, curated categories, and honest customer reviews.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">About</h3>
            <p className="text-sm text-gray-400">
              Built with Next.js and Cosmic. A modern e-commerce experience.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-800 text-sm text-gray-500">
          &copy; {year} My Online Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}