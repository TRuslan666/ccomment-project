import { Segmented, Space, Typography } from 'antd'
import type { DemoScenario } from '../model/types'

const { Text } = Typography

interface DemoScenarioSwitchProps {
  value: DemoScenario
  onChange: (value: DemoScenario) => void
}

const OPTIONS: { label: string; value: DemoScenario }[] = [
  { label: 'Данные', value: 'normal' },
  { label: 'Ошибка загрузки', value: 'error' },
  { label: 'Пустой ответ', value: 'empty' },
]

export function DemoScenarioSwitch({ value, onChange }: DemoScenarioSwitchProps) {
  return (
    <Space wrap>
      <Text type="secondary">Демо-сценарий загрузки:</Text>
      <Segmented<DemoScenario> size="small" options={OPTIONS} value={value} onChange={onChange} />
    </Space>
  )
}