import type { ReactNode } from 'react'
import { Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { SentimentTag } from '@/entities/classification'
import type { HistoryItem } from '@/entities/classification'
import { formatDateTime } from '@/shared/lib/formatDateTime'

const { Text } = Typography

interface HistoryTableProps {
  items: HistoryItem[]
  highlightId: number | null
  renderRowActions?: (item: HistoryItem) => ReactNode
}

export function HistoryTable({ items, highlightId, renderRowActions }: HistoryTableProps) {
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
      render: (value: number) => `${Math.round(value * 100)}%`,
    },
  ]

  if (renderRowActions) {
    columns.push({
      title: '',
      key: 'actions',
      width: 70,
      align: 'center',
      render: (_, item) => renderRowActions(item),
    })
  }

  return (
    <Table<HistoryItem>
      columns={columns}
      dataSource={items}
      rowKey="id"
      pagination={{ pageSize: 5, hideOnSinglePage: true }}
      size="middle"
      rowClassName={(item) => (item.id === highlightId ? 'row-flash' : '')}
    />
  )
}