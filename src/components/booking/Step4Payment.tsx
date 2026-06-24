'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepIndicator } from './StepIndicator'
import { useBooking } from './BookingProvider'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'

export function Step4Payment() {
  const router = useRouter()
  const { state, reset } = useBooking()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const deposit = state.modality?.price_deposit ?? 0

  async function handleRealPayment() {
    if (!state.bookingId) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId: state.bookingId }),
    })

    const data = await res.json()

    if (!res.ok || !data.url) {
      setError(data.error ?? 'Error al conectar con el sistema de pago.')
      setLoading(false)
      return
    }

    window.location.href = data.url
  }

  async function handleMockPayment() {
    if (!state.bookingId) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/stripe/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-mock-payment': 'true' },
      body: JSON.stringify({ bookingId: state.bookingId, email: state.qualData?.contact_email }),
    })

    if (res.ok) {
      reset()
      router.push('/booking/confirmation')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Error en la simulación de pago.')
      setLoading(false)
    }
  }

  return (
    <div>
      <StepIndicator current={4} />

      <div className="mb-10">
        <p className="text-label text-muted mb-3">PASO 4 DE 4</p>
        <h1 className="text-headline text-white">CONFIRMÁ<br />TU SESIÓN</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Summary */}
        <div className="border border-border p-8">
          <p className="text-label text-muted mb-6">RESUMEN DE LA RESERVA</p>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted">Modalidad</span>
              <span className="text-sm text-white font-semibold">{state.modality?.name}</span>
            </div>
            <div className="w-full h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-sm text-muted">Fecha</span>
              <span className="text-sm text-white">{state.date ? formatDate(state.date) : '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Hora</span>
              <span className="text-sm text-white">{state.time ? formatTime(state.time) : '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Duración</span>
              <span className="text-sm text-white">{state.modality?.duration_min} min</span>
            </div>
            <div className="w-full h-px bg-border" />
            <div className="flex justify-between items-end">
              <span className="text-label text-muted">SEÑA A ABONAR</span>
              <span className="text-2xl font-black text-white">{formatCurrency(deposit)}</span>
            </div>
          </div>
        </div>

        {/* Payment block */}
        <div className="border border-border p-8 flex flex-col justify-between">
          <div>
            <p className="text-label text-muted mb-6">PAGO SEGURO</p>
            <p className="text-sm text-muted leading-relaxed mb-8">
              La seña garantiza tu fecha y hora. El monto restante se abona el día de la sesión.
              Política de cancelación: 72hs de anticipación para reprogramar.
            </p>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs text-muted/60">🔒</span>
              <span className="text-xs text-muted/60">Pago procesado por Stripe · SSL</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button size="lg" onClick={handleRealPayment} loading={loading}>
              PAGAR {formatCurrency(deposit)} →
            </Button>

            {/* Development mock button */}
            {process.env.NODE_ENV === 'development' && (
              <Button variant="ghost" size="sm" onClick={handleMockPayment} disabled={loading}>
                [DEV] SIMULAR PAGO EXITOSO
              </Button>
            )}
          </div>
        </div>
      </div>

      <Button variant="ghost" onClick={() => router.push('/booking/3')}>
        ← ATRÁS
      </Button>
    </div>
  )
}
