const TESTIMONIALS = [
  {
    quote: 'Las imágenes superaron todo lo que había imaginado. Hay una comprensión del concepto que no es común.',
    author: 'VALENTINA R.',
    role: 'DIRECTORA CREATIVA',
  },
  {
    quote: 'El proceso fue tan riguroso como el resultado. Una producción donde cada detalle tiene intención.',
    author: 'MARCOS A.',
    role: 'MÚSICO',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-muted mb-16">TESTIMONIOS</p>

        <div className="grid md:grid-cols-2 gap-0 border border-border">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`p-10 md:p-14 flex flex-col justify-between min-h-[280px] ${
                i === 0 ? 'border-b md:border-b-0 md:border-r border-border' : ''
              }`}
            >
              <p className="text-7xl text-border font-black leading-none mb-6">"</p>
              <div>
                <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8">
                  {t.quote}
                </p>
                <div>
                  <p className="text-label text-white">{t.author}</p>
                  <p className="text-label text-muted mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
