import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import Link from 'next/link'
import type { Booking } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, modalities(name, slug, price_deposit, duration_min)')
    .eq('client_id', user.id)
    .neq('status', 'pending_payment')
    .order('session_date', { ascending: false })

  const activeBookings = (bookings ?? []).filter(
    b => !['delivered', 'cancelled'].includes(b.status)
  )
  const pastBookings = (bookings ?? []).filter(
    b => ['delivered', 'cancelled'].includes(b.status)
  )

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <p className="text-label text-muted mb-2">BIENVENIDO</p>
        <h1 className="text-4xl font-black text-white">TU ÁREA VIP</h1>
      </div>

      {bookings?.length === 0 && (
        <div className="border border-border p-12 text-center">
          <p className="text-muted mb-6">Aún no tenés proyectos confirmados.</p>
          <Link
            href="/booking/1"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-label font-bold hover:bg-white/90 transition-colors"
          >
            AGENDAR SESIÓN →
          </Link>
        </div>
      )}

      {activeBookings.length > 0 && (
        <section className="mb-10">
          <p className="text-label text-muted mb-4">PROYECTOS ACTIVOS</p>
          <div className="flex flex-col gap-3">
            {activeBookings.map(b => (
              <ProjectCard key={b.id} booking={b as Booking} />
            ))}
          </div>
        </section>
      )}

      {pastBookings.length > 0 && (
        <section>
          <p className="text-label text-muted mb-4">HISTORIAL</p>
          <div className="flex flex-col gap-3">
            {pastBookings.map(b => (
              <ProjectCard key={b.id} booking={b as Booking} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
