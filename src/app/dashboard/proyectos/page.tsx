import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import type { Booking } from '@/types'

export default async function ProyectosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, modalities(name, slug, price_deposit, duration_min)')
    .eq('client_id', user.id)
    .neq('status', 'pending_payment')
    .order('session_date', { ascending: false })

  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <p className="text-label text-muted mb-2">HISTORIAL COMPLETO</p>
        <h1 className="text-4xl font-black text-white">MIS PROYECTOS</h1>
      </div>

      {(bookings?.length ?? 0) === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-muted">No hay proyectos registrados aún.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings!.map(b => (
            <ProjectCard key={b.id} booking={b as Booking} />
          ))}
        </div>
      )}
    </div>
  )
}
