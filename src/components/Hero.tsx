import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const slides = [
  {
    video: '/videos/hero2.mp4',
    image: '/chargerboost.jpg',
    tag: 'Now Available',
    title: ['Redefine', 'Your', 'Journey'],
    sub: 'Where cutting-edge technology meets timeless design. The future of driving starts here.',
    cta: { label: 'Book Test Drive', href: '#contact' },
  },
  {
    video: '/videos/hero2.mp4',
    image: '/bmw.jpg',
    tag: 'Est. 2024',
    title: ['Experience', 'Automotive', 'Excellence'],
    sub: 'Crafted for drivers who demand performance, luxury, and innovation.',
    cta: { label: 'Explore Collection', href: '#vehicles' },
  },
]

const MOBILE_BREAKPOINT = 768

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

export default function Hero() {
  const topVideoRef = useRef<HTMLVideoElement>(null)
  const bottomVideoRef = useRef<HTMLVideoElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const [topIndex, setTopIndex] = useState(0)
  const [bottomIndex, setBottomIndex] = useState(1)
  const [transitioning, setTransitioning] = useState(false)
  const coverHidden = useRef(false)
  const isMobile = useIsMobile()

  const revealText = useCallback(() => {
    gsap.to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    gsap.fromTo('.hero-title-word', { yPercent: 110 }, {
      yPercent: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
    })
    gsap.to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' })
    gsap.to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' })
  }, [])

  const hideText = useCallback(() => {
    gsap.set('.hero-tag', { opacity: 0, y: 16 })
    gsap.set('.hero-title-word', { yPercent: 110 })
    gsap.set('.hero-sub', { opacity: 0, y: 16 })
    gsap.set('.hero-ctas', { opacity: 0, y: 16 })
  }, [])

  const hideCover = useCallback(() => {
    if (coverHidden.current || !coverRef.current) return
    coverHidden.current = true
    gsap.to(coverRef.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' })
  }, [])

  const splitTransition = useCallback((targetIndex: number) => {
    if (transitioning || targetIndex === topIndex) return
    setTransitioning(true)

    const topHalf = document.querySelector('.hero-split-top') as HTMLElement
    const bottomHalf = document.querySelector('.hero-split-bottom') as HTMLElement
    const bottomVid = bottomVideoRef.current
    if (!topHalf || !bottomHalf) return

    hideText()

    if (bottomVid) {
      bottomVid.currentTime = 0
      bottomVid.play().catch(() => {})
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setTopIndex(targetIndex)
        setBottomIndex(topIndex)
        setTransitioning(false)

        gsap.set(topHalf, { clipPath: 'inset(0 0 0 0)' })
        gsap.set(bottomHalf, { clipPath: 'inset(0 0 0 0)' })

        const newTop = document.querySelector('.hero-split-top video') as HTMLVideoElement
        if (newTop) { newTop.play().catch(() => {}) }

        setTimeout(revealText, 300)
      },
    })

    tl.to(topHalf, { clipPath: 'inset(0 50% 0 50%)', duration: 0.9, ease: 'power4.inOut' })
      .to(bottomHalf, { clipPath: 'inset(0 50% 0 50%)', duration: 0.9, ease: 'power4.inOut' }, '<0.15')
  }, [transitioning, topIndex, hideText, revealText])

  useEffect(() => {
    if (isMobile) return

    const topVid = topVideoRef.current
    if (!topVid) return

    const tryPlay = () => {
      topVid.play().then(() => {
        hideCover()
      }).catch(() => {
        const forcePlay = () => {
          topVid.play().then(() => hideCover()).catch(() => {})
          document.removeEventListener('touchstart', forcePlay)
        }
        document.addEventListener('touchstart', forcePlay, { once: true })
      })
    }

    if (topVid.readyState >= 3) {
      tryPlay()
    } else {
      topVid.addEventListener('canplaythrough', tryPlay, { once: true })
    }

    const handleEnded = () => {
      const next = (topIndex + 1) % slides.length
      splitTransition(next)
    }

    topVid.addEventListener('ended', handleEnded)
    return () => {
      topVid.removeEventListener('ended', handleEnded)
      topVid.removeEventListener('canplaythrough', tryPlay)
    }
  }, [topIndex, splitTransition, hideCover, isMobile])

  useEffect(() => {
    hideText()
    setTimeout(revealText, 2800)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-video-layer, .hero-cover-img', {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
      })
    })
    return () => ctx.revert()
  }, [])

  const slide = slides[topIndex]

  return (
    <section className="hero relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Bottom video (revealed behind) — desktop only */}
      {!isMobile && (
        <div className="hero-split-bottom absolute inset-0 z-0" style={{ clipPath: 'inset(0 0 0 0)' }}>
          <video
            ref={bottomVideoRef}
            src={slides[bottomIndex].video}
            muted
            loop={false}
            playsInline
            preload="auto"
            className="hero-video-layer w-full h-full object-cover"
          />
        </div>
      )}

      {/* Top video (splits from center) — desktop only */}
      {!isMobile && (
        <div className="hero-split-top absolute inset-0 z-[1]" style={{ clipPath: 'inset(0 0 0 0)' }}>
          <video
            ref={topVideoRef}
            src={slides[topIndex].video}
            autoPlay
            muted
            loop={false}
            playsInline
            preload="auto"
            className="hero-video-layer w-full h-full object-cover"
          />
        </div>
      )}

      {/* Cover image — always on mobile, hides once video plays on desktop */}
      <div
        ref={coverRef}
        className={`absolute inset-0 z-[2] bg-dark ${isMobile ? '' : ''}`}
      >
        {isMobile ? (
          <img
            src={slide.image}
            alt=""
            className="hero-cover-img w-full h-full object-cover"
          />
        ) : (
          <img
            src={slides[0].image}
            alt=""
            className="hero-cover-img w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-0 z-[4] flex flex-col justify-end pb-16 md:pb-24">
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

      {/* Dots */}
      <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-[5] flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => splitTransition(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-400 ${i === topIndex ? 'bg-accent scale-125' : 'bg-light/30 hover:bg-light/60'}`}
            aria-label={`Video ${i + 1}`}
          />
        ))}
      </div>

      <div className="hidden md:flex absolute bottom-8 right-10 z-[5] flex-col items-center gap-3">
        <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-light/30 [writing-mode:vertical-rl]">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </div>
    </section>
  )
}
