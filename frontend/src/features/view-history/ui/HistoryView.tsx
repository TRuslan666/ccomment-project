import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button, Card, Empty, Input, Segmented, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import type { HistoryItem } from '@/entities/classification'
import { ROUTES } from '@/shared/config/routes'
import { AsyncState } from '@/shared/ui/AsyncState'
import type { AsyncStatus } from '@/shared/ui/AsyncState'
import { filterHistory } from '../model/filterHistory'
import type { DemoScenario, SentimentFilter } from '../model/types'
import { useHistoryData } from '../model/useHistoryData'
import { DemoScenarioSwitch } from './DemoScenarioSwitch'
import { HistoryTable } from './HistoryTable'

const { Text } = Typography

interface HistoryViewProps {
  renderRowActions?: (item: HistoryItem) => ReactNode
}

const FILTER_OPTIONS: { label: string; value: SentimentFilter }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Положительные', value: 'positive' },
  { label: 'Отрицательные', value: 'negative' },
  { label: 'Нейтральные', value: 'neutral' },
]

export function HistoryView({ renderRowActions }: HistoryViewProps) {
  const [scenario, setScenario] = useState<DemoScenario>('normal')
  const [sentiment, setSentiment] = useState<SentimentFilter>('all')
  const [query, setQuery] = useState('')

  const { status: loadStatus, items, lastAddedId, reload } = useHistoryData(scenario)
  const filtered = filterHistory(items, { sentiment, query })
  const hasFilters = sentiment !== 'all' || query.trim() !== ''

  const status: AsyncStatus =
    loadStatus === 'loading' ? 'loading' : loadStatus === 'error' ? 'error' : items.length === 0 ? 'empty' : 'ready'

  const resetFilters = () => {
    setSentiment('all')
    setQuery('')
  }

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <DemoScenarioSwitch value={scenario} onChange={setScenario} />

        <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
          <Segmented<SentimentFilter>
            options={FILTER_OPTIONS}
            value={sentiment}
            onChange={setSentiment}
            disabled={status !== 'ready'}
          />
          <Input.Search
            allowClear
            placeholder="Поиск по тексту"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            disabled={status !== 'ready'}
            style={{ width: 260 }}
          />
        </Space>

        <AsyncState
          status={status}
          onRetry={reload}
          errorTitle="Не удалось загрузить историю"
          errorMessage="Сервер не ответил. Нажмите «Повторить» или выберите другой демо-сценарий."
          emptyTitle="История пуста"
          emptyExtra={
            <Link to={ROUTES.classify}>
              <Button type="primary">Сделать первую классификацию</Button>
            </Link>
          }
        >
          {filtered.length === 0 ? (
            <Empty description="По вашему запросу ничего не найдено">
              {hasFilters && <Button onClick={resetFilters}>Сбросить фильтры</Button>}
            </Empty>
          ) : (
            <>
              <Text type="secondary">
                Показано {filtered.length} из {items.length}
              </Text>
              <HistoryTable items={filtered} highlightId={lastAddedId} renderRowActions={renderRowActions} />
            </>
          )}
        </AsyncState>
      </Space>
    </Card>
  )
}