import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { FileRepository } from '@/components/dashboard/FileRepository'
import type { SessionFile } from '@/types'

export default async function ArchivosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: bookings } = await supabase
    .from('bookings')
    .select('id')
    .eq('client_id', user.id)
    .eq('status', 'delivered')

  const bookingIds = (bookings ?? []).map(b => b.id)

  let files: SessionFile[] = []
  if (bookingIds.length > 0) {
    const { data } = await supabase
      .from('files')
      .select('*')
      .in('booking_id', bookingIds)
      .order('created_at', { ascending: false })
    files = (data ?? []) as SessionFile[]
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <p className="text-label text-muted mb-2">TODAS TUS ENTREGAS</p>
        <h1 className="text-4xl font-black text-white">MIS ARCHIVOS</h1>
      </div>

      <FileRepository files={files} bookingId="all" />
    </div>
  )
}
