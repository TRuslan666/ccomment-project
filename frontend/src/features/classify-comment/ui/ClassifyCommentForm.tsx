import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Alert, App, Button, Card, Divider, Form, Input, Space, Typography } from 'antd'
import type { Rule } from 'antd/es/form'
import { CheckOutlined, CommentOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH, useHistoryStore } from '@/entities/classification'
import type { ClassificationResult as ClassificationResultData } from '@/entities/classification'
import { ROUTES } from '@/shared/config/routes'
import { useClassifyComment } from '../model/useClassifyComment'
import { ClassificationResult } from './ClassificationResult'

const { TextArea } = Input
const { Text } = Typography

interface ClassifyFormValues {
  comment: string
}

/** Правила проверки текста. Пробелы по краям не считаются символами. */
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

/** Форма ввода текста и блок результата. Вся логика состояния — в хуке useClassifyComment. */
export function ClassifyCommentForm() {
  const [form] = Form.useForm<ClassifyFormValues>()
  const { state, submit, reset } = useClassifyComment()
  const { addItem } = useHistoryStore()
  const { message } = App.useApp()
  // результат, который уже сохранён в историю: для нового результата кнопка снова активна
  const [savedResult, setSavedResult] = useState<ClassificationResultData | null>(null)
  const isLoading = state.status === 'loading'

  const handleFinish = (values: ClassifyFormValues) => submit(values.comment)

  const handleReset = () => {
    form.resetFields()
    reset()
  }

  const handleSave = (result: ClassificationResultData) => {
    addItem(result)
    setSavedResult(result)
    message.success('Результат сохранён в историю')
  }

  // Ctrl+Enter (или Cmd+Enter) отправляет форму, обычный Enter — перенос строки
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
          <Space style={{ marginTop: 16 }} wrap>
            {savedResult === state.result ? (
              <>
                <Button icon={<CheckOutlined />} disabled>
                  Сохранено
                </Button>
                <Link to={ROUTES.history}>Открыть историю</Link>
              </>
            ) : (
              <Button icon={<SaveOutlined />} onClick={() => handleSave(state.result)}>
                Сохранить в историю
              </Button>
            )}
          </Space>
        </>
      )}
    </Card>
  )
}