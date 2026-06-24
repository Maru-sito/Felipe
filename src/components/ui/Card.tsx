import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated'
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        'bg-card border border-border',
        variant === 'elevated' && 'shadow-2xl shadow-black/50',
        className
      )}
    >
      {children}
    </div>
  )
}
