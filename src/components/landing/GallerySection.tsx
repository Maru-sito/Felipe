const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80', span: 'col-span-2 row-span-2', alt: 'Sesión editorial moda' },
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', span: 'col-span-1 row-span-1', alt: 'Retrato artístico' },
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', span: 'col-span-1 row-span-1', alt: 'Fotografía de moda' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', span: 'col-span-1 row-span-1', alt: 'Editorial' },
  { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80', span: 'col-span-2 row-span-1', alt: 'Campaña de moda' },
]

export function GallerySection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-headline text-white">TRABAJO</h2>
          <p className="text-label text-muted hidden md:block">SELECCIÓN EDITORIAL</p>
        </div>

        <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[600px] md:h-[800px]">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden ${img.span} group`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
