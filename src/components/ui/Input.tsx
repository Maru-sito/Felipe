import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-label text-muted">{label}</label>
      )}
      <input
        {...props}
        className={cn(
          'w-full bg-transparent border border-border px-4 py-3 text-white text-sm',
          'placeholder:text-muted/50',
          'focus:outline-none focus:border-white/50 transition-colors',
          error && 'border-red-500',
          className
        )}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-label text-muted">{label}</label>
      )}
      <textarea
        {...props}
        className={cn(
          'w-full bg-transparent border border-border px-4 py-3 text-white text-sm resize-none',
          'placeholder:text-muted/50',
          'focus:outline-none focus:border-white/50 transition-colors',
          error && 'border-red-500',
          className
        )}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
