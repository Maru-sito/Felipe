import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { modality_id, session_date, session_time, qual_data, contact_name, contact_email, contact_phone } = body

    if (!modality_id || !session_date || !session_time || !contact_name || !contact_email) {
      return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        modality_id,
        session_date,
        session_time,
        qual_data,
        contact_name,
        contact_email,
        contact_phone: contact_phone || null,
        status: 'pending_payment',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Booking insert error:', error)
      return NextResponse.json({ error: 'Error al guardar la reserva.' }, { status: 500 })
    }

    // Mark the slot as booked
    await supabase
      .from('available_slots')
      .update({ is_booked: true })
      .eq('date', session_date)
      .eq('time_slot', session_time)

    return NextResponse.json({ bookingId: data.id })
  } catch (err) {
    console.error('Booking route error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
