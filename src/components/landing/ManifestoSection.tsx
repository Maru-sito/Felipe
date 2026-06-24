export function ManifestoSection() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-3">
          <p className="text-label text-muted">MANIFIESTO</p>
        </div>
        <div className="lg:col-span-9">
          <p className="text-title text-white/90 leading-tight mb-8">
            No somos un estudio de fotos.<br />
            Somos el espacio donde tu visión<br />
            encuentra su forma definitiva.
          </p>
          <div className="w-24 h-px bg-border mb-8" />
          <p className="text-base text-muted max-w-xl leading-relaxed">
            Cada sesión es una colaboración deliberada entre tu identidad y nuestra mirada.
            Trabajamos con un número limitado de proyectos por mes para garantizar que
            cada producción reciba la atención que merece.
          </p>
        </div>
      </div>
    </section>
  )
}
