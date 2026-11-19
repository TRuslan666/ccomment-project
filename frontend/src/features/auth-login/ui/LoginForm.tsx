import { useState } from 'react'
import { Alert, App, Button, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { normalizeEmail, userFormRules } from '@/entities/user'
import { ROUTES } from '@/shared/config/routes'
import { FadeIn } from '@/shared/ui/FadeIn'
import { DEMO_ACCOUNT, login } from '../api/login'
import type { LoginFormValues } from '../model/types'

const { Text } = Typography

const ERROR_MESSAGES = {
  invalid_credentials: 'Неверный email или пароль',
} as const

export function LoginForm() {
  const [form] = Form.useForm<LoginFormValues>()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFinish = async (values: LoginFormValues) => {
    setSubmitting(true)
    setError(null)
    const result = await login(values)
    setSubmitting(false)

    if (result.ok) {
      message.success(`Добро пожаловать, ${result.user.name}!`)
      navigate(ROUTES.classify)
    } else {
      setError(ERROR_MESSAGES[result.reason])
    }
  }

  return (
    <>
      <Alert
        type="info"
        showIcon
        message="Демо-режим"
        description={
          <>
            Войти можно с <Text code>{DEMO_ACCOUNT.email}</Text> и паролем <Text code>{DEMO_ACCOUNT.password}</Text>.
            Любые другие данные считаются неверными.
          </>
        }
        style={{ marginBottom: 16 }}
      />

      {error && (
        <FadeIn>
          <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />
        </FadeIn>
      )}

      <Form<LoginFormValues>
        form={form}
        name="login"
        layout="vertical"
        size="large"
        autoComplete="off"
        onFinish={handleFinish}
        onValuesChange={() => setError(null)}
        validateTrigger={['onChange', 'onBlur']}
      >
        <Form.Item name="email" label="Email" rules={userFormRules.email} normalize={normalizeEmail}>
          <Input prefix={<UserOutlined />} placeholder="user@example.com" disabled={submitting} />
        </Form.Item>

        <Form.Item name="password" label="Пароль" rules={userFormRules.password}>
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" disabled={submitting} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={submitting}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
