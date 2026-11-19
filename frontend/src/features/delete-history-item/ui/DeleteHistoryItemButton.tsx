import { App, Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useHistoryStore } from '@/entities/classification'
import type { HistoryItem } from '@/entities/classification'

interface DeleteHistoryItemButtonProps {
  item: HistoryItem
}

export function DeleteHistoryItemButton({ item }: DeleteHistoryItemButtonProps) {
  const { removeItem } = useHistoryStore()
  const { message } = App.useApp()

  const handleConfirm = () => {
    removeItem(item.id)
    message.success('Запись удалена')
  }

  return (
    <Popconfirm
      title="Удалить запись?"
      description="Действие нельзя отменить."
      okText="Удалить"
      cancelText="Отмена"
      okButtonProps={{ danger: true }}
      onConfirm={handleConfirm}
    >
      <Button type="text" danger icon={<DeleteOutlined />} aria-label={`Удалить запись ${item.id}`} />
    </Popconfirm>
  )
}