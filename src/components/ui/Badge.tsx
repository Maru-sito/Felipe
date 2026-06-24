import { cn } from '@/lib/utils'
import { STATUS_LABELS, STATUS_COLORS, type ProjectStatus } from '@/types'

interface BadgeProps {
  status: ProjectStatus
  className?: string
}

export function StatusBadge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-xs font-semibold border',
        STATUS_COLORS[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
