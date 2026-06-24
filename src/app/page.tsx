import { HeroSection } from '@/components/landing/HeroSection'
import { ManifestoSection } from '@/components/landing/ManifestoSection'
import { ModalitiesSection } from '@/components/landing/ModalitiesSection'
import { ProcessSection } from '@/components/landing/ProcessSection'
import { GallerySection } from '@/components/landing/GallerySection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { Footer } from '@/components/landing/Footer'
import { FloatingCTA } from '@/components/landing/FloatingCTA'

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen">
      <HeroSection />
      <ManifestoSection />
      <ModalitiesSection />
      <ProcessSection />
      <GallerySection />
      <TestimonialsSection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
