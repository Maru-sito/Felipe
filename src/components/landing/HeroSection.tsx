'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const P = {
  surface: '#000000',
  border: '#2D2D2D',
  card: '#1A1A1A',
  accent: '#FFFFFF',
  muted: '#888888',
  dim: '#383838',
  faint: '#1E1E1E',
}

const FEATURES = [
  { slug: 'evaluación', label: 'Evaluación de sesión' },
  { slug: 'arte', label: 'Dirección de arte' },
  { slug: 'edición', label: 'Post-producción digital' },
  { slug: 'entrega', label: 'Galería VIP privada' },
]

const ANNOTATIONS = [
  { y: 72,  text: 'óptica' },
  { y: 118, text: 'enfoque' },
  { y: 164, text: 'apertura' },
  { y: 220, text: 'montura' },
  { y: 336, text: 'corrección' },
  { y: 384, text: 'sensor' },
]

function BoroDeckGlyph({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ display: 'block', flexShrink: 0 }}>
      <rect x="4" y="4" width="72" height="72" stroke={P.dim} strokeWidth="1" />
      <circle
        cx="40" cy="40" r="28"
        stroke={P.muted} strokeWidth="1" strokeDasharray="20 8"
        style={{ animation: 'boro-orbit 8s linear infinite', transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      <line x1="40" y1="16" x2="40" y2="64" stroke={P.dim} strokeWidth="1" />
      <line x1="16" y1="40" x2="64" y2="40" stroke={P.dim} strokeWidth="1" />
      <circle cx="40" cy="40" r="3" fill={P.accent}
        style={{ animation: 'boro-pulse 2s ease-in-out infinite' }} />
    </svg>
  )
}

/* ── Camera lens cross-section blueprint ── */
function CameraLensSVG() {
  return (
    <svg
      viewBox="0 0 560 456"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Grid background */}
      <defs>
        <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#111" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="560" height="456" fill="url(#bp-grid)" />

      {/* ── OUTER BARREL ── */}
      <line x1="58"  y1="148" x2="490" y2="148" stroke={P.dim} strokeWidth="1" />
      <line x1="58"  y1="288" x2="490" y2="288" stroke={P.dim} strokeWidth="1" />
      {/* Front dome */}
      <path d="M 58 148 Q 22 218 58 288" stroke="#4A4A4A" strokeWidth="1.2" fill="none" />
      {/* Rear flange */}
      <line x1="490" y1="132" x2="510" y2="132" stroke="#3A3A3A" strokeWidth="1" />
      <line x1="510" y1="132" x2="510" y2="148" stroke="#3A3A3A" strokeWidth="1" />
      <line x1="490" y1="304" x2="510" y2="304" stroke="#3A3A3A" strokeWidth="1" />
      <line x1="510" y1="288" x2="510" y2="304" stroke="#3A3A3A" strokeWidth="1" />
      <line x1="510" y1="132" x2="510" y2="304" stroke="#4D4D4D" strokeWidth="1.5" />
      <line x1="490" y1="148" x2="490" y2="132" stroke="#3A3A3A" strokeWidth="1" />
      <line x1="490" y1="288" x2="490" y2="304" stroke="#3A3A3A" strokeWidth="1" />
      {/* Optical axis */}
      <line x1="22" y1="218" x2="528" y2="218" stroke="#1E1E1E" strokeWidth="0.8" strokeDasharray="10 5" />

      {/* ── ELEMENT 1: Front biconvex ── */}
      <path d="M 86  158 Q 66  218  86  278" stroke="#686868" strokeWidth="1.2" fill="none" />
      <path d="M 114 161 Q 118 218 114 275" stroke="#686868" strokeWidth="1.2" fill="none" />
      <line x1="86"  y1="158" x2="114" y2="161" stroke="#484848" strokeWidth="0.8" />
      <line x1="86"  y1="278" x2="114" y2="275" stroke="#484848" strokeWidth="0.8" />

      {/* ── ELEMENT 2: Doublet ── */}
      <path d="M 158 162 Q 152 218 158 274" stroke="#686868" strokeWidth="1.2" fill="none" />
      <path d="M 183 160 Q 191 218 183 276" stroke="#686868" strokeWidth="1.2" fill="none" />
      <path d="M 200 162 Q 195 218 200 274" stroke="#686868" strokeWidth="1.2" fill="none" />
      <line x1="158" y1="162" x2="183" y2="160" stroke="#484848" strokeWidth="0.8" />
      <line x1="183" y1="160" x2="200" y2="162" stroke="#484848" strokeWidth="0.8" />
      <line x1="158" y1="274" x2="183" y2="276" stroke="#484848" strokeWidth="0.8" />
      <line x1="183" y1="276" x2="200" y2="274" stroke="#484848" strokeWidth="0.8" />

      {/* ── APERTURE DIAPHRAGM ── */}
      <line x1="256" y1="148" x2="256" y2="193" stroke={P.dim} strokeWidth="1" />
      <line x1="256" y1="193" x2="273" y2="193" stroke={P.dim} strokeWidth="1" />
      <line x1="300" y1="193" x2="316" y2="193" stroke={P.dim} strokeWidth="1" />
      <line x1="316" y1="193" x2="316" y2="148" stroke={P.dim} strokeWidth="1" />
      <line x1="256" y1="288" x2="256" y2="243" stroke={P.dim} strokeWidth="1" />
      <line x1="256" y1="243" x2="273" y2="243" stroke={P.dim} strokeWidth="1" />
      <line x1="300" y1="243" x2="316" y2="243" stroke={P.dim} strokeWidth="1" />
      <line x1="316" y1="243" x2="316" y2="288" stroke={P.dim} strokeWidth="1" />
      {/* Blade polygons */}
      <polygon points="273,193 300,193 308,206 300,218 273,218 265,206"
        stroke="#585858" strokeWidth="0.8" fill="none" />
      <polygon points="273,243 300,243 308,230 300,218 273,218 265,230"
        stroke="#585858" strokeWidth="0.8" fill="none" />

      {/* ── ELEMENT 3: Telephoto group ── */}
      <path d="M 345 165 Q 338 218 345 271" stroke="#686868" strokeWidth="1.2" fill="none" />
      <path d="M 372 168 Q 381 218 372 268" stroke="#686868" strokeWidth="1.2" fill="none" />
      <line x1="345" y1="165" x2="372" y2="168" stroke="#484848" strokeWidth="0.8" />
      <line x1="345" y1="271" x2="372" y2="268" stroke="#484848" strokeWidth="0.8" />

      {/* ── ELEMENT 4: Triplet corrector ── */}
      <path d="M 409 167 Q 403 218 409 269" stroke="#686868" strokeWidth="1.2" fill="none" />
      <path d="M 429 165 Q 437 218 429 271" stroke="#686868" strokeWidth="1.2" fill="none" />
      <path d="M 447 167 Q 442 218 447 269" stroke="#686868" strokeWidth="1.2" fill="none" />
      <line x1="409" y1="167" x2="429" y2="165" stroke="#484848" strokeWidth="0.8" />
      <line x1="429" y1="165" x2="447" y2="167" stroke="#484848" strokeWidth="0.8" />
      <line x1="409" y1="269" x2="429" y2="271" stroke="#484848" strokeWidth="0.8" />
      <line x1="429" y1="271" x2="447" y2="269" stroke="#484848" strokeWidth="0.8" />

      {/* ── ELEMENT 5: Rear element ── */}
      <path d="M 465 171 Q 458 218 465 265" stroke="#686868" strokeWidth="1.2" fill="none" />
      <path d="M 485 173 Q 492 218 485 263" stroke="#686868" strokeWidth="1.2" fill="none" />
      <line x1="465" y1="171" x2="485" y2="173" stroke="#484848" strokeWidth="0.8" />
      <line x1="465" y1="265" x2="485" y2="263" stroke="#484848" strokeWidth="0.8" />

      {/* ── ANNOTATION LINES ── */}
      {/* óptica → front element, goes up */}
      <line x1="100" y1="148" x2="100" y2="72"  stroke="#2E2E2E" strokeWidth="0.7" />
      <line x1="100" y1="72"  x2="556" y2="72"  stroke="#2E2E2E" strokeWidth="0.7" />
      {/* enfoque → second group, goes up */}
      <line x1="179" y1="148" x2="179" y2="118" stroke="#2E2E2E" strokeWidth="0.7" />
      <line x1="179" y1="118" x2="556" y2="118" stroke="#2E2E2E" strokeWidth="0.7" />
      {/* apertura → diaphragm */}
      <line x1="286" y1="193" x2="286" y2="164" stroke="#2E2E2E" strokeWidth="0.7" />
      <line x1="286" y1="164" x2="556" y2="164" stroke="#2E2E2E" strokeWidth="0.7" />
      {/* montura → rear flange axis */}
      <line x1="510" y1="218" x2="556" y2="218" stroke="#2E2E2E" strokeWidth="0.7" />
      {/* corrección → triplet, goes down */}
      <line x1="428" y1="288" x2="428" y2="336" stroke="#2E2E2E" strokeWidth="0.7" />
      <line x1="428" y1="336" x2="556" y2="336" stroke="#2E2E2E" strokeWidth="0.7" />
      {/* sensor → rear element, goes down */}
      <line x1="475" y1="288" x2="475" y2="384" stroke="#2E2E2E" strokeWidth="0.7" />
      <line x1="475" y1="384" x2="556" y2="384" stroke="#2E2E2E" strokeWidth="0.7" />
    </svg>
  )
}

function useBoroAnimations() {
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes boro-intro {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes boro-card {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes boro-orbit {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes boro-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%       { transform: scale(1.6); opacity: 0.5; }
      }
    `
    document.head.appendChild(style)
    return () => { style.remove() }
  }, [])
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useBoroAnimations()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const anim = (name: string, dur: string, delay: string): React.CSSProperties =>
    visible
      ? { animation: `${name} ${dur} ease-out ${delay} both` }
      : { opacity: 0 }

  return (
    <section
      ref={sectionRef}
      style={{ background: P.surface, minHeight: '100svh' }}
      className="relative flex flex-col overflow-hidden"
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-8">
        <span className="text-label text-muted tracking-[0.3em]">BORO STUDIO</span>
        <Link href="/login" className="text-label text-muted hover:text-white transition-colors">
          ÁREA VIP →
        </Link>
      </nav>

      {/* 2-column body */}
      <div className="flex flex-col lg:grid lg:grid-cols-[5fr_7fr] flex-1 px-6 md:px-12 lg:px-0 pb-12 lg:pb-0">

        {/* LEFT: text content */}
        <div className="flex flex-col justify-center lg:pl-16 lg:pr-10 py-8 lg:py-16 gap-8 min-w-0">

          {/* Glyph + label */}
          <div className="flex items-center gap-3" style={anim('boro-intro', '0.6s', '0s')}>
            <BoroDeckGlyph size={32} />
            <span className="text-label text-muted">FOTOGRAFÍA EDITORIAL · SANTIAGO DE CHILE</span>
          </div>

          {/* Headline */}
          <h1
            className="text-white relative z-10"
            style={{
              ...anim('boro-intro', '0.8s', '0.1s'),
              fontSize: 'clamp(52px, 7.5vw, 108px)',
              lineHeight: '0.93',
              fontWeight: 900,
              letterSpacing: '-0.04em',
            }}
          >
            LA IMAGEN<br />
            <span style={{ color: P.muted }}>COMO</span><br />
            DECLARACIÓN.
          </h1>

          {/* Tagline */}
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ ...anim('boro-intro', '0.6s', '0.2s'), color: P.muted }}
          >
            Cada sesión es una declaración visual. Transformamos tu identidad en imágenes que
            no se olvidan.
          </p>

          {/* Feature list */}
          <div className="flex flex-col gap-3" style={anim('boro-card', '0.7s', '0.3s')}>
            {FEATURES.map(f => (
              <div key={f.slug} className="flex items-center gap-3">
                <span
                  className="text-label w-28 flex-shrink-0"
                  style={{ color: P.muted }}
                >
                  {f.slug}
                </span>
                <div className="flex-1 h-px" style={{ background: P.dim }} />
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4" style={anim('boro-intro', '0.6s', '0.4s')}>
            <Link
              href="/booking/1"
              className="inline-flex items-center gap-3 bg-white text-black px-6 py-4 text-label hover:bg-white/90 transition-colors group self-start"
            >
              AGENDAR EVALUACIÓN DE SESIÓN
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="#modalidades"
              className="text-label text-muted hover:text-white transition-colors self-start"
            >
              VER MODALIDADES ↓
            </Link>
          </div>
        </div>

        {/* RIGHT: Camera lens blueprint + labels */}
        <div
          className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l py-8 lg:py-12"
          style={{
            ...anim('boro-intro', '1s', '0.2s'),
            borderColor: P.border,
          }}
        >
          {/* SVG wrapper — relative so labels can be absolute inside */}
          <div className="relative w-full">
            <CameraLensSVG />

            {/* Annotation labels — hidden on mobile, visible lg+ */}
            {ANNOTATIONS.map(a => (
              <div
                key={a.text}
                className="absolute right-0 hidden lg:flex items-center"
                style={{
                  top: `${(a.y / 456) * 100}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                <span
                  className="text-label pr-3"
                  style={{ color: P.muted, fontSize: '9px', letterSpacing: '0.08em' }}
                >
                  {a.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 z-10 flex items-center gap-3">
        <div className="w-12 h-px" style={{ background: P.dim }} />
        <span className="text-label text-muted">SCROLL</span>
      </div>
    </section>
  )
}
