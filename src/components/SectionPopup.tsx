import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface SectionPopupProps {
  triggerId: string
  title: string
  subtitle: string
}

export default function SectionPopup({ triggerId, title, subtitle }: SectionPopupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const shownRef = useRef(false)

  useEffect(() => {
    const el = document.getElementById(triggerId)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const inViewOnLoad = rect.top < window.innerHeight && rect.bottom > 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shownRef.current && !inViewOnLoad) {
          shownRef.current = true
          setVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [triggerId])

  useEffect(() => {
    if (!visible || !ref.current) return

    const el = ref.current
    gsap.set(el, { opacity: 0, y: 30, scale: 0.95 })
    gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' })

    const timer = setTimeout(() => {
      gsap.to(el, {
        opacity: 0, y: -20, scale: 0.95, duration: 0.4, ease: 'power2.in',
        onComplete: () => setVisible(false),
      })
    }, 10000)

    return () => clearTimeout(timer)
  }, [visible])

  const handleClose = () => {
    if (!ref.current) return
    gsap.to(ref.current, {
      opacity: 0, y: -20, scale: 0.95, duration: 0.3, ease: 'power2.in',
      onComplete: () => setVisible(false),
    })
  }

  if (!visible) return null

  return (
    <div
      ref={ref}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] w-[90vw] max-w-md pointer-events-auto"
    >
      <div className="bg-dark/95 backdrop-blur-xl border border-accent/20 rounded-sm p-6 md:p-8 shadow-2xl shadow-black/30">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-accent mb-2 block">Exclusive Experience</span>
            <h3 className="font-heading text-lg md:text-xl font-semibold text-light leading-tight">{title}</h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-light/40 hover:text-light transition-colors flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>
        <p className="text-xs font-light text-light/40 leading-relaxed">{subtitle}</p>
        <div className="mt-4 h-0.5 bg-light/10 rounded-full overflow-hidden">
          <div className="popup-timer h-full bg-accent/60 rounded-full" />
        </div>
      </div>
    </div>
  )
}
