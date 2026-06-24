const STEPS = [
  {
    number: '01',
    title: 'Evaluación de Sesión',
    description: 'Completás el formulario de calificación. Nos interesa entender tu visión antes de confirmar el proyecto.',
  },
  {
    number: '02',
    title: 'Seña y Confirmación',
    description: 'Una vez aprobada la evaluación, se confirma la fecha con el pago de la seña a través del sistema seguro.',
  },
  {
    number: '03',
    title: 'La Producción',
    description: 'El día de la sesión trabajamos juntos en un entorno controlado y de absoluta privacidad.',
  },
  {
    number: '04',
    title: 'Entrega en Área VIP',
    description: 'Tus fotografías finales están disponibles en tu área privada para descarga en alta resolución.',
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-3">
            <p className="text-label text-muted">EL PROCESO</p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="text-headline text-white">CÓMO<br />TRABAJAMOS</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`p-8 ${
                i < STEPS.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''
              } ${i === 2 ? 'md:border-r-0 lg:border-r border-border' : ''}`}
            >
              <span className="block text-4xl font-black text-border mb-6">{step.number}</span>
              <h3 className="text-base font-bold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
