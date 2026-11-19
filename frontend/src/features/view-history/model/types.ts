import type { Sentiment } from '@/entities/classification'

export type DemoScenario = 'normal' | 'error' | 'empty'

export type SentimentFilter = 'all' | Sentiment

export interface HistoryFilters {
  sentiment: SentimentFilter
  query: string
}