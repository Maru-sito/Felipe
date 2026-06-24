'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-40 disabled:cursor-not-allowed',
        {
          'bg-white text-black hover:bg-white/90 active:scale-[0.98]': variant === 'primary',
          'bg-transparent text-white hover:bg-white/10 border border-border': variant === 'ghost',
          'bg-transparent text-white border border-white hover:bg-white hover:text-black': variant === 'outline',
          'bg-red-600 text-white hover:bg-red-500': variant === 'danger',
        },
        {
          'text-xs px-3 py-2 tracking-widest uppercase': size === 'sm',
          'text-sm px-5 py-3 tracking-wider uppercase': size === 'md',
          'text-base px-8 py-4 tracking-widest uppercase': size === 'lg',
        },
        className
      )}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Procesando...
        </span>
      ) : children}
    </button>
  )
}
