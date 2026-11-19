import { Typography, Table, Card, Empty, Space, Button } from 'antd'
import { HistoryOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { SentimentTag } from '@/entities/classification'
import type { HistoryItem } from '@/entities/classification'
import { formatDateTime } from '@/shared/lib/formatDateTime'

const { Title, Paragraph, Text } = Typography

const demoHistory: HistoryItem[] = [
  {
    id: 1,
    text: 'Товар отличный, доставка быстрая, очень рекомендую!',
    sentiment: 'positive',
    confidence: 0.91,
    createdAt: '2026-09-18T14:32:00',
  },
  {
    id: 2,
    text: 'Качество ужасное, сломалось через неделю. Не рекомендую.',
    sentiment: 'negative',
    confidence: 0.87,
    createdAt: '2026-09-17T09:15:00',
  },
  {
    id: 3,
    text: 'Нормальный товар, ничего особенного.',
    sentiment: 'neutral',
    confidence: 0.52,
    createdAt: '2026-09-16T21:40:00',
  },
  {
    id: 4,
    text: 'Супер сервис, всё понравилось, буду заказывать ещё!',
    sentiment: 'positive',
    confidence: 0.94,
    createdAt: '2026-09-15T11:05:00',
  },
  {
    id: 5,
    text: 'Долго ждал, поддержка не отвечает, разочарован.',
    sentiment: 'negative',
    confidence: 0.79,
    createdAt: '2026-09-14T16:22:00',
  },
]

const columns: ColumnsType<HistoryItem> = [
  {
    title: 'Дата',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 160,
    responsive: ['md'],
    render: (value: string) => formatDateTime(value),
  },
  {
    title: 'Текст',
    dataIndex: 'text',
    key: 'text',
    ellipsis: true,
    render: (text: string) => (
      <Text style={{ maxWidth: 360 }} ellipsis={{ tooltip: text }}>
        {text}
      </Text>
    ),
  },
  {
    title: 'Тональность',
    dataIndex: 'sentiment',
    key: 'sentiment',
    width: 160,
    render: (sentiment: HistoryItem['sentiment']) => <SentimentTag sentiment={sentiment} />,
  },
  {
    title: 'Уверенность',
    dataIndex: 'confidence',
    key: 'confidence',
    width: 120,
    responsive: ['sm'],
    render: (val: number) => `${(val * 100).toFixed(0)}%`,
  },
]

export default function HistoryPage() {
  return (
    <div>
      <Title level={2}>
        <Space>
          <HistoryOutlined />
          История классификаций
        </Space>
      </Title>
      <Paragraph type="secondary">
        Здесь отображается история ваших запросов. На текущем этапе используются демонстрационные
        данные. После реализации backend и авторизации (лабораторные №2–5) здесь будут реальные результаты.
      </Paragraph>

      <Card>
        {demoHistory.length === 0 ? (
          <Empty description="История пуста">
            <Link to="/classify">
              <Button type="primary">Сделать первую классификацию</Button>
            </Link>
          </Empty>
        ) : (
          <Table
            columns={columns}
            dataSource={demoHistory}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            size="middle"
          />
        )}
      </Card>
    </div>
  )
}