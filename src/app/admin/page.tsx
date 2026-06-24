import { createClient } from '@/lib/supabase/server'
import { StatusBadge } from '@/components/ui/Badge'
import { formatDate, formatTime } from '@/lib/utils'
import Link from 'next/link'
import type { ProjectStatus } from '@/types'

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, modalities(name)')
    .neq('status', 'pending_payment')
    .order('session_date', { ascending: true })
    .limit(10)

  const { count: totalConfirmed } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'confirmed')

  const { count: totalEditing } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'editing')

  const { count: totalDelivered } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'delivered')

  return (
    <div className="max-w-5xl">
      <div className="mb-12">
        <p className="text-label text-muted mb-2">PANEL DE CONTROL</p>
        <h1 className="text-4xl font-black text-white">RESUMEN</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-0 border border-border mb-12">
        {[
          { label: 'CONFIRMADAS', value: totalConfirmed ?? 0 },
          { label: 'EN EDICIÓN', value: totalEditing ?? 0 },
          { label: 'ENTREGADAS', value: totalDelivered ?? 0 },
        ].map((stat, i) => (
          <div key={stat.label} className={`p-8 ${i < 2 ? 'border-r border-border' : ''}`}>
            <p className="text-label text-muted mb-3">{stat.label}</p>
            <p className="text-5xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-label text-muted">PRÓXIMAS SESIONES</p>
          <Link href="/admin/reservas" className="text-label text-muted hover:text-white transition-colors">
            VER TODAS →
          </Link>
        </div>

        <div className="flex flex-col gap-0 border border-border">
          {(bookings ?? []).length === 0 && (
            <div className="p-10 text-center text-muted text-sm">No hay reservas aún.</div>
          )}
          {(bookings ?? []).map((b, i) => (
            <Link
              key={b.id}
              href={`/admin/reservas/${b.id}`}
              className={`flex items-center justify-between px-6 py-4 hover:bg-card transition-colors group ${
                i < (bookings?.length ?? 0) - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm font-semibold text-white">{b.contact_name}</p>
                  <p className="text-xs text-muted">{b.modalities?.name}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-muted">{formatDate(b.session_date)} · {formatTime(b.session_time)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={b.status as ProjectStatus} />
                <span className="text-muted group-hover:text-white transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
