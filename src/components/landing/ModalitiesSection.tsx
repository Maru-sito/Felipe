import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

const MODALITIES = [
  {
    number: '01',
    slug: 'editorial',
    name: 'Sesión Editorial',
    description: 'Producción de alto impacto con concepto, dirección creativa y postproducción incluidos. Para quienes necesitan una imagen que narre una historia completa.',
    deposit: 350000,
    duration: '3 hrs',
    tag: 'MODA · CAMPAÑA',
  },
  {
    number: '02',
    slug: 'retrato',
    name: 'Retrato de Autor',
    description: 'Retratos íntimos y expresivos que capturan la esencia de la persona. Para artistas, músicos, escritores y figuras públicas.',
    deposit: 150000,
    duration: '90 min',
    tag: 'ARTISTAS · FIGURAS',
  },
  {
    number: '03',
    slug: 'comercial',
    name: 'Fotografía Comercial',
    description: 'Contenido visual de campaña internacional para marcas que no transigen en calidad. Dirección de arte y entrega en RAW + retoque.',
    deposit: 250000,
    duration: '2 hrs',
    tag: 'MARCA · PRODUCTO',
  },
]

export function ModalitiesSection() {
  return (
    <section id="modalidades" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <h2 className="text-headline text-white">MODALIDADES</h2>
          <Link href="/booking/1" className="text-label text-muted hover:text-white transition-colors whitespace-nowrap">
            AGENDAR SESIÓN →
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-0 border border-border">
          {MODALITIES.map((m, i) => (
            <div
              key={m.slug}
              className={`p-8 md:p-10 flex flex-col justify-between min-h-[400px] ${
                i < MODALITIES.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-border' : ''
              } hover:bg-card transition-colors group`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-label text-muted">{m.number}</span>
                  <span className="text-label text-muted/60">{m.tag}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{m.name}</h3>
                <p className="text-sm text-muted leading-relaxed">{m.description}</p>
              </div>
              <div>
                <div className="w-full h-px bg-border mb-6" />
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-label text-muted mb-1">SEÑA</p>
                    <p className="text-xl font-bold text-white">{formatCurrency(m.deposit)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-label text-muted mb-1">DURACIÓN</p>
                    <p className="text-sm font-semibold text-white">{m.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
