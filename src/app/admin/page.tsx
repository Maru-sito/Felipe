import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = await createClient()

  const [{ count: totalBookings }, { count: pendingBookings }, { count: totalClients }] = await Promise.all([
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'confirmed'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
  ])

  const { data: recent } = await supabase
    .from('bookings')
    .select('*, modalities(name)')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { label: 'RESERVAS TOTALES', value: totalBookings ?? 0 },
    { label: 'CONFIRMADAS', value: pendingBookings ?? 0 },
    { label: 'CLIENTES', value: totalClients ?? 0 },
  ]

  return (
    <div className="max-w-5xl">
      <div className="mb-12">
        <p className="text-label text-muted mb-2">RESUMEN</p>
        <h1 className="text-4xl font-black text-white">PANEL DE CONTROL</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-0 border border-border mb-10">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`p-8 ${i < stats.length - 1 ? 'border-r border-border' : ''}`}>
            <p className="text-label text-muted mb-2">{stat.label}</p>
            <p className="text-4xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-label text-muted">ÚLTIMAS RESERVAS</p>
          <Link href="/admin/reservas" className="text-label text-muted hover:text-white transition-colors">
            VER TODAS →
          </Link>
        </div>
        <div className="border border-border">
          {(recent ?? []).map((b, i) => (
            <Link
              key={b.id}
              href={`/admin/reservas/${b.id}`}
              className={`flex items-center justify-between px-6 py-4 hover:bg-card transition-colors ${
                i < (recent?.length ?? 0) - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-white">{b.contact_name}</p>
                <p className="text-xs text-muted">{b.modalities?.name} · {b.session_date}</p>
              </div>
              <span className="text-xs text-muted capitalize">{b.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
