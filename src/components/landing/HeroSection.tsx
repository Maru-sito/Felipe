'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

const P = {
  surface: '#000000',
  subtle: '#0A0A0A',
  border: '#2D2D2D',
  card: '#1A1A1A',
  accent: '#FFFFFF',
  muted: '#888888',
}

const MODALIDADES = [
  {
    slug: 'EDITORIAL',
    tag: 'Arte / Moda',
    price: 'Desde $5,000 MXN seña',
    desc: 'Imágenes de autor para marcas, lookbooks y campañas de alto impacto visual.',
  },
  {
    slug: 'RETRATO',
    tag: 'Identidad / Autor',
    price: 'Desde $3,500 MXN seña',
    desc: 'Retratos que capturan la esencia y construyen identidad visual duradera.',
  },
  {
    slug: 'COMERCIAL',
    tag: 'Marca / Producto',
    price: 'Desde $8,000 MXN seña',
    desc: 'Fotografía de producto y marca con dirección de arte editorial de primer nivel.',
  },
]

const PROTOCOLOS = [
  { num: '01', title: 'EVALUACIÓN', desc: 'Análisis de visión y objetivos del proyecto' },
  { num: '02', title: 'SESIÓN', desc: 'Dirección de arte editorial en set' },
  { num: '03', title: 'EDICIÓN', desc: 'Retoque y curación de entregables finales' },
  { num: '04', title: 'ENTREGA', desc: 'Galería privada en Área VIP exclusiva' },
]

function BoroDeckGlyph({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <rect x="4" y="4" width="72" height="72" stroke={P.border} strokeWidth="1" />
      <circle
        cx="40"
        cy="40"
        r="28"
        stroke={P.muted}
        strokeWidth="1"
        strokeDasharray="20 8"
        style={{
          animation: 'boro-orbit 8s linear infinite',
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      />
      <line x1="40" y1="16" x2="40" y2="64" stroke={P.border} strokeWidth="1" />
      <line x1="16" y1="40" x2="64" y2="40" stroke={P.border} strokeWidth="1" />
      <circle
        cx="40"
        cy="40"
        r="3"
        fill={P.accent}
        style={{ animation: 'boro-pulse 2s ease-in-out infinite' }}
      />
    </svg>
  )
}

function useBoroAnimations() {
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes boro-intro {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes boro-card {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes boro-orbit {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes boro-pulse {
        0%, 100% { transform: scale(1);    opacity: 1; }
        50%       { transform: scale(1.6); opacity: 0.5; }
      }
    `
    document.head.appendChild(style)
    return () => { style.remove() }
  }, [])
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const protocolRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeModality, setActiveModality] = useState(0)

  useBoroAnimations()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = protocolRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--bx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--by', `${e.clientY - rect.top}px`)
  }, [])

  const anim = (name: string, dur: string, delay: string): React.CSSProperties =>
    visible
      ? { animation: `${name} ${dur} ease-out ${delay} both` }
      : { opacity: 0 }

  return (
    <section
      ref={sectionRef}
      style={{ background: P.surface, minHeight: '100svh' }}
      className="relative flex flex-col px-6 md:px-12 lg:px-20 pb-20 overflow-hidden"
    >
      {/* Nav */}
      <nav className="flex items-center justify-between py-8 mb-8">
        <span className="text-label text-muted tracking-[0.3em]">BORO STUDIO</span>
        <Link href="/login" className="text-label text-muted hover:text-white transition-colors">
          ÁREA VIP →
        </Link>
      </nav>

      {/* Glyph + label row */}
      <div
        className="flex items-center gap-3 mb-6"
        style={anim('boro-intro', '0.6s', '0s')}
      >
        <BoroDeckGlyph size={36} />
        <span className="text-label text-muted">FOTOGRAFÍA EDITORIAL · BUENOS AIRES</span>
      </div>

      {/* Full-width headline */}
      <h1
        className="text-display text-white mb-10"
        style={anim('boro-intro', '0.8s', '0.15s')}
      >
        LA IMAGEN<br />
        <span style={{ color: P.muted }}>COMO</span><br />
        DECLARACIÓN.
      </h1>

      {/* Divider */}
      <div
        className="mb-10"
        style={{
          ...anim('boro-intro', '0.6s', '0.25s'),
          height: '1px',
          background: P.border,
        }}
      />

      {/* Middle row: metrics + modality toggle */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-8">

        {/* Metrics */}
        <div
          className="flex flex-row lg:flex-col justify-start gap-8 lg:gap-6"
          style={anim('boro-intro', '0.6s', '0.3s')}
        >
          {[
            { val: '03', label: 'MODALIDADES' },
            { val: '07+', label: 'AÑOS' },
            { val: '100%', label: 'COMPROMISO' },
          ].map(m => (
            <div key={m.label} className="flex flex-col gap-1">
              <span
                className="font-bold text-white"
                style={{ fontSize: '20px', fontVariantNumeric: 'tabular-nums' }}
              >
                [{m.val}]
              </span>
              <span className="text-label text-muted">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Modality toggle card */}
        <div
          style={{
            ...anim('boro-card', '0.7s', '0.35s'),
            background: P.card,
            border: `1px solid ${P.border}`,
          }}
          className="flex flex-col"
        >
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: `1px solid ${P.border}` }}>
            {MODALIDADES.map((m, i) => (
              <button
                key={m.slug}
                onClick={() => setActiveModality(i)}
                className="flex-1 py-3 text-label transition-colors"
                style={{
                  color: activeModality === i ? P.accent : P.muted,
                  background: activeModality === i ? P.subtle : 'transparent',
                  borderRight: i < 2 ? `1px solid ${P.border}` : 'none',
                }}
              >
                {m.slug}
              </button>
            ))}
          </div>

          {/* Active modality content */}
          <div className="flex flex-col sm:flex-row gap-4 p-5">
            <div className="flex flex-col gap-3 flex-1">
              <span
                className="text-label self-start"
                style={{
                  color: P.muted,
                  border: `1px solid ${P.border}`,
                  padding: '3px 8px',
                }}
              >
                {MODALIDADES[activeModality].tag}
              </span>
              <p className="text-sm leading-relaxed text-white">
                {MODALIDADES[activeModality].desc}
              </p>
            </div>
            <div className="flex flex-col justify-end sm:text-right">
              <span className="text-label" style={{ color: P.muted }}>
                {MODALIDADES[activeModality].price}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body: 3-column */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4 lg:gap-5 flex-1">

        {/* LEFT: Control stack */}
        <div
          className="flex flex-col justify-start lg:justify-end gap-5 order-3 lg:order-1 pt-4 lg:pt-0 lg:pb-2"
          style={anim('boro-intro', '0.6s', '0.4s')}
        >
          <div
            className="hidden lg:block w-px"
            style={{ height: '48px', background: `linear-gradient(to bottom, transparent, ${P.border})` }}
          />
          <Link
            href="/booking/1"
            className="inline-flex items-center gap-3 bg-white text-black px-5 py-4 text-label hover:bg-white/90 transition-colors group"
          >
            AGENDAR EVALUACIÓN
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="#modalidades"
            className="text-label text-muted hover:text-white transition-colors self-start"
          >
            VER MODALIDADES ↓
          </Link>
        </div>

        {/* CENTER: Editorial image */}
        <div
          className="relative overflow-hidden order-1 lg:order-2"
          style={{
            ...anim('boro-intro', '0.8s', '0.3s'),
            border: `1px solid ${P.border}`,
            minHeight: '260px',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format"
            alt="BoRo Studio — fotografía editorial"
            className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }}
          />
        </div>

        {/* RIGHT: Protocol cards with mouse spotlight */}
        <div
          ref={protocolRef}
          className="flex flex-col gap-2 order-2 lg:order-3"
          onMouseMove={handleMouseMove}
        >
          {PROTOCOLOS.map((p, i) => (
            <div
              key={p.num}
              style={{
                ...anim('boro-card', '0.5s', `${0.45 + i * 0.1}s`),
                background: `radial-gradient(180px circle at var(--bx, -100px) var(--by, -100px), rgba(255,255,255,0.07), transparent 80%), ${P.card}`,
                border: `1px solid ${P.border}`,
              }}
              className="flex items-start gap-3 p-4 flex-1"
            >
              <span className="text-label flex-shrink-0" style={{ color: P.muted }}>{p.num}</span>
              <div className="flex flex-col gap-1">
                <span className="text-label text-white">{p.title}</span>
                <span className="text-xs leading-relaxed" style={{ color: P.muted }}>{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 lg:right-20 z-10 flex flex-col items-center gap-2">
        <div
          className="w-px h-12"
          style={{ background: `linear-gradient(to bottom, transparent, ${P.border})` }}
        />
        <span className="text-label text-muted" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
      </div>
    </section>
  )
}
