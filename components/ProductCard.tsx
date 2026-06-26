import Link from 'next/link'
import { Product } from '@/types'
import { getMetafieldValue, formatPrice } from '@/lib/cosmic'
import InventoryBadge from '@/components/InventoryBadge'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) return null

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const image = product.metadata?.featured_image
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const hasSale =
    typeof salePrice === 'number' && salePrice > 0 && typeof price === 'number' && salePrice < price

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        {image ? (
          <img
            src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            🛍️
          </div>
        )}
        {hasSale && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            SALE
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate group-hover:text-brand-600 transition-colors">
          {name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          {hasSale ? (
            <>
              <span className="text-lg font-bold text-red-600">{formatPrice(salePrice)}</span>
              <span className="text-sm text-gray-400 line-through">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span>
          )}
        </div>
        <div className="mt-3">
          <InventoryBadge status={product.metadata?.inventory_status} />
        </div>
      </div>
    </Link>
  )
}