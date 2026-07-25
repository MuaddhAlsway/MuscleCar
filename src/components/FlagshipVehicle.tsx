import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Slide = 'first' | 'second' | 'video'

export default function FlagshipVehicle() {
  const [slide, setSlide] = useState<Slide>('first')
  const firstRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const vidEl = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    gsap.to('.flagship-parallax', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: '.flagship-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    })
  }, [])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const startLoop = () => {
      timers.push(setTimeout(() => setSlide('second'), 10000))
      timers.push(setTimeout(() => setSlide('video'), 25000))
      timers.push(setTimeout(() => setSlide('second'), 40000))
    }

    startLoop()

    const interval = setInterval(() => {
      setSlide('second')
      timers.push(setTimeout(() => setSlide('video'), 15000))
      timers.push(setTimeout(() => setSlide('second'), 30000))
    }, 30000)

    return () => { timers.forEach(clearTimeout); clearInterval(interval) }
  }, [])

  useEffect(() => {
    if (slide === 'video' && vidEl.current) {
      vidEl.current.currentTime = 0
      vidEl.current.play()
    }
  }, [slide])

  return (
    <section id="flagship" className="flagship-section bg-dark overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative h-[60vh] lg:h-auto overflow-hidden">
          <div ref={firstRef} className="absolute inset-0 transition-opacity duration-[1500ms]" style={{ opacity: slide === 'first' ? 1 : 0 }}>
            <img src="/chargerboost.jpg" alt="Meridian Volante" className="flagship-parallax w-full h-[120%] object-cover" />
          </div>
          <div ref={secondRef} className="absolute inset-0 transition-opacity duration-[1500ms]" style={{ opacity: slide === 'second' ? 1 : 0 }}>
            <img src="/mustang5thshelby.jpg" alt="Meridian Volante" className="flagship-parallax w-full h-[120%] object-cover" />
          </div>
          <div ref={videoRef} className="absolute inset-0 transition-opacity duration-[1500ms]" style={{ opacity: slide === 'video' ? 1 : 0 }}>
            <video ref={vidEl} src="/videos/hero.mp4" muted loop playsInline className="flagship-parallax w-full h-[120%] object-cover" />
          </div>
        </div>
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-6" data-reveal>Flagship</span>
          <h2 className="font-heading text-heading-1 font-semibold text-light mb-6" data-reveal>
            Meridian<br />Volante
          </h2>
          <p className="text-sm md:text-base font-light text-light/45 leading-relaxed max-w-md mb-10" data-reveal>
            The pinnacle of our engineering prowess. A hand-built V10, carbon-fibre body, and an interior that redefines what luxury means. This is not a car. It is a statement.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-12 max-w-md" data-reveal>
            {[
              ['Engine', '7.0L V10 Naturally Aspirated'],
              ['Power', '770 HP @ 8,500 rpm'],
              ['0-100 km/h', '2.9 seconds'],
              ['Top Speed', '345 km/h'],
              ['Weight', '1,450 kg'],
              ['Drivetrain', 'Rear-Wheel Drive'],
            ].map(([label, value]) => (
              <div key={label}>
                <span className="block text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-1">{label}</span>
                <span className="text-sm font-medium text-light">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4" data-reveal>
            <a href="#configurator" className="inline-flex items-center px-7 py-3 bg-accent text-dark text-xs font-semibold tracking-[0.12em] uppercase hover:bg-accent-hover transition-colors duration-400">
              Configure Yours
            </a>
            <a href="#contact" className="inline-flex items-center px-7 py-3 border border-light/20 text-light text-xs font-medium tracking-[0.12em] uppercase hover:bg-light/10 transition-all duration-400">
              Book Experience
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
