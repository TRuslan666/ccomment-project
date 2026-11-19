import { Alert, Button, Card, Divider, Form, Input, Space, Typography } from 'antd'
import type { Rule } from 'antd/es/form'
import { CommentOutlined, ReloadOutlined } from '@ant-design/icons'
import type { KeyboardEvent } from 'react'
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '@/entities/classification'
import { useClassifyComment } from '../model/useClassifyComment'
import { ClassificationResult } from './ClassificationResult'

const { TextArea } = Input
const { Text } = Typography

interface ClassifyFormValues {
  comment: string
}

const commentRules: Rule[] = [
  { required: true, whitespace: true, message: 'Введите текст комментария' },
  {
    validator: (_, value: string | undefined) => {
      const length = value?.trim().length ?? 0
      if (length > 0 && length < COMMENT_MIN_LENGTH) {
        return Promise.reject(new Error(`Минимум ${COMMENT_MIN_LENGTH} символов, сейчас ${length}`))
      }
      return Promise.resolve()
    },
  },
]

export function ClassifyCommentForm() {
  const [form] = Form.useForm<ClassifyFormValues>()
  const { state, submit, reset } = useClassifyComment()
  const isLoading = state.status === 'loading'

  const handleFinish = (values: ClassifyFormValues) => submit(values.comment)

  const handleReset = () => {
    form.resetFields()
    reset()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') form.submit()
  }

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={handleFinish} validateTrigger={['onChange', 'onBlur']}>
        <Form.Item name="comment" label="Текст комментария / отзыва" rules={commentRules}>
          <TextArea
            rows={5}
            placeholder="Например: Товар отличный, доставка быстрая, очень рекомендую!"
            showCount
            maxLength={COMMENT_MAX_LENGTH}
            disabled={isLoading}
            onKeyDown={handleKeyDown}
          />
        </Form.Item>

        <Form.Item>
          <Space wrap>
            <Button type="primary" htmlType="submit" loading={isLoading} icon={<CommentOutlined />} size="large">
              Классифицировать
            </Button>
            {state.status !== 'idle' && (
              <Button icon={<ReloadOutlined />} onClick={handleReset} size="large" disabled={isLoading}>
                Новый запрос
              </Button>
            )}
            <Text type="secondary">Ctrl + Enter — отправить</Text>
          </Space>
        </Form.Item>
      </Form>

      {state.status === 'error' && (
        <Alert
          type="error"
          showIcon
          message="Ошибка"
          description={state.message}
          action={
            <Button size="small" onClick={() => form.submit()}>
              Повторить
            </Button>
          }
        />
      )}

      {state.status === 'success' && (
        <>
          <Divider />
          <ClassificationResult result={state.result} />
        </>
      )}
    </Card>
  )
}