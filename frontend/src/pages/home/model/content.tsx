import type { ReactNode } from 'react'
import { CommentOutlined, HistoryOutlined, SafetyOutlined } from '@ant-design/icons'

export interface Feature {
  icon: ReactNode
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    icon: <CommentOutlined style={{ fontSize: 28, color: '#1677ff' }} />,
    title: 'Классификация отзывов',
    description: 'Определяйте тональность комментариев: положительные или отрицательные.',
  },
  {
    icon: <SafetyOutlined style={{ fontSize: 28, color: '#52c41a' }} />,
    title: 'Авторизация',
    description: 'Безопасный вход и регистрация. История доступна только вам.',
  },
  {
    icon: <HistoryOutlined style={{ fontSize: 28, color: '#fa8c16' }} />,
    title: 'Сохранение истории',
    description: 'Все запросы и результаты сохраняются для последующего просмотра.',
  },
]

/** Основные пользовательские сценарии. */
export const SCENARIOS: string[] = [
  'Зарегистрироваться или войти в систему',
  'Ввести текст комментария / отзыва',
  'Получить классификацию (позитив / негатив)',
  'Просмотреть историю своих запросов',
]
