'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'PANEL' },
  { href: '/admin/reservas', label: 'RESERVAS' },
  { href: '/admin/clientes', label: 'CLIENTES' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside className="w-full lg:w-64 lg:min-h-screen flex flex-col border-b lg:border-b-0 lg:border-r border-border">
      <div className="px-8 py-8 border-b border-border">
        <Link href="/" className="text-label tracking-[0.25em] text-white">BORO STUDIO</Link>
        <p className="text-label text-muted mt-1">PANEL ADMIN</p>
      </div>

      <nav className="flex lg:flex-col flex-row gap-0 overflow-x-auto flex-1 lg:pt-6">
        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'px-8 py-4 text-label transition-colors whitespace-nowrap',
              pathname === item.href
                ? 'text-white bg-card lg:border-l-2 lg:border-l-white'
                : 'text-muted hover:text-white'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-8 py-6 border-t border-border mt-auto">
        <p className="text-label text-muted mb-3">FELIPE · ADMIN</p>
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
