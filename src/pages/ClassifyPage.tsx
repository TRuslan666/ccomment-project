import { useState } from 'react'
import { Typography, Form, Input, Button, Card, Result, Tag, Space, Alert, Divider } from 'antd'
import { CommentOutlined, LikeOutlined, DislikeOutlined, ReloadOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

type Sentiment = 'positive' | 'negative' | 'neutral'

interface ClassificationResult {
  text: string
  sentiment: Sentiment
  confidence: number
  keywords: string[]
}

const positiveWords = [
  'хорошо', 'отлично', 'супер', 'класс', 'люблю', 'нравится', 'рекомендую',
  'прекрасно', 'замечательно', 'удобно', 'быстро', 'качественно', 'спасибо',
  'good', 'great', 'excellent', 'love', 'awesome', 'perfect', 'amazing',
]

const negativeWords = [
  'плохо', 'ужасно', 'отвратительно', 'не нравится', 'ненавижу', 'обман',
  'медленно', 'дорого', 'сломалось', 'не работает', 'разочарован', 'кошмар',
  'bad', 'terrible', 'awful', 'hate', 'worst', 'broken', 'disappointing',
]

function classifyText(text: string): ClassificationResult {
  const lower = text.toLowerCase()
  let posScore = 0
  let negScore = 0
  const found: string[] = []

  for (const w of positiveWords) {
    if (lower.includes(w)) {
      posScore += 1
      found.push(w)
    }
  }
  for (const w of negativeWords) {
    if (lower.includes(w)) {
      negScore += 1
      found.push(w)
    }
  }

  let sentiment: Sentiment = 'neutral'
  let confidence = 0.5

  if (posScore > negScore) {
    sentiment = 'positive'
    confidence = Math.min(0.95, 0.55 + posScore * 0.12)
  } else if (negScore > posScore) {
    sentiment = 'negative'
    confidence = Math.min(0.95, 0.55 + negScore * 0.12)
  } else if (posScore === 0 && negScore === 0) {
    sentiment = 'neutral'
    confidence = 0.4
  }

  return {
    text,
    sentiment,
    confidence: Math.round(confidence * 100) / 100,
    keywords: found.slice(0, 5),
  }
}

export default function ClassifyPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ClassificationResult | null>(null)

  const onFinish = (values: { comment: string }) => {
    setLoading(true)
    setTimeout(() => {
      const res = classifyText(values.comment)
      setResult(res)
      setLoading(false)
    }, 600)
  }

  const handleReset = () => {
    form.resetFields()
    setResult(null)
  }

  const sentimentConfig = {
    positive: { color: 'success', icon: <LikeOutlined />, label: 'Положительный' },
    negative: { color: 'error', icon: <DislikeOutlined />, label: 'Отрицательный' },
    neutral: { color: 'default', icon: <CommentOutlined />, label: 'Нейтральный' },
  }

  return (
    <div>
      <Title level={2}>Классификатор комментариев</Title>
      <Paragraph type="secondary">
        Введите текст отзыва или комментария. На этом этапе используется демонстрационный
        алгоритм на основе ключевых слов. Реальная модель появится после интеграции с backend.
      </Paragraph>

      <Alert
        type="info"
        showIcon
        message="Демо-режим"
        description="Результаты генерируются локально и не сохраняются. Авторизация и история — в следующих лабораторных."
        style={{ marginBottom: 24 }}
      />

      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="comment"
            label="Текст комментария / отзыва"
            rules={[
              { required: true, message: 'Введите текст' },
              { min: 5, message: 'Минимум 5 символов' },
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Например: Товар отличный, доставка быстрая, очень рекомендую!"
              showCount
              maxLength={1000}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<CommentOutlined />}
                size="large"
              >
                Классифицировать
              </Button>
              {result && (
                <Button icon={<ReloadOutlined />} onClick={handleReset} size="large">
                  Новый запрос
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>

        {result && (
          <>
            <Divider />
            <Result
              status={
                result.sentiment === 'positive'
                  ? 'success'
                  : result.sentiment === 'negative'
                    ? 'error'
                    : 'info'
              }
              title={
                <Space>
                  {sentimentConfig[result.sentiment].icon}
                  {sentimentConfig[result.sentiment].label}
                </Space>
              }
              subTitle={
                <Text>
                  Уверенность модели: <strong>{(result.confidence * 100).toFixed(0)}%</strong>
                </Text>
              }
              extra={
                result.keywords.length > 0 && (
                  <Space wrap>
                    <Text type="secondary">Ключевые слова:</Text>
                    {result.keywords.map((k) => (
                      <Tag key={k} color={sentimentConfig[result.sentiment].color}>
                        {k}
                      </Tag>
                    ))}
                  </Space>
                )
              }
            />
            <Card type="inner" title="Исходный текст" size="small">
              <Paragraph style={{ marginBottom: 0 }}>{result.text}</Paragraph>
            </Card>
          </>
        )}
      </Card>
    </div>
  )
}
