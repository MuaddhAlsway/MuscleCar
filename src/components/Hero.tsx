import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const slides = [
  {
    video: '/videos/hero.mp4',
    tag: 'Est. 2024',
    title: ['Experience', 'Automotive', 'Excellence'],
    sub: 'Crafted for drivers who demand performance, luxury, and innovation.',
    cta: { label: 'Explore Collection', href: '#vehicles' },
  },
  {
    video: '/videos/hero2.mp4',
    tag: 'Now Available',
    title: ['Redefine', 'Your', 'Journey'],
    sub: 'Where cutting-edge technology meets timeless design. The future of driving starts here.',
    cta: { label: 'Book Test Drive', href: '#contact' },
  },
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [current, setCurrent] = useState(0)
  const [textRevealed, setTextRevealed] = useState(false)

  const animateText = useCallback(() => {
    if (textRevealed) return
    setTextRevealed(true)
    gsap.to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    gsap.fromTo('.hero-title-word', { yPercent: 110 }, {
      yPercent: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
    })
    gsap.to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' })
    gsap.to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' })
  }, [textRevealed])

  const crossfade = useCallback((index: number) => {
    if (index === current) return
    const v = videoRef.current
    if (!v) return

    gsap.to('.hero-video', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrent(index)
        v.src = slides[index].video
        v.load()
        v.play().catch(() => {})
        gsap.to('.hero-video', { opacity: 1, duration: 0.6, ease: 'power2.out' })
      },
    })

    // reset text
    setTextRevealed(false)
    gsap.set('.hero-tag', { opacity: 0, y: 16 })
    gsap.set('.hero-title-word', { yPercent: 110 })
    gsap.set('.hero-sub', { opacity: 0, y: 16 })
    gsap.set('.hero-ctas', { opacity: 0, y: 16 })

    // reveal new text after crossfade
    setTimeout(() => {
      setTextRevealed(true)
      gsap.to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      gsap.fromTo('.hero-title-word', { yPercent: 110 }, {
        yPercent: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
      })
      gsap.to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' })
      gsap.to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' })
    }, 500)
  }, [current])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {})

    const handleEnded = () => {
      const next = (current + 1) % slides.length
      crossfade(next)
    }

    v.addEventListener('ended', handleEnded)
    return () => v.removeEventListener('ended', handleEnded)
  }, [current, crossfade])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-video', {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
      })
    })
    return () => ctx.revert()
  }, [])

  const slide = slides[current]

  return (
    <section className="hero relative w-full h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop={false}
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85"
          className="hero-video w-full h-full object-cover scale-100 origin-center"
        >
          <source src={slide.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="absolute inset-0 z-[1] flex flex-col justify-end pb-16 md:pb-24">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="hero-tag flex items-center gap-4 mb-8 opacity-0 translate-y-4">
            <span className="w-10 h-px bg-accent" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-light/50">{slide.tag}</span>
          </div>

          <h1 className="mb-8 md:mb-12">
            {slide.title.map((word) => (
              <span key={word} className="block overflow-hidden">
                <span className="hero-title-word block font-heading text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.03em] font-bold text-light translate-y-[110%]">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub font-body text-sm md:text-base font-light text-light/45 max-w-md mb-10 opacity-0 translate-y-4">
            {slide.sub}
          </p>

          <div className="hero-ctas flex flex-wrap items-center gap-4 opacity-0 translate-y-4">
            <a href={slide.cta.href} className="inline-flex items-center gap-3 px-8 py-3.5 bg-dark text-light text-xs font-semibold tracking-[0.15em] uppercase hover:bg-primary transition-colors duration-400">
              {slide.cta.label}
            </a>
            <a href="#contact" className="inline-flex items-center gap-3 px-8 py-3.5 border border-light/25 text-light text-xs font-medium tracking-[0.15em] uppercase hover:bg-light/10 transition-all duration-400">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Dots only */}
      <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-[2] flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => crossfade(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-400 ${i === current ? 'bg-accent scale-125' : 'bg-light/30 hover:bg-light/60'}`}
            aria-label={`Video ${i + 1}`}
          />
        ))}
      </div>

      <div className="hidden md:flex absolute bottom-8 right-10 z-[2] flex-col items-center gap-3">
        <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-light/30 [writing-mode:vertical-rl]">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </div>
    </section>
  )
}
