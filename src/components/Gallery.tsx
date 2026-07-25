import { useState } from 'react'

const images = [
  { src: '/chargerboost.jpg', span: 'col-span-1 row-span-2', aspect: 'aspect-[3/4]' },
  { src: '/pugati.jpg', span: 'col-span-1 row-span-1', aspect: 'aspect-[4/3]' },
  { src: '/bmw.jpg', span: 'col-span-1 row-span-1', aspect: 'aspect-[4/3]' },
  { src: '/lambo.jpg', span: 'col-span-1 row-span-2', aspect: 'aspect-[3/4]' },
  { src: '/mustang5thshelby.jpg', span: 'col-span-1 row-span-1', aspect: 'aspect-[4/3]' },
  { src: '/dodge98.jpg', span: 'col-span-1 row-span-1', aspect: 'aspect-[4/3]' },
  { src: '/mustangegt500.jpg', span: 'col-span-1 row-span-1', aspect: 'aspect-[4/3]' },
  { src: '/charger.png', span: 'col-span-1 row-span-2', aspect: 'aspect-[3/4]' },
]

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="gallery" className="bg-bg py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block" data-reveal>Gallery</span>
          <h2 className="font-heading text-heading-1 font-semibold text-primary" data-reveal>
            Visual Stories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[280px]">
          {images.map((img, i) => (
            <div key={i} className={`${img.span} overflow-hidden group cursor-pointer`} data-reveal onClick={() => setSelected(i)}>
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-800 ease-luxury group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center cursor-pointer px-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded-full"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[210] w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded-full"
            onClick={(e) => { e.stopPropagation(); setSelected((selected - 1 + images.length) % images.length) }}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[210] w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded-full"
            onClick={(e) => { e.stopPropagation(); setSelected((selected + 1) % images.length) }}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <img
            src={images[selected].src}
            alt=""
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
