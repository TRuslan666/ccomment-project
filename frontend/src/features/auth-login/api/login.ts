import type { User } from '@/entities/user'
import { delay } from '@/shared/lib/delay'
import type { LoginFormValues } from '../model/types'

const FAKE_LATENCY_MS = 700

export const DEMO_ACCOUNT = { email: 'demo@example.com', password: 'demo123' } as const

export type LoginResult = { ok: true; user: User } | { ok: false; reason: 'invalid_credentials' }

export async function login({ email, password }: LoginFormValues): Promise<LoginResult> {
  await delay(FAKE_LATENCY_MS)
  if (email.trim().toLowerCase() === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
    return { ok: true, user: { id: 1, name: 'Демо-пользователь', email: DEMO_ACCOUNT.email } }
  }
  return { ok: false, reason: 'invalid_credentials' }
}
