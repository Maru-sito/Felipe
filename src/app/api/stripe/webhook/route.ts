import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'

// Mock payment handler for development
async function handleMockPayment(bookingId: string, email: string) {
  const supabase = await createClient()

  const { data: booking } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single()

  if (!booking) return { error: 'Reserva no encontrada.' }

  // Update booking status
  await supabase
    .from('bookings')
    .update({
      status: 'confirmed',
      deposit_paid_at: new Date().toISOString(),
      stripe_payment_intent_id: `mock_${Date.now()}`,
    })
    .eq('id', bookingId)

  // Create user if not exists (service role needed in production)
  // In dev mock, we skip actual user creation

  return { success: true }
}

export async function POST(request: Request) {
  const headersList = await headers()
  const isMock = headersList.get('x-mock-payment') === 'true'

  if (isMock) {
    try {
      const { bookingId, email } = await request.json()
      const result = await handleMockPayment(bookingId, email)
      if (result.error) return NextResponse.json({ error: result.error }, { status: 400 })
      return NextResponse.json({ success: true })
    } catch (err) {
      return NextResponse.json({ error: 'Error en mock de pago.' }, { status: 500 })
    }
  }

  // Real Stripe webhook
  const body = await request.text()
  const sig = headersList.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret)
  } catch (err) {
    console.error('Stripe webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const bookingId = session.metadata?.booking_id
    const contactEmail = session.metadata?.contact_email

    if (!bookingId || !contactEmail) {
      return NextResponse.json({ error: 'Missing metadata.' }, { status: 400 })
    }

    const supabase = await createClient()

    // Update booking
    await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        deposit_paid_at: new Date().toISOString(),
        stripe_payment_intent_id: session.payment_intent as string,
      })
      .eq('id', bookingId)

    // Send confirmation email
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'booking_confirmed', bookingId, email: contactEmail }),
    })
  }

  return NextResponse.json({ received: true })
}
