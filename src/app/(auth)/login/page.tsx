'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (err) {
      setError('No se pudo enviar el enlace. Intentá de nuevo.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-8">
        <Link href="/" className="text-label text-muted hover:text-white transition-colors">
          ← BORO STUDIO
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {sent ? (
            <div className="text-center">
              <p className="text-4xl mb-6">✉</p>
              <h1 className="text-2xl font-bold text-white mb-4">Revisá tu correo</h1>
              <p className="text-muted leading-relaxed">
                Enviamos un enlace de acceso a <strong className="text-white">{email}</strong>.
                No requiere contraseña — solo hacé clic en el enlace.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <p className="text-label text-muted mb-4">ÁREA VIP</p>
                <h1 className="text-4xl font-black text-white">ACCESO<br />EXCLUSIVO</h1>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input
                  label="CORREO ELECTRÓNICO"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <Button type="submit" size="lg" loading={loading}>
                  ENVIAR ENLACE DE ACCESO
                </Button>

                <p className="text-xs text-muted/60 text-center">
                  Te enviamos un enlace mágico a tu email. Sin contraseñas.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
