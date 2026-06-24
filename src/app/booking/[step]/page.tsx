import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Step1Modality } from '@/components/booking/Step1Modality'
import { Step2DateTime } from '@/components/booking/Step2DateTime'
import { Step3QualForm } from '@/components/booking/Step3QualForm'
import { Step4Payment } from '@/components/booking/Step4Payment'

interface Props {
  params: Promise<{ step: string }>
}

export default async function BookingStepPage({ params }: Props) {
  const { step } = await params
  const stepNum = parseInt(step)

  if (isNaN(stepNum) || stepNum < 1 || stepNum > 4) {
    notFound()
  }

  const supabase = await createClient()

  if (stepNum === 1) {
    const { data: modalities } = await supabase
      .from('modalities')
      .select('*')
      .eq('active', true)
      .order('price_deposit', { ascending: true })

    return <Step1Modality modalities={modalities ?? []} />
  }

  if (stepNum === 2) {
    const { data: slots } = await supabase
      .from('available_slots')
      .select('*')
      .eq('is_booked', false)
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date')
      .order('time_slot')

    return <Step2DateTime slots={slots ?? []} />
  }

  if (stepNum === 3) {
    return <Step3QualForm />
  }

  if (stepNum === 4) {
    return <Step4Payment />
  }

  redirect('/booking/1')
}
