import { useState } from 'react'
import { Alert, App, Button, Form, Input, Typography } from 'antd'
import type { Rule } from 'antd/es/form'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { normalizeEmail, userFormRules } from '@/entities/user'
import { ROUTES } from '@/shared/config/routes'
import { DEMO_TAKEN_EMAIL, register } from '../api/register'
import type { RegisterFormValues } from '../model/types'
import { PasswordStrength } from './PasswordStrength'

const { Text } = Typography

const confirmRules: Rule[] = [
  { required: true, message: 'Подтвердите пароль' },
  ({ getFieldValue }) => ({
    validator(_, value: string | undefined) {
      if (!value || getFieldValue('password') === value) return Promise.resolve()
      return Promise.reject(new Error('Пароли не совпадают'))
    },
  }),
]

export function RegisterForm() {
  const [form] = Form.useForm<RegisterFormValues>()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [submitting, setSubmitting] = useState(false)
  const password = Form.useWatch('password', form) ?? ''

  const handleFinish = async (values: RegisterFormValues) => {
    setSubmitting(true)
    const result = await register(values)
    setSubmitting(false)

    if (result.ok) {
      message.success('Регистрация прошла успешно. Теперь можно войти.')
      navigate(ROUTES.login)
    } else {
      form.setFields([{ name: 'email', errors: ['Этот email уже занят'] }])
      form.scrollToField('email')
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
            Адрес <Text code>{DEMO_TAKEN_EMAIL}</Text> считается занятым: так можно увидеть ошибку, которую вернёт
            сервер.
          </>
        }
        style={{ marginBottom: 16 }}
      />

      <Form<RegisterFormValues>
        form={form}
        name="register"
        layout="vertical"
        size="large"
        autoComplete="off"
        onFinish={handleFinish}
        validateTrigger={['onChange', 'onBlur']}
      >
        <Form.Item name="name" label="Имя" rules={userFormRules.name}>
          <Input prefix={<UserOutlined />} placeholder="Ваше имя" disabled={submitting} />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={userFormRules.email} normalize={normalizeEmail}>
          <Input prefix={<MailOutlined />} placeholder="user@example.com" disabled={submitting} />
        </Form.Item>

        <Form.Item name="password" label="Пароль" rules={userFormRules.newPassword} hasFeedback>
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" disabled={submitting} />
        </Form.Item>
        <PasswordStrength password={password} />

        <Form.Item
          name="confirm"
          label="Подтвердите пароль"
          dependencies={['password']}
          hasFeedback
          rules={confirmRules}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Повторите пароль" disabled={submitting} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={submitting}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
