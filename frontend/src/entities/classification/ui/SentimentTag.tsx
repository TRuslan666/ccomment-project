import { Tag } from 'antd'
import { SENTIMENT_VIEW } from '../lib/sentimentConfig'
import type { Sentiment } from '../model/types'

interface SentimentTagProps {
  sentiment: Sentiment
}

export function SentimentTag({ sentiment }: SentimentTagProps) {
  const view = SENTIMENT_VIEW[sentiment]
  return (
    <Tag icon={view.icon} color={view.color}>
      {view.label}
    </Tag>
  )
}