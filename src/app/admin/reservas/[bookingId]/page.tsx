import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { BookingStatusSelect } from '@/components/admin/BookingStatusSelect'
import { FileUploader } from '@/components/admin/FileUploader'
import { StatusBadge } from '@/components/ui/Badge'
import { formatDate, formatTime, formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import type { ProjectStatus } from '@/types'

interface Props {
  params: Promise<{ bookingId: string }>
}

export default async function BookingDetailPage({ params }: Props) {
  const { bookingId } = await params
  const supabase = await createClient()

  const { data: booking } = await supabase
    .from('bookings')
    .select('*, modalities(name, price_deposit, duration_min)')
    .eq('id', bookingId)
    .single()

  if (!booking) notFound()

  const { data: files } = await supabase
    .from('files')
    .select('*')
    .eq('booking_id', bookingId)
    .order('created_at', { ascending: false })

  const qualData = booking.qual_data as Record<string, string> | null

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/reservas" className="text-label text-muted hover:text-white transition-colors">
          ← RESERVAS
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">{booking.contact_name}</h1>
          <p className="text-muted">{booking.contact_email}</p>
          {booking.contact_phone && <p className="text-muted text-sm">{booking.contact_phone}</p>}
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status={booking.status as ProjectStatus} />
          <BookingStatusSelect bookingId={booking.id} currentStatus={booking.status as ProjectStatus} />
        </div>
      </div>

      {/* Session info */}
      <div className="grid sm:grid-cols-4 gap-0 border border-border mb-10">
        {[
          { label: 'MODALIDAD', value: booking.modalities?.name ?? '—' },
          { label: 'FECHA', value: formatDate(booking.session_date) },
          { label: 'HORA', value: formatTime(booking.session_time) },
          { label: 'SEÑA', value: formatCurrency(booking.modalities?.price_deposit ?? 0) },
        ].map((item, i) => (
          <div key={item.label} className={`p-6 ${i < 3 ? 'border-b sm:border-b-0 sm:border-r border-border' : ''}`}>
            <p className="text-label text-muted mb-2">{item.label}</p>
            <p className="text-sm font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Qual form answers */}
      {qualData && (
        <div className="border border-border p-8 mb-10">
          <p className="text-label text-muted mb-6">FORMULARIO DE EVALUACIÓN</p>
          <div className="flex flex-col gap-5">
            {[
              { key: 'project_description', label: 'DESCRIPCIÓN DEL PROYECTO' },
              { key: 'aesthetic_references', label: 'REFERENCIAS ESTÉTICAS' },
              { key: 'notes', label: 'NOTAS ADICIONALES' },
            ].map(field => qualData[field.key] ? (
              <div key={field.key}>
                <p className="text-label text-muted mb-2">{field.label}</p>
                <p className="text-sm text-white/90 leading-relaxed">{qualData[field.key]}</p>
              </div>
            ) : null)}
          </div>
        </div>
      )}

      {/* Admin notes */}
      {booking.notes && (
        <div className="border border-yellow-800/40 bg-yellow-900/10 p-6 mb-10">
          <p className="text-label text-yellow-600 mb-2">NOTAS INTERNAS</p>
          <p className="text-sm text-white/80">{booking.notes}</p>
        </div>
      )}

      {/* File upload */}
      <div className="mb-10">
        <p className="text-label text-muted mb-6">
          SUBIR ARCHIVOS · {files?.length ?? 0} archivo{(files?.length ?? 0) !== 1 ? 's' : ''} entregado{(files?.length ?? 0) !== 1 ? 's' : ''}
        </p>
        <FileUploader bookingId={bookingId} />
      </div>

      {/* Uploaded files list */}
      {(files?.length ?? 0) > 0 && (
        <div className="border border-border">
          <div className="px-6 py-3 border-b border-border">
            <p className="text-label text-muted">ARCHIVOS ENTREGADOS</p>
          </div>
          {files!.map((file, i) => (
            <div
              key={file.id}
              className={`flex items-center justify-between px-6 py-4 ${
                i < files!.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div>
                <p className="text-sm text-white">{file.filename}</p>
                <p className="text-xs text-muted">
                  {file.size_bytes ? `${(file.size_bytes / 1024 / 1024).toFixed(1)} MB` : ''} · {new Date(file.created_at).toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
