import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ClientesPage() {
  const supabase = await createClient()

  const { data: clients } = await supabase
    .from('profiles')
    .select('*, bookings(count)')
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <p className="text-label text-muted mb-2">GESTIÓN</p>
        <h1 className="text-4xl font-black text-white">CLIENTES</h1>
      </div>

      <div className="border border-border">
        <div className="hidden sm:grid grid-cols-12 px-6 py-3 border-b border-border">
          <p className="col-span-5 text-label text-muted">CLIENTE</p>
          <p className="col-span-4 text-label text-muted">CONTACTO</p>
          <p className="col-span-3 text-label text-muted">PROYECTOS</p>
        </div>

        {(clients ?? []).length === 0 && (
          <div className="p-12 text-center text-muted text-sm">No hay clientes registrados.</div>
        )}

        {(clients ?? []).map((client, i) => (
          <Link
            key={client.id}
            href={`/admin/clientes/${client.id}`}
            className={`grid sm:grid-cols-12 gap-2 px-6 py-4 items-center hover:bg-card transition-colors group ${
              i < (clients?.length ?? 0) - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="sm:col-span-5">
              <p className="text-sm font-semibold text-white group-hover:underline">
                {client.full_name ?? 'Sin nombre'}
              </p>
              <p className="text-xs text-muted">{new Date(client.created_at).toLocaleDateString('es-AR')}</p>
            </div>
            <div className="sm:col-span-4">
              <p className="text-sm text-muted">{client.email}</p>
              {client.phone && <p className="text-xs text-muted/60">{client.phone}</p>}
            </div>
            <div className="sm:col-span-3 flex items-center justify-between">
              <p className="text-sm text-white">
                {Array.isArray(client.bookings) ? client.bookings.length : 0} sesión(es)
              </p>
              <span className="text-muted group-hover:text-white transition-colors">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
