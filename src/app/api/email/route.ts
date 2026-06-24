import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend/client'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { type, bookingId, email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email requerido.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: booking } = await supabase
      .from('bookings')
      .select('*, modalities(name)')
      .eq('id', bookingId)
      .single()

    if (type === 'booking_confirmed') {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: 'Tu sesión en BoRo Studio está confirmada',
        html: `
          <div style="background:#000;color:#fff;font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto;">
            <h1 style="font-size:32px;font-weight:900;margin-bottom:24px;">RESERVA CONFIRMADA</h1>
            <p style="color:#888;margin-bottom:16px;">Tu seña fue procesada con éxito.</p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
              <tr style="border-bottom:1px solid #2D2D2D;">
                <td style="padding:12px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Modalidad</td>
                <td style="padding:12px 0;text-align:right;font-weight:600;">${booking?.modalities?.name ?? '—'}</td>
              </tr>
              <tr style="border-bottom:1px solid #2D2D2D;">
                <td style="padding:12px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Fecha</td>
                <td style="padding:12px 0;text-align:right;font-weight:600;">${booking?.session_date ?? '—'}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Hora</td>
                <td style="padding:12px 0;text-align:right;font-weight:600;">${booking?.session_time ?? '—'}</td>
              </tr>
            </table>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display:inline-block;background:#fff;color:#000;padding:14px 28px;font-weight:700;font-size:12px;letter-spacing:0.1em;text-decoration:none;text-transform:uppercase;">
              ACCEDER AL ÁREA VIP →
            </a>
            <p style="margin-top:40px;color:#444;font-size:12px;">
              BoRo Studio · Buenos Aires
            </p>
          </div>
        `,
      })
    }

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('Email route error:', err)
    return NextResponse.json({ error: 'Error al enviar email.' }, { status: 500 })
  }
}
