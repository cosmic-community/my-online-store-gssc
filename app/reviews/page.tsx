import { getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata = {
  title: 'Reviews | My Online Store',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  const avgRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum, r) => sum + (typeof r.metadata?.rating === 'number' ? r.metadata.rating : 0),
          0
        ) / reviews.length
      : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
      {reviews.length > 0 && (
        <p className="text-gray-600 mb-8">
          {avgRating.toFixed(1)} average rating across {reviews.length}{' '}
          {reviews.length === 1 ? 'review' : 'reviews'}
        </p>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">⭐</div>
          <p className="text-gray-600">No reviews yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct />
          ))}
        </div>
      )}
    </div>
  )
}