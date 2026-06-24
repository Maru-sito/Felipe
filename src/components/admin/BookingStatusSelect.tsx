'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { STATUS_LABELS, type ProjectStatus } from '@/types'

const STATUSES: ProjectStatus[] = ['confirmed', 'editing', 'delivered', 'cancelled']

interface Props {
  bookingId: string
  currentStatus: ProjectStatus
}

export function BookingStatusSelect({ bookingId, currentStatus }: Props) {
  const [status, setStatus] = useState<ProjectStatus>(currentStatus)
  const [saving, setSaving] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as ProjectStatus
    setSaving(true)
    const supabase = createClient()
    await supabase
      .from('bookings')
      .update({ status: next })
      .eq('id', bookingId)
    setStatus(next)
    setSaving(false)
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={saving}
      className="bg-card border border-border text-white text-sm px-3 py-2 focus:outline-none focus:border-white/50 disabled:opacity-50"
    >
      {STATUSES.map(s => (
        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
      ))}
    </select>
  )
}
