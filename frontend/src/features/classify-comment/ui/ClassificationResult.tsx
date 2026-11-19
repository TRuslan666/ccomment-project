import { Card, Progress, Result, Space, Tag, Typography } from 'antd'
import { SENTIMENT_VIEW } from '@/entities/classification'
import type { ClassificationResult as ClassificationResultData } from '@/entities/classification'
import { FadeIn } from '@/shared/ui/FadeIn'

const { Paragraph, Text } = Typography

interface ClassificationResultProps {
  result: ClassificationResultData
}

export function ClassificationResult({ result }: ClassificationResultProps) {
  const view = SENTIMENT_VIEW[result.sentiment]
  const percent = Math.round(result.confidence * 100)

  return (
    <FadeIn>
      <Result
        status={view.status}
        title={
          <Space>
            {view.icon}
            {view.label}
          </Space>
        }
        subTitle={
          <div style={{ maxWidth: 320, margin: '0 auto' }}>
            <Text>Уверенность модели: </Text>
            <Text strong>{percent}%</Text>
            <Progress percent={percent} showInfo={false} status={view.status === 'error' ? 'exception' : 'normal'} />
          </div>
        }
        extra={
          result.keywords.length > 0 ? (
            <Space wrap>
              <Text type="secondary">Ключевые слова:</Text>
              {result.keywords.map((keyword) => (
                <Tag key={keyword} color={view.color}>
                  {keyword}
                </Tag>
              ))}
            </Space>
          ) : (
            <Text type="secondary">Ключевые слова не найдены</Text>
          )
        }
      />
      <Card type="inner" title="Исходный текст" size="small">
        <Paragraph style={{ marginBottom: 0 }}>{result.text}</Paragraph>
      </Card>
    </FadeIn>
  )
}