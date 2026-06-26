import { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  if (!review) return null

  const reviewer = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous'
  const title = getMetafieldValue(review.metadata?.review_title)
  const text = getMetafieldValue(review.metadata?.review_text)
  const rating = typeof review.metadata?.rating === 'number' ? review.metadata.rating : 0
  const date = getMetafieldValue(review.metadata?.date_submitted)
  const product = review.metadata?.product
  const productName = product ? getMetafieldValue(product.metadata?.name) || product.title : ''

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={rating} size="sm" />
        {date && <span className="text-xs text-gray-400">{date}</span>}
      </div>
      {title && <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>}
      {text && <p className="text-sm text-gray-600 leading-relaxed">{text}</p>}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">— {reviewer}</span>
        {showProduct && productName && (
          <span className="text-xs text-brand-600 font-medium">{productName}</span>
        )}
      </div>
    </div>
  )
}