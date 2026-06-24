'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('w-full'),
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80&auto=format"
          alt="BoRo Studio"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      </div>

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 py-8">
        <span className="text-label text-muted tracking-[0.3em]">BORO STUDIO</span>
        <Link
          href="/login"
          className="text-label text-muted hover:text-white transition-colors"
        >
          ÁREA VIP →
        </Link>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl">
        <p className="text-label text-muted mb-6">FOTOGRAFÍA EDITORIAL · BUENOS AIRES</p>
        <h1 className="text-display text-white mb-8 max-w-5xl">
          LA IMAGEN<br />
          <span className="text-muted">COMO</span><br />
          DECLARACIÓN.
        </h1>

        <div
          ref={lineRef}
          className="h-px bg-border w-0 transition-all duration-1000 mb-8"
          style={{ maxWidth: '500px' }}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            href="/booking/1"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-label hover:bg-white/90 transition-colors group"
          >
            AGENDAR EVALUACIÓN DE SESIÓN
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link href="#modalidades" className="text-label text-muted hover:text-white transition-colors">
            VER MODALIDADES ↓
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 lg:right-20 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-border" />
        <span className="text-label text-muted" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
      </div>
    </section>
  )
}
