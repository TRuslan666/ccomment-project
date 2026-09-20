import { Typography, Card, Row, Col, Button, Space, List } from 'antd'
import { CommentOutlined, SafetyOutlined, HistoryOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

const features = [
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

const scenarios = [
  'Зарегистрироваться или войти в систему',
  'Ввести текст комментария / отзыва',
  'Получить классификацию (позитив / негатив)',
  'Просмотреть историю своих запросов',
]

export default function HomePage() {
  return (
    <div>
      <Title level={2} style={{ textAlign: 'center' }}>
        Классификатор комментариев
      </Title>
      <Paragraph type="secondary" style={{ fontSize: 16, textAlign: 'center' }}>
        Приложение для автоматического определения тональности отзывов и комментариев.
        Положительные и отрицательные отзывы разделяются, результаты сохраняются в истории.
      </Paragraph>

      <Title level={4} style={{ marginTop: 32, textAlign: 'center' }}>
        Возможности
      </Title>
      <Row gutter={[16, 16]}>
        {features.map((f) => (
          <Col md={8} key={f.title}>
            <Card hoverable style={{ height: '100%' }}>
              <Space direction="vertical" size="middle">
                {f.icon}
                <Text strong style={{ fontSize: 16 }}>
                  {f.title}
                </Text>
                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  {f.description}
                </Paragraph>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={4} style={{ marginTop: 40 }}>
        Основные пользовательские сценарии
      </Title>
      <List
        dataSource={scenarios}
        renderItem={(item, index) => (
          <List.Item>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>
                {index + 1}. {item}
              </Text>
            </Space>
          </List.Item>
        )}
      />

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <Space size="middle" wrap>
          <Link to="/classify">
          </Link>
          <Link to="/register">
          </Link>
        </Space>
      </div>
    </div>
  )
}
