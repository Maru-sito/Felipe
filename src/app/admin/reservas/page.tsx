import { createClient } from '@/lib/supabase/server'
import { StatusBadge } from '@/components/ui/Badge'
import { BookingStatusSelect } from '@/components/admin/BookingStatusSelect'
import { formatDate, formatTime } from '@/lib/utils'
import Link from 'next/link'
import type { ProjectStatus } from '@/types'

export default async function ReservasPage() {
  const supabase = await createClient()

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, modalities(name)')
    .neq('status', 'pending_payment')
    .order('session_date', { ascending: false })

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <p className="text-label text-muted mb-2">GESTIÓN</p>
        <h1 className="text-4xl font-black text-white">RESERVAS</h1>
      </div>

      <div className="border border-border">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border">
          <p className="col-span-3 text-label text-muted">CLIENTE</p>
          <p className="col-span-3 text-label text-muted">MODALIDAD</p>
          <p className="col-span-3 text-label text-muted">FECHA</p>
          <p className="col-span-3 text-label text-muted">ESTADO</p>
        </div>

        {(bookings ?? []).length === 0 && (
          <div className="p-12 text-center text-muted text-sm">No hay reservas confirmadas.</div>
        )}

        {(bookings ?? []).map((b, i) => (
          <div
            key={b.id}
            className={`grid md:grid-cols-12 gap-4 px-6 py-4 items-center ${
              i < (bookings?.length ?? 0) - 1 ? 'border-b border-border' : ''
            } hover:bg-card transition-colors`}
          >
            <div className="md:col-span-3">
              <Link href={`/admin/reservas/${b.id}`} className="text-sm font-semibold text-white hover:underline">
                {b.contact_name}
              </Link>
              <p className="text-xs text-muted">{b.contact_email}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-sm text-white">{b.modalities?.name ?? '—'}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-sm text-white">{formatDate(b.session_date)}</p>
              <p className="text-xs text-muted">{formatTime(b.session_time)}</p>
            </div>
            <div className="md:col-span-3">
              <BookingStatusSelect
                bookingId={b.id}
                currentStatus={b.status as ProjectStatus}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
