import type { ReactNode } from 'react'
import { CommentOutlined, DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import type { Sentiment } from '../model/types'

interface SentimentView {
  label: string
  color: 'success' | 'error' | 'default'
  status: 'success' | 'error' | 'info'
  icon: ReactNode
}

export const SENTIMENT_VIEW: Record<Sentiment, SentimentView> = {
  positive: { label: 'Положительный', color: 'success', status: 'success', icon: <LikeOutlined /> },
  negative: { label: 'Отрицательный', color: 'error', status: 'error', icon: <DislikeOutlined /> },
  neutral: { label: 'Нейтральный', color: 'default', status: 'info', icon: <CommentOutlined /> },
}