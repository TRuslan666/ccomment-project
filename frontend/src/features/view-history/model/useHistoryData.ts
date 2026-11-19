import { useCallback, useEffect, useState } from 'react'
import { useHistoryStore } from '@/entities/classification'
import { loadHistory } from '../api/loadHistory'
import type { DemoScenario } from './types'

type LoadStatus = 'loading' | 'success' | 'error'

export function useHistoryData(scenario: DemoScenario) {
  const { items: storedItems, lastAddedId } = useHistoryStore()
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    loadHistory(scenario).then(
      () => {
        if (!cancelled) setStatus('success')
      },
      () => {
        if (!cancelled) setStatus('error')
      },
    )
    return () => {
      cancelled = true
    }
  }, [scenario, attempt])

  const reload = useCallback(() => setAttempt((value) => value + 1), [])
  const items = scenario === 'empty' ? [] : storedItems

  return { status, items, lastAddedId, reload }
}