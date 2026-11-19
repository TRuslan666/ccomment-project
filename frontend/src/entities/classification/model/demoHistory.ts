import type { HistoryItem } from './types'

export const DEMO_HISTORY: HistoryItem[] = [
  { id: 1, text: 'Товар отличный, доставка быстрая, очень рекомендую!', sentiment: 'positive', confidence: 0.91, createdAt: '2026-09-18T14:32:00' },
  { id: 2, text: 'Качество ужасное, сломалось через неделю. Не рекомендую.', sentiment: 'negative', confidence: 0.87, createdAt: '2026-09-17T09:15:00' },
  { id: 3, text: 'Нормальный товар, ничего особенного.', sentiment: 'neutral', confidence: 0.52, createdAt: '2026-09-16T21:40:00' },
  { id: 4, text: 'Супер сервис, всё понравилось, буду заказывать ещё!', sentiment: 'positive', confidence: 0.94, createdAt: '2026-09-15T11:05:00' },
  { id: 5, text: 'Долго ждал, поддержка не отвечает, разочарован.', sentiment: 'negative', confidence: 0.79, createdAt: '2026-09-14T16:22:00' },
]