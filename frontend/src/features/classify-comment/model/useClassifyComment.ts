import { useCallback, useRef, useState } from 'react'
import type { ClassificationResult } from '@/entities/classification'
import { classifyComment } from '../api/classifyComment'

type ClassifyState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; result: ClassificationResult }
  | { status: 'error'; message: string }

export function useClassifyComment() {
  const [state, setState] = useState<ClassifyState>({ status: 'idle' })
  const requestId = useRef(0)

  const submit = useCallback(async (text: string) => {
    const id = ++requestId.current
    setState({ status: 'loading' })
    try {
      const result = await classifyComment(text)
      if (id === requestId.current) setState({ status: 'success', result })
    } catch {
      if (id === requestId.current) {
        setState({ status: 'error', message: 'Не удалось выполнить классификацию. Попробуйте ещё раз.' })
      }
    }
  }, [])

  const reset = useCallback(() => {
    requestId.current += 1
    setState({ status: 'idle' })
  }, [])

  return { state, submit, reset }
}