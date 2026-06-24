import Link from 'next/link'
import { BookingProvider } from '@/components/booking/BookingProvider'

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-black">
        <nav className="flex items-center justify-between px-6 md:px-12 py-8 border-b border-border">
          <Link href="/" className="text-label text-muted hover:text-white transition-colors">
            ← BORO STUDIO
          </Link>
          <span className="text-label text-muted">EVALUACIÓN DE SESIÓN</span>
          <Link href="/login" className="text-label text-muted hover:text-white transition-colors hidden sm:block">
            ÁREA VIP →
          </Link>
        </nav>
        <div className="px-6 md:px-12 lg:px-20 py-12 max-w-5xl mx-auto">
          {children}
        </div>
      </div>
    </BookingProvider>
  )
}
