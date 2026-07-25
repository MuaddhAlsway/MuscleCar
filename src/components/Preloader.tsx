import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.to('.p-text', { opacity: 1, duration: 0.6, delay: 0.2 })
      .to('.p-line', { scaleX: 1, duration: 1.4, ease: 'power3.inOut' }, '-=0.2')
      .to('.p-inner', { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '+=0.2')
      .to(ref.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' })
      .set(ref.current, { display: 'none' })
  }, [])

  return (
    <div ref={ref} className="fixed inset-z-[9999] bg-dark flex items-center justify-center">
      <div className="p-inner flex flex-col items-center gap-6">
        <span className="p-text font-heading text-4xl md:text-5xl font-light text-light tracking-widest opacity-0">
          Meridian
        </span>
        <div className="w-28 h-px bg-white/10 overflow-hidden">
          <div className="p-line w-full h-full bg-accent origin-left scale-x-0" />
        </div>
      </div>
    </div>
  )
}
