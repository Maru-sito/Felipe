import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const email = user.email ?? ''
  const parts = email.split('@')[0].split(/[._-]/)
  const initials = parts.slice(0, 2).map((p: string) => p[0]?.toUpperCase() ?? '').join('')

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      <DashboardSidebar userEmail={email} initials={initials || 'U'} />
      <main className="flex-1 px-6 md:px-10 py-10 min-w-0">
        {children}
      </main>
    </div>
  )
}
