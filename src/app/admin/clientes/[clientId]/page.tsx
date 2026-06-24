import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { FileUploader } from '@/components/admin/FileUploader'
import { StatusBadge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import type { ProjectStatus } from '@/types'

interface Props {
  params: Promise<{ clientId: string }>
}

export default async function ClientDetailPage({ params }: Props) {
  const { clientId } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', clientId)
    .single()

  if (!profile) notFound()

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, modalities(name)')
    .eq('client_id', clientId)
    .neq('status', 'pending_payment')
    .order('session_date', { ascending: false })

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/clientes" className="text-label text-muted hover:text-white transition-colors">
          ← CLIENTES
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-1">{profile.full_name ?? 'Sin nombre'}</h1>
        <p className="text-muted">{profile.email}</p>
        {profile.phone && <p className="text-muted text-sm">{profile.phone}</p>}
      </div>

      {/* Bookings list with per-session file upload */}
      <div className="flex flex-col gap-6">
        {(bookings ?? []).map(booking => (
          <div key={booking.id} className="border border-border">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <p className="text-sm font-semibold text-white">{booking.modalities?.name}</p>
                <p className="text-xs text-muted">{formatDate(booking.session_date)}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={booking.status as ProjectStatus} />
                <Link
                  href={`/admin/reservas/${booking.id}`}
                  className="text-label text-muted hover:text-white transition-colors"
                >
                  DETALLE →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <p className="text-label text-muted mb-4">SUBIR ARCHIVOS A ESTA SESIÓN</p>
              <FileUploader bookingId={booking.id} />
            </div>
          </div>
        ))}

        {(bookings ?? []).length === 0 && (
          <div className="border border-border p-10 text-center">
            <p className="text-muted text-sm">Este cliente no tiene sesiones confirmadas.</p>
          </div>
        )}
      </div>
    </div>
  )
}
