import { delay } from '@/shared/lib/delay'
import type { DemoScenario } from '../model/types'

const FAKE_LATENCY_MS = 700

export async function loadHistory(scenario: DemoScenario): Promise<void> {
  await delay(FAKE_LATENCY_MS)
  if (scenario === 'error') throw new Error('Не удалось загрузить историю')
}