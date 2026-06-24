export type BookingStep = 1 | 2 | 3 | 4

export interface Modality {
  id: string
  slug: string
  name: string
  description: string
  price_deposit: number
  duration_min: number
  active: boolean
}

export interface QualFormData {
  contact_name: string
  contact_email: string
  contact_phone: string
  project_description: string
  aesthetic_references: string
  notes: string
}

export interface BookingState {
  modality: Modality | null
  date: string | null
  time: string | null
  qualData: QualFormData | null
  bookingId: string | null
  stripeSessionId: string | null
}

export type ProjectStatus = 'pending_payment' | 'confirmed' | 'editing' | 'delivered' | 'cancelled'

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  pending_payment: 'Pendiente de Pago',
  confirmed: 'Confirmado',
  editing: 'En Edición',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  pending_payment: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
  confirmed: 'bg-blue-900/30 text-blue-400 border-blue-800',
  editing: 'bg-purple-900/30 text-purple-400 border-purple-800',
  delivered: 'bg-green-900/30 text-green-400 border-green-800',
  cancelled: 'bg-red-900/30 text-red-400 border-red-800',
}
