import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { FileRepository } from '@/components/dashboard/FileRepository'
import { StatusBadge } from '@/components/ui/Badge'
import { formatDate, formatTime, formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import type { ProjectStatus, SessionFile } from '@/types'

interface Props {
  params: Promise<{ sessionId: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
  const { sessionId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: booking } = await supabase
    .from('bookings')
    .select('*, modalities(name, slug, price_deposit, duration_min)')
    .eq('id', sessionId)
    .eq('client_id', user.id)
    .single()

  if (!booking) notFound()

  const { data: files } = await supabase
    .from('files')
    .select('*')
    .eq('booking_id', sessionId)
    .order('created_at', { ascending: true })

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/dashboard" className="text-label text-muted hover:text-white transition-colors">
          ← MIS PROYECTOS
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10">
        <div>
          <p className="text-label text-muted mb-2">{booking.modalities?.name}</p>
          <h1 className="text-3xl font-black text-white">
            {formatDate(booking.session_date)}
          </h1>
          <p className="text-muted mt-1">{formatTime(booking.session_time)} · {booking.modalities?.duration_min} min</p>
        </div>
        <StatusBadge status={booking.status as ProjectStatus} className="self-start" />
      </div>

      <div className="grid sm:grid-cols-3 gap-0 border border-border mb-10">
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-border">
          <p className="text-label text-muted mb-2">SEÑA ABONADA</p>
          <p className="text-lg font-bold text-white">
            {formatCurrency(booking.modalities?.price_deposit ?? 0)}
          </p>
        </div>
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-border">
          <p className="text-label text-muted mb-2">ARCHIVOS</p>
          <p className="text-lg font-bold text-white">{files?.length ?? 0}</p>
        </div>
        <div className="p-6">
          <p className="text-label text-muted mb-2">ESTADO</p>
          <p className="text-sm font-semibold text-white">{booking.status}</p>
        </div>
      </div>

      <div>
        <p className="text-label text-muted mb-6">TUS FOTOGRAFÍAS</p>
        <FileRepository files={(files ?? []) as SessionFile[]} bookingId={sessionId} />
      </div>
    </div>
  )
}
