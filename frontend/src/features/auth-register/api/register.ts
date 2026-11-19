import type { User } from '@/entities/user'
import { delay } from '@/shared/lib/delay'
import type { RegisterFormValues } from '../model/types'

const FAKE_LATENCY_MS = 700

export const DEMO_TAKEN_EMAIL = 'taken@example.com'

export type RegisterResult = { ok: true; user: User } | { ok: false; reason: 'email_taken' }

export async function register({ name, email }: RegisterFormValues): Promise<RegisterResult> {
  await delay(FAKE_LATENCY_MS)
  if (email.trim().toLowerCase() === DEMO_TAKEN_EMAIL) return { ok: false, reason: 'email_taken' }
  return { ok: true, user: { id: Date.now(), name: name.trim(), email: email.trim() } }
}
