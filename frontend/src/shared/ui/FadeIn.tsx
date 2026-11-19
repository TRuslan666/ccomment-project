import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
}

export function FadeIn({ children }: FadeInProps) {
  return <div className="fade-in-up">{children}</div>
}