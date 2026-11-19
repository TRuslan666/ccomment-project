import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import { RegisterForm } from '@/features/auth-register'
import { ROUTES } from '@/shared/config/routes'
import { CenteredCard } from '@/shared/ui/CenteredCard'

const { Text } = Typography

export function RegisterPage() {
  return (
    <CenteredCard
      title="Регистрация"
      subtitle="Создайте аккаунт для сохранения истории запросов"
      footer={
        <Text type="secondary">
          Уже есть аккаунт?{' '}
          <Link to={ROUTES.login}>
            <Text strong>Войти</Text>
          </Link>
        </Text>
      }
    >
      <RegisterForm />
    </CenteredCard>
  )
}
