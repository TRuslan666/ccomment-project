export type Sentiment = 'positive' | 'negative' | 'neutral'

export interface ClassificationResult {
  text: string
  sentiment: Sentiment
  confidence: number
  keywords: string[]
}

export interface HistoryItem {
  id: number
  text: string
  sentiment: Sentiment
  confidence: number
  createdAt: string
}