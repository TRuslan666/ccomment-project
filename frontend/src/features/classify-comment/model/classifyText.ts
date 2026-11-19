import type { ClassificationResult, Sentiment } from '@/entities/classification'

const POSITIVE_STEMS = [
  'хорош', 'отличн', 'супер', 'класс', 'люблю', 'нравится', 'рекомендую', 'прекрасн',
  'замечательн', 'удобн', 'быстр', 'качественн', 'спасибо', 'довольн',
  'good', 'great', 'excellent', 'love', 'awesome', 'perfect', 'amazing',
]

const NEGATIVE_STEMS = [
  'не рекомендую', 'не нравится', 'не работает', 'не советую', 'плох', 'ужасн', 'отвратительн',
  'ненавижу', 'обман', 'медленн', 'дорого', 'сломал', 'разочарован', 'кошмар',
  'bad', 'terrible', 'awful', 'hate', 'worst', 'broken', 'disappointing',
]

const MAX_KEYWORDS = 5

export function classifyText(text: string): ClassificationResult {
  let rest = text.toLowerCase()
  const found: string[] = []

  let negScore = 0
  for (const stem of NEGATIVE_STEMS) {
    if (rest.includes(stem)) {
      negScore += 1
      found.push(stem)
      rest = rest.split(stem).join(' ')
    }
  }

  let posScore = 0
  for (const stem of POSITIVE_STEMS) {
    if (rest.includes(stem)) {
      posScore += 1
      found.push(stem)
    }
  }

  let sentiment: Sentiment = 'neutral'
  let confidence = 0.4

  if (posScore > negScore) {
    sentiment = 'positive'
    confidence = Math.min(0.95, 0.55 + posScore * 0.12)
  } else if (negScore > posScore) {
    sentiment = 'negative'
    confidence = Math.min(0.95, 0.55 + negScore * 0.12)
  } else if (posScore > 0) {
    confidence = 0.5
  }

  return {
    text,
    sentiment,
    confidence: Math.round(confidence * 100) / 100,
    keywords: found.slice(0, MAX_KEYWORDS),
  }
}