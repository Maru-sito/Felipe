import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: 'bookingId requerido.' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, modalities(name, price_deposit)')
      .eq('id', bookingId)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: 'Reserva no encontrada.' }, { status: 404 })
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'ars',
            product_data: {
              name: `Seña — ${booking.modalities?.name ?? 'Sesión Fotográfica'}`,
              description: `Reserva para el ${booking.session_date} a las ${booking.session_time}`,
            },
            unit_amount: booking.modalities?.price_deposit ?? 0,
          },
          quantity: 1,
        },
      ],
      metadata: {
        booking_id: bookingId,
        contact_email: booking.contact_email,
      },
      customer_email: booking.contact_email,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/4`,
    })

    await supabase
      .from('bookings')
      .update({ stripe_session_id: session.id })
      .eq('id', bookingId)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Error al crear sesión de pago.' }, { status: 500 })
  }
}
