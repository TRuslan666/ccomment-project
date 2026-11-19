import type { ReactNode } from 'react'
import { App as AntApp, ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import { BrowserRouter } from 'react-router-dom'
import { HistoryProvider } from '@/entities/classification'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
        },
      }}
    >
      {/* AntApp даёт компонентам доступ к message/notification через App.useApp() (со статическими вызовами в React 19 уведомления не показываются) */}
      <AntApp>
        <HistoryProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </HistoryProvider>
      </AntApp>
    </ConfigProvider>
  )
}