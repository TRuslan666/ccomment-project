import type { ReactNode } from 'react'
import { Button, Empty, Result, Skeleton } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { FadeIn } from './FadeIn'

export type AsyncStatus = 'loading' | 'error' | 'empty' | 'ready'

interface AsyncStateProps {
  status: AsyncStatus
  onRetry?: () => void
  errorTitle?: string
  errorMessage?: string
  emptyTitle?: string
  emptyExtra?: ReactNode
  children: ReactNode
}

export function AsyncState({
  status,
  onRetry,
  errorTitle = 'Не удалось загрузить данные',
  errorMessage = 'Проверьте соединение и попробуйте ещё раз.',
  emptyTitle = 'Нет данных',
  emptyExtra,
  children,
}: AsyncStateProps) {
  if (status === 'loading') {
    return (
      <div aria-busy="true" aria-live="polite">
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <FadeIn>
        <Result
          status="warning"
          title={errorTitle}
          subTitle={errorMessage}
          extra={
            onRetry && (
              <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
                Повторить
              </Button>
            )
          }
        />
      </FadeIn>
    )
  }

  if (status === 'empty') {
    return (
      <FadeIn>
        <Empty description={emptyTitle}>{emptyExtra}</Empty>
      </FadeIn>
    )
  }

  return <FadeIn>{children}</FadeIn>
}