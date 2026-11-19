import type { HistoryItem } from '@/entities/classification'
import type { HistoryFilters } from './types'

export function filterHistory(items: HistoryItem[], { sentiment, query }: HistoryFilters): HistoryItem[] {
  const needle = query.trim().toLowerCase()
  return items.filter(
    (item) =>
      (sentiment === 'all' || item.sentiment === sentiment) &&
      (needle === '' || item.text.toLowerCase().includes(needle)),
  )
}