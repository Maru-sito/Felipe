'use client'

import { useState, useEffect, useCallback } from 'react'
import type { BookingState, Modality, QualFormData } from '@/types'

const STORAGE_KEY = 'boro_booking_state'

const initialState: BookingState = {
  modality: null,
  date: null,
  time: null,
  qualData: null,
  bookingId: null,
  stripeSessionId: null,
}

export function useBookingState() {
  const [state, setState] = useState<BookingState>(initialState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) setState(JSON.parse(saved))
    } catch {}
    setHydrated(true)
  }, [])

  const persist = useCallback((next: BookingState) => {
    setState(next)
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {}
  }, [])

  const setModality = useCallback((modality: Modality) => {
    persist({ ...initialState, modality })
  }, [persist])

  const setDateTime = useCallback((date: string, time: string) => {
    setState(prev => {
      const next = { ...prev, date, time }
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const setQualData = useCallback((qualData: QualFormData, bookingId: string) => {
    setState(prev => {
      const next = { ...prev, qualData, bookingId }
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const reset = useCallback(() => {
    persist(initialState)
    try { sessionStorage.removeItem(STORAGE_KEY) } catch {}
  }, [persist])

  return { state, hydrated, setModality, setDateTime, setQualData, reset }
}
