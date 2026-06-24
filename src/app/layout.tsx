import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BoRo Studio — Fotografía Editorial y de Moda',
  description: 'Estudio fotográfico de alta gama especializado en moda editorial, retratos y contenido comercial.',
  keywords: ['fotografía editorial', 'moda', 'estudio fotográfico', 'sesión fotográfica'],
  openGraph: {
    title: 'BoRo Studio',
    description: 'Fotografía editorial y de moda de alta gama.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
