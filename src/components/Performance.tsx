import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const stats = [
  { value: 770, suffix: '', unit: 'HP', label: 'Horsepower' },
  { value: 2.9, suffix: '', unit: 'SEC', label: '0 - 100 km/h' },
  { value: 345, suffix: '', unit: 'KM/H', label: 'Top Speed' },
  { value: 620, suffix: '', unit: 'KM', label: 'Electric Range' },
]

export default function Performance() {
  const numsRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!numsRef.current) return
    const el = numsRef.current

    const ctx = gsap.context(() => {
      gsap.fromTo('.perf-num', { innerText: 0 }, {
        innerText: 1,
        duration: 1,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: { trigger: el, start: 'top 75%' },
        stagger: 0.15,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const container = videoContainerRef.current
    if (!container) return

    let shrinkTimer: ReturnType<typeof setTimeout>

    const shrink = () => {
      setExpanded(false)
      gsap.to(container, {
        position: '',
        top: '',
        left: '',
        width: '',
        height: '',
        zIndex: '',
        duration: 1.5,
        ease: 'power3.inOut',
        borderRadius: '',
      })
    }

    const expand = () => {
      setExpanded(true)
      gsap.to(container, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        duration: 1.5,
        ease: 'power3.inOut',
        borderRadius: 0,
      })
      shrinkTimer = setTimeout(shrink, 30000)
    }

    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      onEnter: expand,
      once: true,
    })

    return () => {
      clearTimeout(shrinkTimer)
    }
  }, [])

  const handleClose = () => {
    clearTimeout((videoContainerRef.current as any)?._shrinkTimer)
    const container = videoContainerRef.current
    if (!container) return
    setExpanded(false)
    gsap.to(container, {
      position: '',
      top: '',
      left: '',
      width: '',
      height: '',
      zIndex: '',
      duration: 1.5,
      ease: 'power3.inOut',
      borderRadius: '',
    })
  }

  return (
    <section id="performance" className="bg-dark py-24 md:py-36 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block" data-reveal>Performance</span>
          <h2 className="font-heading text-heading-1 font-semibold text-light" data-reveal>
            Numbers That<br />Inspire.
          </h2>
        </div>

        <div ref={numsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-light/10 pt-8" data-reveal>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-heading text-stat font-bold text-light">{s.value}</span>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent">{s.unit}</span>
              </div>
              <span className="text-xs font-light tracking-[0.1em] uppercase text-light/30">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div data-reveal>
            <h3 className="font-heading text-heading-3 font-semibold text-light mb-4">Engineered Without Compromise</h3>
            <p className="text-sm font-light text-light/40 leading-relaxed max-w-md">
              Every component tested to destruction and rebuilt to perfection. Our powerplants are assembled by a single master technician over 120 hours. No shortcuts. No exceptions.
            </p>
          </div>
          <div ref={videoContainerRef} className="aspect-video overflow-hidden" data-reveal>
            <video
              src="/videos/video3.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {expanded && (
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-[10000] w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors rounded-full"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
