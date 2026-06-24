import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-label tracking-[0.3em] text-white mb-2">BORO STUDIO</p>
          <p className="text-label text-muted">BUENOS AIRES, ARGENTINA</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
          <Link href="https://instagram.com" target="_blank" className="text-label text-muted hover:text-white transition-colors">
            INSTAGRAM →
          </Link>
          <a href="mailto:hola@borostudio.com" className="text-label text-muted hover:text-white transition-colors">
            CONTACTO →
          </a>
          <Link href="/login" className="text-label text-muted hover:text-white transition-colors">
            ÁREA VIP →
          </Link>
        </div>

        <p className="text-label text-muted/40">
          © {new Date().getFullYear()} BORO STUDIO
        </p>
      </div>
    </footer>
  )
}
