import type { Rule } from 'antd/es/form'
import { PASSWORD_MIN_LENGTH, USER_NAME_MAX_LENGTH } from '../model/constants'

export const userFormRules: Record<'name' | 'email' | 'password' | 'newPassword', Rule[]> = {
  name: [
    { required: true, whitespace: true, message: 'Введите имя' },
    { max: USER_NAME_MAX_LENGTH, message: `Не более ${USER_NAME_MAX_LENGTH} символов` },
  ],
  email: [
    { required: true, message: 'Введите email' },
    { type: 'email', message: 'Некорректный email' },
  ],
  password: [{ required: true, message: 'Введите пароль' }],
  newPassword: [
    { required: true, message: 'Введите пароль' },
    { min: PASSWORD_MIN_LENGTH, message: `Минимум ${PASSWORD_MIN_LENGTH} символов` },
  ],
}