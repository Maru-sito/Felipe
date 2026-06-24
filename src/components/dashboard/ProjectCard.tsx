import Link from 'next/link'
import { StatusBadge } from '@/components/ui/Badge'
import { formatDate, formatTime } from '@/lib/utils'
import type { Booking, ProjectStatus } from '@/types'

interface Props {
  booking: Booking
}

export function ProjectCard({ booking }: Props) {
  return (
    <Link
      href={`/dashboard/proyectos/${booking.id}`}
      className="block border border-border p-6 hover:bg-card transition-colors group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-label text-muted mb-1">
            {booking.modalities?.name ?? 'Sesión fotográfica'}
          </p>
          <StatusBadge status={booking.status as ProjectStatus} />
        </div>
        <span className="text-muted group-hover:text-white transition-colors text-lg">→</span>
      </div>

      <div className="flex gap-6">
        <div>
          <p className="text-label text-muted mb-1">FECHA</p>
          <p className="text-sm text-white">{formatDate(booking.session_date)}</p>
        </div>
        <div>
          <p className="text-label text-muted mb-1">HORA</p>
          <p className="text-sm text-white">{formatTime(booking.session_time)}</p>
        </div>
      </div>
    </Link>
  )
}
