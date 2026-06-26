// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getReviewsByProduct, getMetafieldValue, formatPrice } from '@/lib/cosmic'
import InventoryBadge from '@/components/InventoryBadge'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const sku = getMetafieldValue(product.metadata?.sku)
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const hasSale =
    typeof salePrice === 'number' && salePrice > 0 && typeof price === 'number' && salePrice < price
  const featuredImage = product.metadata?.featured_image
  const gallery = product.metadata?.gallery
  const category = product.metadata?.category
  const variantsRaw = product.metadata?.variants

  // Normalize variants into an array of strings
  let variants: string[] = []
  if (Array.isArray(variantsRaw)) {
    variants = variantsRaw.map((v) => getMetafieldValue(v)).filter(Boolean)
  } else if (typeof variantsRaw === 'string' && variantsRaw.trim()) {
    variants = variantsRaw
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
  }

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (typeof r.metadata?.rating === 'number' ? r.metadata.rating : 0), 0) /
        reviews.length
      : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/products" className="hover:text-brand-600">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
            {featuredImage ? (
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">
                🛍️
              </div>
            )}
          </div>
          {gallery && gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${name} ${i + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-sm font-medium text-brand-600 hover:text-brand-700 mb-2"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <StarRating rating={avgRating} size="sm" />
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          <div className="mt-5 flex items-center gap-3">
            {hasSale ? (
              <>
                <span className="text-3xl font-bold text-red-600">{formatPrice(salePrice)}</span>
                <span className="text-xl text-gray-400 line-through">{formatPrice(price)}</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">SALE</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">{formatPrice(price)}</span>
            )}
          </div>

          <div className="mt-4">
            <InventoryBadge status={product.metadata?.inventory_status} />
          </div>

          {description && (
            <div className="mt-6 prose prose-sm max-w-none text-gray-600">
              <p>{description}</p>
            </div>
          )}

          {variants.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Variants</h3>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-brand-500 cursor-pointer transition-colors"
                  >
                    {variant}
                  </span>
                ))}
              </div>
            </div>
          )}

          {sku && <p className="mt-6 text-sm text-gray-400">SKU: {sku}</p>}
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews {reviews.length > 0 && `(${reviews.length})`}
        </h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet for this product.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}