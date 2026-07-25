import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.set('.pre-text', { opacity: 0, y: 20 })
      .set('.pre-bar-fill', { width: '0%' })
      .set('.pre-percent', { opacity: 0 })
      .to('.pre-text', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2)
      .to('.pre-percent', { opacity: 1, duration: 0.4 }, 0.3)
      .to('.pre-bar-fill', {
        width: '100%',
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate() {
          const p = Math.round(this.progress() * 100)
          document.querySelector('.pre-percent-num')!.textContent = String(p).padStart(3, '0')
        },
      }, 0.3)
      .to('.pre-text', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, '+=0.3')
      .to('.pre-bar', { opacity: 0, duration: 0.3 }, '-=0.2')
      .to('.pre-percent', { opacity: 0, duration: 0.3 }, '-=0.2')
      .to(ref.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => { if (ref.current) ref.current.style.display = 'none' },
      })
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <span className="pre-text font-heading text-6xl md:text-8xl font-bold text-light tracking-tight mb-12">
        Meridian
      </span>

      <div className="pre-bar w-56 h-[2px] bg-white/10 overflow-hidden mb-4">
        <div className="pre-bar-fill h-full bg-accent origin-left" />
      </div>

      <div className="pre-percent flex items-center gap-3">
        <span className="pre-percent-num font-heading text-xs tracking-[0.3em] text-light/40">000</span>
        <span className="text-[10px] tracking-[0.2em] text-light/20">%</span>
      </div>
    </div>
  )
}
