import { Alert, Typography } from 'antd'
import { ClassifyCommentForm } from '@/features/classify-comment'

const { Title, Paragraph } = Typography

export function ClassifyPage() {
  return (
    <div>
      <Title level={2}>Классификатор комментариев</Title>
      <Paragraph type="secondary">
        Введите текст отзыва или комментария. На этом этапе используется демонстрационный алгоритм на основе
        ключевых слов. Реальная модель появится после интеграции с backend.
      </Paragraph>

      <Alert
        type="info"
        showIcon
        message="Демо-режим"
        description="Результаты генерируются локально. Сохранённые записи хранятся только в памяти браузера и пропадают при перезагрузке страницы. Сохранение на сервере и авторизация — в следующих лабораторных."
        style={{ marginBottom: 24 }}
      />

      <ClassifyCommentForm />
    </div>
  )
}