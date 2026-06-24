export * from './booking'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: 'client' | 'admin'
  created_at: string
}

export interface Booking {
  id: string
  client_id: string | null
  modality_id: string
  session_date: string
  session_time: string
  status: string
  qual_data: Record<string, unknown> | null
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  deposit_paid_at: string | null
  contact_email: string
  contact_name: string
  contact_phone: string | null
  notes: string | null
  created_at: string
  updated_at: string
  modalities?: {
    name: string
    slug: string
    price_deposit: number
    duration_min: number
  }
}

export interface SessionFile {
  id: string
  booking_id: string
  uploaded_by: string | null
  storage_path: string
  filename: string
  size_bytes: number | null
  mime_type: string | null
  created_at: string
}

export interface AvailableSlot {
  id: string
  date: string
  time_slot: string
  modality_id: string | null
  is_booked: boolean
}
