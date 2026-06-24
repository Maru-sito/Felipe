'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-8 right-6 md:right-10 z-50 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Link
        href="/booking/1"
        className="flex items-center gap-3 bg-white text-black px-6 py-4 text-label font-bold hover:bg-white/90 active:scale-95 transition-all shadow-2xl shadow-black/50 group"
      >
        AGENDAR EVALUACIÓN DE SESIÓN
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  )
}
