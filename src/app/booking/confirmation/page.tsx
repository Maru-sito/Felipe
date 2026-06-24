import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-12 py-8 border-b border-border">
        <Link href="/" className="text-label text-muted hover:text-white transition-colors">
          ← BORO STUDIO
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 inline-flex items-center justify-center w-16 h-16 border border-white/20 rounded-full">
            <span className="text-2xl">✓</span>
          </div>

          <h1 className="text-headline text-white mb-6">RESERVA<br />CONFIRMADA</h1>

          <p className="text-muted text-base leading-relaxed mb-3 max-w-md mx-auto">
            Tu seña fue procesada con éxito. En las próximas horas recibirás un email
            con los detalles de tu sesión y el acceso a tu Área VIP.
          </p>

          <p className="text-sm text-muted/60 mb-12 max-w-md mx-auto">
            Si tenés alguna consulta, escribinos a{' '}
            <a href="mailto:hola@borostudio.com" className="text-white hover:underline">
              hola@borostudio.com
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg">ACCEDER AL ÁREA VIP →</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="lg">VOLVER AL INICIO</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
