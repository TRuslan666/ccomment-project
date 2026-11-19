import { Progress, Typography } from 'antd'
import { getPasswordStrength } from '../model/passwordStrength'

const { Text } = Typography

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (password === '') return null
  const { percent, label, color } = getPasswordStrength(password)

  return (
    <div style={{ marginTop: -12, marginBottom: 20 }}>
      <Progress percent={percent} showInfo={false} strokeColor={color} size="small" />
      <Text type="secondary" style={{ fontSize: 13 }}>
        Надёжность пароля: <span style={{ color }}>{label}</span>
      </Text>
    </div>
  )
}