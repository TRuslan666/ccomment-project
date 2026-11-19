import { PASSWORD_MIN_LENGTH } from '@/entities/user'

export interface PasswordStrength {
  score: number
  percent: number
  label: string
  color: string
}

const LONG_PASSWORD_LENGTH = 10

export function getPasswordStrength(password: string): PasswordStrength {
  if (password === '') return { score: 0, percent: 0, label: '', color: '#d9d9d9' }

  let score = 0
  if (password.length >= PASSWORD_MIN_LENGTH) score += 1
  if (password.length >= LONG_PASSWORD_LENGTH) score += 1
  if (/\d/.test(password)) score += 1
  if (/\p{Ll}/u.test(password) && /\p{Lu}/u.test(password)) score += 1
  if (/[^\p{L}\d]/u.test(password)) score += 1

  const percent = Math.max(10, score * 20)
  if (score <= 2) return { score, percent, label: 'Слабый', color: '#ff4d4f' }
  if (score === 3) return { score, percent, label: 'Средний', color: '#faad14' }
  return { score, percent, label: 'Надёжный', color: '#52c41a' }
}