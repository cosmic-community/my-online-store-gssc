import Link from 'next/link'
import { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  if (!category) return null

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.category_image

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block rounded-2xl overflow-hidden h-56 bg-gray-200"
    >
      {image ? (
        <img
          src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl bg-gradient-to-br from-brand-100 to-brand-200">
          🏷️
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        {description && (
          <p className="text-sm text-gray-200 mt-1 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}