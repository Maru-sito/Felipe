'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface Props {
  userEmail: string
  initials: string
}

const NAV = [
  { href: '/dashboard', label: 'INICIO' },
  { href: '/dashboard/proyectos', label: 'MIS PROYECTOS' },
  { href: '/dashboard/archivos', label: 'MIS ARCHIVOS' },
]

export function DashboardSidebar({ userEmail, initials }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside className="w-full lg:w-64 lg:min-h-screen flex flex-col border-b lg:border-b-0 lg:border-r border-border">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-border">
        <Link href="/" className="text-label tracking-[0.25em] text-white hover:text-muted transition-colors">
          BORO STUDIO
        </Link>
        <p className="text-label text-muted mt-1">ÁREA VIP</p>
      </div>

      {/* Nav */}
      <nav className="flex lg:flex-col flex-row gap-0 overflow-x-auto lg:overflow-x-visible flex-1 px-0 lg:pt-6">
        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'px-8 py-4 text-label transition-colors border-b border-transparent whitespace-nowrap',
              pathname === item.href
                ? 'text-white border-b-white lg:border-b-transparent lg:border-l-2 lg:border-l-white bg-card'
                : 'text-muted hover:text-white'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User + logout */}
      <div className="px-8 py-6 border-t border-border mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-card border border-border flex items-center justify-center text-xs font-bold text-white">
            {initials}
          </div>
          <p className="text-xs text-muted truncate max-w-[160px]">{userEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-label text-muted hover:text-white transition-colors"
        >
          CERRAR SESIÓN →
        </button>
      </div>
    </aside>
  )
}
