import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/auth-login'
import { ROUTES } from '@/shared/config/routes'
import { CenteredCard } from '@/shared/ui/CenteredCard'

const { Text } = Typography

export function LoginPage() {
  return (
    <CenteredCard
      title="Вход"
      subtitle="Войдите, чтобы сохранять историю классификаций"
      footer={
        <Text type="secondary">
          Нет аккаунта?{' '}
          <Link to={ROUTES.register}>
            <Text strong>Зарегистрироваться</Text>
          </Link>
        </Text>
      }
    >
      <LoginForm />
    </CenteredCard>
  )
}
