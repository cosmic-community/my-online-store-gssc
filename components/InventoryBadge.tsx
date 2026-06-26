import { getMetafieldValue } from '@/lib/cosmic'

export default function InventoryBadge({ status }: { status: unknown }) {
  const value = getMetafieldValue(status)
  if (!value) return null

  const lower = value.toLowerCase()
  let classes = 'bg-gray-100 text-gray-700'

  if (lower.includes('in stock')) {
    classes = 'bg-green-100 text-green-700'
  } else if (lower.includes('out')) {
    classes = 'bg-red-100 text-red-700'
  } else if (lower.includes('low')) {
    classes = 'bg-amber-100 text-amber-700'
  } else if (lower.includes('pre')) {
    classes = 'bg-blue-100 text-blue-700'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {value}
    </span>
  )
}