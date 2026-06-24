'use client'

import { useRouter } from 'next/navigation'
import { StepIndicator } from './StepIndicator'
import { useBooking } from './BookingProvider'
import { formatCurrency } from '@/lib/utils'
import type { Modality } from '@/types'

interface Props {
  modalities: Modality[]
}

export function Step1Modality({ modalities }: Props) {
  const router = useRouter()
  const { state, setModality } = useBooking()

  function handleSelect(m: Modality) {
    setModality(m)
    router.push('/booking/2')
  }

  return (
    <div>
      <StepIndicator current={1} />

      <div className="mb-10">
        <p className="text-label text-muted mb-3">PASO 1 DE 4</p>
        <h1 className="text-headline text-white">¿QUÉ TIPO<br />DE SESIÓN?</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-0 border border-border">
        {modalities.map((m, i) => (
          <button
            key={m.id}
            onClick={() => handleSelect(m)}
            className={`text-left p-8 flex flex-col justify-between min-h-[320px] transition-all group ${
              i < modalities.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''
            } ${
              state.modality?.id === m.id
                ? 'bg-white text-black'
                : 'hover:bg-card text-white'
            }`}
          >
            <div>
              <p className={`text-label mb-4 ${state.modality?.id === m.id ? 'text-black/50' : 'text-muted'}`}>
                0{i + 1}
              </p>
              <h3 className="text-xl font-bold mb-3">{m.name}</h3>
              <p className={`text-sm leading-relaxed ${state.modality?.id === m.id ? 'text-black/70' : 'text-muted'}`}>
                {m.description}
              </p>
            </div>
            <div>
              <div className={`w-full h-px mb-5 ${state.modality?.id === m.id ? 'bg-black/20' : 'bg-border'}`} />
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-label mb-1 ${state.modality?.id === m.id ? 'text-black/50' : 'text-muted'}`}>SEÑA</p>
                  <p className="text-lg font-bold">{formatCurrency(m.price_deposit)}</p>
                </div>
                <p className={`text-label ${state.modality?.id === m.id ? 'text-black/50' : 'text-muted'}`}>
                  {m.duration_min} MIN
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
