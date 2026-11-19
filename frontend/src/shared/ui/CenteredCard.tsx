import type { ReactNode } from 'react'
import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

interface CenteredCardProps {
  title: string
  subtitle: string
  footer?: ReactNode
  children: ReactNode
}

export function CenteredCard({ title, subtitle, footer, children }: CenteredCardProps) {
  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <Card>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 8 }}>
          {title}
        </Title>
        <Paragraph type="secondary" style={{ textAlign: 'center', marginBottom: 24 }}>
          {subtitle}
        </Paragraph>
        {children}
        {footer && <div style={{ textAlign: 'center' }}>{footer}</div>}
      </Card>
    </div>
  )
}
