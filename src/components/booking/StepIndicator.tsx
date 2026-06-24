interface StepIndicatorProps {
  current: number
}

const STEPS = [
  { n: 1, label: 'MODALIDAD' },
  { n: 2, label: 'FECHA Y HORA' },
  { n: 3, label: 'TU PROYECTO' },
  { n: 4, label: 'PAGO' },
]

export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 border border-border mb-12">
      {STEPS.map((step, i) => (
        <div
          key={step.n}
          className={`flex-1 px-4 py-3 flex items-center gap-3 ${
            i < STEPS.length - 1 ? 'border-r border-border' : ''
          } ${
            current === step.n
              ? 'bg-white text-black'
              : current > step.n
              ? 'bg-card text-muted'
              : 'bg-transparent text-muted/40'
          }`}
        >
          <span className={`text-xs font-black w-5 h-5 flex items-center justify-center rounded-full border ${
            current === step.n ? 'border-black' : current > step.n ? 'border-muted' : 'border-muted/30'
          }`}>
            {current > step.n ? '✓' : step.n}
          </span>
          <span className="text-label hidden sm:block">{step.label}</span>
        </div>
      ))}
    </div>
  )
}
