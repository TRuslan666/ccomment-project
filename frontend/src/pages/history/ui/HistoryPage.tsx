import { Space, Typography } from 'antd'
import { HistoryOutlined } from '@ant-design/icons'
import { DeleteHistoryItemButton } from '@/features/delete-history-item'
import { HistoryView } from '@/features/view-history'

const { Title, Paragraph } = Typography

export function HistoryPage() {
  return (
    <div>
      <Title level={2}>
        <Space>
          <HistoryOutlined />
          История классификаций
        </Space>
      </Title>
      <Paragraph type="secondary">
        Здесь отображается история запросов. На текущем этапе она хранится в памяти браузера и сбрасывается при
        перезагрузке страницы. После подключения backend и авторизации здесь будут записи из базы данных.
      </Paragraph>

      <HistoryView renderRowActions={(item) => <DeleteHistoryItemButton item={item} />} />
    </div>
  )
}