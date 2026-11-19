import { Button, Card, Col, List, Row, Space, Typography } from 'antd'
import { CheckCircleOutlined, CommentOutlined, SafetyOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/config/routes'
import { FEATURES, SCENARIOS } from '../model/content'

const { Title, Paragraph, Text } = Typography

export function HomePage() {
  return (
    <div>
      <Title level={2} style={{ textAlign: 'center' }}>
        Классификатор комментариев
      </Title>
      <Paragraph type="secondary" style={{ fontSize: 16, textAlign: 'center' }}>
        Приложение для автоматического определения тональности отзывов и комментариев. Положительные и
        отрицательные отзывы разделяются, результаты сохраняются в истории.
      </Paragraph>

      <Title level={4} style={{ marginTop: 32, textAlign: 'center' }}>
        Возможности
      </Title>
      <Row gutter={[16, 16]}>
        {FEATURES.map((feature) => (
          <Col md={8} key={feature.title}>
            <Card hoverable style={{ height: '100%' }}>
              <Space direction="vertical" size="middle">
                {feature.icon}
                <Text strong style={{ fontSize: 16 }}>
                  {feature.title}
                </Text>
                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  {feature.description}
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
        dataSource={SCENARIOS}
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
          <Link to={ROUTES.classify}>
            <Button type="primary" size="large" icon={<CommentOutlined />}>
              Попробовать классификатор
            </Button>
          </Link>
          <Link to={ROUTES.register}>
            <Button size="large" icon={<SafetyOutlined />}>
              Зарегистрироваться
            </Button>
          </Link>
        </Space>
      </div>
    </div>
  )
}
