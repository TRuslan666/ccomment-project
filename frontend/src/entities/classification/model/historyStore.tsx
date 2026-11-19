import { createContext, useContext, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { DEMO_HISTORY } from './demoHistory'
import type { ClassificationResult, HistoryItem } from './types'

interface HistoryState {
  items: HistoryItem[]
  lastAddedId: number | null
}

type HistoryAction =
  | { type: 'add'; result: ClassificationResult; createdAt: string }
  | { type: 'remove'; id: number }

function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
  switch (action.type) {
    case 'add': {
      const nextId = state.items.reduce((max, item) => Math.max(max, item.id), 0) + 1
      const item: HistoryItem = {
        id: nextId,
        text: action.result.text,
        sentiment: action.result.sentiment,
        confidence: action.result.confidence,
        createdAt: action.createdAt,
      }
      return { items: [item, ...state.items], lastAddedId: nextId }
    }
    case 'remove':
      return { ...state, items: state.items.filter((item) => item.id !== action.id) }
  }
}

interface HistoryStore {
  items: HistoryItem[]
  lastAddedId: number | null
  addItem: (result: ClassificationResult) => void
  removeItem: (id: number) => void
}

const HistoryContext = createContext<HistoryStore | null>(null)

interface HistoryProviderProps {
  children: ReactNode
}

export function HistoryProvider({ children }: HistoryProviderProps) {
  const [state, dispatch] = useReducer(historyReducer, { items: DEMO_HISTORY, lastAddedId: null })

  const value = useMemo<HistoryStore>(
    () => ({
      items: state.items,
      lastAddedId: state.lastAddedId,
      addItem: (result) => dispatch({ type: 'add', result, createdAt: new Date().toISOString() }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
    }),
    [state],
  )

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}

export function useHistoryStore(): HistoryStore {
  const store = useContext(HistoryContext)
  if (!store) throw new Error('useHistoryStore нужно вызывать внутри HistoryProvider')
  return store
}