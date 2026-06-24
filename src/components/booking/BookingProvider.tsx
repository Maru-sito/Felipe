'use client'

import { createContext, useContext } from 'react'
import { useBookingState } from '@/hooks/useBookingState'
import type { BookingState, Modality, QualFormData } from '@/types'

interface BookingContextValue {
  state: BookingState
  hydrated: boolean
  setModality: (m: Modality) => void
  setDateTime: (date: string, time: string) => void
  setQualData: (q: QualFormData, bookingId: string) => void
  reset: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const value = useBookingState()
  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
