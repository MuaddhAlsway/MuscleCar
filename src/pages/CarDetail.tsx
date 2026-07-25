import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import carsData from '../data/cars'
import Navbar from '../components/Navbar'

const colors = [
  { name: 'Meridian Silver', hex: '#C4C0B8' },
  { name: 'Obsidian Black', hex: '#1A1714' },
  { name: 'Glacier White', hex: '#EDEBE8' },
  { name: 'Racing Green', hex: '#2D4A3E' },
  { name: 'Midnight Blue', hex: '#1E2A3A' },
  { name: 'Desert Sand', hex: '#C4A97D' },
]

export default function CarDetail() {
  const { id } = useParams()
  const car = carsData.find(c => c.id === id)
  const [selColor, setSelColor] = useState(0)
  const [selImage, setSelImage] = useState(0)
  const [formSent, setFormSent] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.detail-hero-img', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' })
      gsap.fromTo('.detail-title-word', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.1, delay: 0.3, ease: 'power3.out' })
      gsap.fromTo('.detail-fade', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.8, ease: 'power3.out' })
    }, heroRef)
    return () => ctx.revert()
  }, [id])

  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]')
    els.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [id])

  if (!car) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-primary mb-4">Vehicle Not Found</h1>
          <Link to="/" className="text-accent text-sm font-medium tracking-wider uppercase">Return Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div ref={heroRef} className="bg-bg min-h-screen">
      <Navbar detail />
      {/* Hero */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img src={car.image} alt={car.name} className="detail-hero-img absolute inset-0 w-full h-full object-cover scale-110 opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 md:px-10 max-w-[1600px] mx-auto w-full">
          <Link to="/" className="detail-fade inline-flex items-center gap-2 text-light/50 text-xs font-medium tracking-[0.12em] uppercase mb-6 hover:text-light transition-colors opacity-0">
            ← Back to Collection
          </Link>
          <div className="detail-fade opacity-0">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-3 block">{car.tagline}</span>
          </div>
          <h1 className="mb-4">
            {car.name.split(' ').map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="detail-title-word block font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-semibold text-light translate-y-[110%]">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <div className="detail-fade flex items-center gap-6 opacity-0">
            <span className="text-sm font-semibold text-light">{car.power}</span>
            <span className="w-px h-4 bg-light/20" />
            <span className="text-sm font-semibold text-light">{car.speed}</span>
            <span className="w-px h-4 bg-light/20" />
            <span className="text-sm font-light text-light/60">{car.price}</span>
          </div>
        </div>
      </section>

      {/* Description + Gallery */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div data-reveal>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">Overview</span>
            <p className="text-base md:text-lg font-light text-primary/60 leading-relaxed mb-8">{car.description}</p>
            <div className="flex gap-3">
              {car.gallery.map((img, i) => (
                <button key={i} onClick={() => setSelImage(i)} className={`w-20 h-14 overflow-hidden border-2 transition-all duration-300 ${selImage === i ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden" data-reveal>
            <img src={car.gallery[selImage]} alt={car.name} className="w-full h-full object-cover transition-all duration-700" />
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="bg-dark py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block" data-reveal>Specifications</span>
          <h2 className="font-heading text-heading-1 font-semibold text-light mb-16" data-reveal>Technical Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-light/10">
            {car.specs.map((spec) => (
              <div key={spec.label} className="bg-dark p-6 md:p-8" data-reveal>
                <span className="block text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2">{spec.label}</span>
                <span className="text-sm md:text-base font-semibold text-light">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block" data-reveal>Features</span>
          <h2 className="font-heading text-heading-1 font-semibold text-primary mb-12" data-reveal>Standard Equipment</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {car.features.map((f) => (
              <div key={f} className="bg-surface p-6 flex items-center gap-4" data-reveal>
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="text-sm font-medium text-primary">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section className="bg-surface py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div data-reveal>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">Configure</span>
            <h2 className="font-heading text-heading-2 font-semibold text-primary mb-6">Make It Yours</h2>
            <p className="text-sm font-light text-primary/50 leading-relaxed mb-8 max-w-md">Select your exterior colour and visualise your perfect {car.name}. Every shade hand-mixed to our exacting standards.</p>
            <div className="flex flex-wrap gap-3 mb-4">
              {colors.map((c, i) => (
                <button key={c.name} onClick={() => setSelColor(i)} className={`w-11 h-11 rounded-full transition-all duration-300 ${selColor === i ? 'ring-2 ring-accent ring-offset-3 ring-offset-surface scale-110' : 'hover:scale-105'}`} style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </div>
            <span className="text-xs text-primary/40">{colors[selColor].name}</span>
          </div>
          <div className="relative aspect-square overflow-hidden bg-bg flex items-center justify-center" data-reveal>
            <div className="absolute inset-0 transition-colors duration-700" style={{ backgroundColor: colors[selColor].hex, opacity: 0.15 }} />
            <img src={car.image} alt={car.name} className="relative z-10 w-[85%] h-[85%] object-contain" />
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="py-20 md:py-32 px-6 md:px-10" id="enquire">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div data-reveal>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">Enquire</span>
            <h2 className="font-heading text-heading-1 font-semibold text-primary mb-4">Begin Your Journey</h2>
            <p className="text-sm font-light text-primary/50 leading-relaxed max-w-md mb-8">
              A personal advisor will guide you through every detail of the {car.name}. From specification to delivery, we are with you every step.
            </p>
            <div className="flex gap-4">
              <span className="text-sm font-semibold text-primary">{car.price}</span>
              <span className="w-px h-5 bg-primary/10" />
              <span className="text-sm text-primary/40">Available to order</span>
            </div>
          </div>
          <div data-reveal>
            {formSent ? (
              <div className="bg-surface p-10 text-center">
                <h3 className="font-heading text-xl font-semibold text-primary mb-2">Thank You</h3>
                <p className="text-sm text-primary/50">A personal advisor will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setFormSent(true) }} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" required className="bg-surface px-5 py-3.5 text-sm text-primary placeholder:text-primary/30 outline-none focus:ring-1 focus:ring-accent transition-all" />
                  <input type="text" placeholder="Last Name" required className="bg-surface px-5 py-3.5 text-sm text-primary placeholder:text-primary/30 outline-none focus:ring-1 focus:ring-accent transition-all" />
                </div>
                <input type="email" placeholder="Email Address" required className="bg-surface px-5 py-3.5 text-sm text-primary placeholder:text-primary/30 outline-none focus:ring-1 focus:ring-accent transition-all" />
                <input type="tel" placeholder="Phone Number" className="bg-surface px-5 py-3.5 text-sm text-primary placeholder:text-primary/30 outline-none focus:ring-1 focus:ring-accent transition-all" />
                <select className="bg-surface px-5 py-3.5 text-sm text-primary/50 outline-none focus:ring-1 focus:ring-accent transition-all appearance-none">
                  <option>Interest: Purchase</option>
                  <option>Interest: Test Drive</option>
                  <option>Interest: Bespoke Commission</option>
                  <option>Interest: General Enquiry</option>
                </select>
                <textarea placeholder="Message (optional)" rows={4} className="bg-surface px-5 py-3.5 text-sm text-primary placeholder:text-primary/30 outline-none focus:ring-1 focus:ring-accent transition-all resize-none" />
                <button type="submit" className="bg-primary text-light px-8 py-4 text-xs font-semibold tracking-[0.12em] uppercase hover:bg-dark transition-colors duration-400">
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
