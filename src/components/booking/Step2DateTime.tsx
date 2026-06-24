'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepIndicator } from './StepIndicator'
import { useBooking } from './BookingProvider'
import { Button } from '@/components/ui/Button'
import { formatDate, formatTime } from '@/lib/utils'
import type { AvailableSlot } from '@/types'

interface Props {
  slots: AvailableSlot[]
}

export function Step2DateTime({ slots }: Props) {
  const router = useRouter()
  const { state, setDateTime } = useBooking()
  const [selectedDate, setSelectedDate] = useState<string | null>(state.date)
  const [selectedTime, setSelectedTime] = useState<string | null>(state.time)

  // Group slots by date
  const slotsByDate = slots.reduce<Record<string, string[]>>((acc, slot) => {
    if (!slot.is_booked) {
      if (!acc[slot.date]) acc[slot.date] = []
      acc[slot.date].push(slot.time_slot)
    }
    return acc
  }, {})

  const availableDates = Object.keys(slotsByDate).sort()
  const timesForDate = selectedDate ? (slotsByDate[selectedDate] ?? []) : []

  function handleContinue() {
    if (!selectedDate || !selectedTime) return
    setDateTime(selectedDate, selectedTime)
    router.push('/booking/3')
  }

  return (
    <div>
      <StepIndicator current={2} />

      <div className="mb-10">
        <p className="text-label text-muted mb-3">PASO 2 DE 4</p>
        <h1 className="text-headline text-white">ELEGÍ<br />FECHA Y HORA</h1>
        {state.modality && (
          <p className="text-muted mt-3">{state.modality.name} · {state.modality.duration_min} min</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-0 border border-border mb-8">
        {/* Date picker */}
        <div className="border-b md:border-b-0 md:border-r border-border p-6">
          <p className="text-label text-muted mb-6">FECHA DISPONIBLE</p>
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-2">
            {availableDates.length === 0 ? (
              <p className="text-muted text-sm">No hay fechas disponibles por el momento.</p>
            ) : availableDates.map(date => (
              <button
                key={date}
                onClick={() => { setSelectedDate(date); setSelectedTime(null) }}
                className={`text-left px-4 py-3 text-sm transition-colors border ${
                  selectedDate === date
                    ? 'bg-white text-black border-white'
                    : 'border-border text-white hover:border-white/40'
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>

        {/* Time picker */}
        <div className="p-6">
          <p className="text-label text-muted mb-6">HORARIO</p>
          {!selectedDate ? (
            <p className="text-muted text-sm">Primero elegí una fecha.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {timesForDate.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-3 text-sm font-semibold transition-colors border ${
                    selectedTime === time
                      ? 'bg-white text-black border-white'
                      : 'border-border text-white hover:border-white/40'
                  }`}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="ghost" onClick={() => router.push('/booking/1')}>
          ← ATRÁS
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
        >
          CONTINUAR →
        </Button>
      </div>
    </div>
  )
}
