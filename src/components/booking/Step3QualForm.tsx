'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepIndicator } from './StepIndicator'
import { useBooking } from './BookingProvider'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { formatDate, formatTime } from '@/lib/utils'
import type { QualFormData } from '@/types'

export function Step3QualForm() {
  const router = useRouter()
  const { state, setQualData } = useBooking()

  const [form, setForm] = useState<QualFormData>({
    contact_name: state.qualData?.contact_name ?? '',
    contact_email: state.qualData?.contact_email ?? '',
    contact_phone: state.qualData?.contact_phone ?? '',
    project_description: state.qualData?.project_description ?? '',
    aesthetic_references: state.qualData?.aesthetic_references ?? '',
    notes: state.qualData?.notes ?? '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(key: keyof QualFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!state.modality || !state.date || !state.time) {
      router.push('/booking/1')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        modality_id: state.modality.id,
        session_date: state.date,
        session_time: state.time,
        qual_data: form,
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Ocurrió un error. Intentá de nuevo.')
      setLoading(false)
      return
    }

    setQualData(form, data.bookingId)
    router.push('/booking/4')
  }

  return (
    <div>
      <StepIndicator current={3} />

      <div className="mb-10">
        <p className="text-label text-muted mb-3">PASO 3 DE 4</p>
        <h1 className="text-headline text-white">CONTANOS<br />TU PROYECTO</h1>
        {state.modality && state.date && state.time && (
          <p className="text-muted mt-3">
            {state.modality.name} · {formatDate(state.date)} · {formatTime(state.time)}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-6">
          <Input
            label="NOMBRE COMPLETO *"
            placeholder="Tu nombre"
            value={form.contact_name}
            onChange={set('contact_name')}
            required
          />
          <Input
            label="CORREO ELECTRÓNICO *"
            type="email"
            placeholder="tu@correo.com"
            value={form.contact_email}
            onChange={set('contact_email')}
            required
          />
        </div>

        <Input
          label="TELÉFONO (WHATSAPP)"
          type="tel"
          placeholder="+54 9 11 0000 0000"
          value={form.contact_phone}
          onChange={set('contact_phone')}
        />

        <Textarea
          label="DESCRIPCIÓN DEL PROYECTO *"
          placeholder="¿Qué querés comunicar? ¿Para qué usarás las fotos? Contanos todo."
          value={form.project_description}
          onChange={set('project_description')}
          rows={4}
          required
        />

        <Textarea
          label="REFERENCIAS ESTÉTICAS"
          placeholder="Links a imágenes de referencia, fotógrafos que admirás, estética que buscás."
          value={form.aesthetic_references}
          onChange={set('aesthetic_references')}
          rows={3}
        />

        <Textarea
          label="NOTAS ADICIONALES"
          placeholder="Requerimientos técnicos, fechas de entrega, presupuesto total, etc."
          value={form.notes}
          onChange={set('notes')}
          rows={3}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-4 pt-2">
          <Button variant="ghost" type="button" onClick={() => router.push('/booking/2')}>
            ← ATRÁS
          </Button>
          <Button type="submit" loading={loading}>
            CONTINUAR AL PAGO →
          </Button>
        </div>
      </form>
    </div>
  )
}
