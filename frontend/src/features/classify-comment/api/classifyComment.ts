import type { ClassificationResult } from '@/entities/classification'
import { delay } from '@/shared/lib/delay'
import { classifyText } from '../model/classifyText'

const FAKE_LATENCY_MS = 600

export async function classifyComment(text: string): Promise<ClassificationResult> {
  await delay(FAKE_LATENCY_MS)
  return classifyText(text.trim())
}