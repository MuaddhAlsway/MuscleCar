import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function FinalCTA() {
  useEffect(() => {
    gsap.to('.cta-video', {
      scale: 1.1,
      ease: 'none',
      scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: 2 },
    })
  }, [])

  return (
    <section id="contact" className="cta-section relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          src="/videos/hero2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="cta-video w-full h-full object-cover scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/60 to-dark/40" />
      </div>

      <div className="relative z-10 text-center px-6 py-24 max-w-3xl mx-auto">
        <h2 className="font-heading text-display font-bold text-light mb-6" data-reveal>
          Ready To Experience<br />The Extraordinary?
        </h2>
        <p className="text-sm md:text-base font-light text-light/45 max-w-md mx-auto mb-10 leading-relaxed" data-reveal>
          Schedule a private consultation or speak with a personal advisor. Your journey begins with a single step.
        </p>
        <div className="flex flex-wrap justify-center gap-4" data-reveal>
          <a href="#" className="inline-flex items-center px-8 py-4 bg-dark text-light text-xs font-semibold tracking-[0.15em] uppercase hover:bg-primary transition-colors duration-400">
            Schedule Test Drive
          </a>
          <a href="#" className="inline-flex items-center px-8 py-4 border border-light/25 text-light text-xs font-medium tracking-[0.15em] uppercase hover:bg-light/10 transition-all duration-400">
            Contact Advisor
          </a>
        </div>
      </div>
    </section>
  )
}
