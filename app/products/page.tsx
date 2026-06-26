import { getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: 'Products | My Online Store',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">All Products</h1>
      <p className="text-gray-600 mb-8">{products.length} {products.length === 1 ? 'product' : 'products'} available</p>

      {products.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🛍️</div>
          <p className="text-gray-600">No products available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}