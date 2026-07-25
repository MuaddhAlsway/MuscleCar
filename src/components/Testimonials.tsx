import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const testimonials = [
  {
    quote: 'The Meridian GT redefined what I thought was possible in a grand tourer. It is the rare machine that makes you fall in love with driving all over again.',
    name: 'James Whitfield',
    role: 'Editor, Grand Touring Magazine',
    rating: 5,
    video: '/videos/hero.mp4',
  },
  {
    quote: 'In thirty years of automotive journalism, nothing has made me reconsider what a car can be quite like the Meridian Volante. Perfection, distilled.',
    name: 'Helena Voss',
    role: 'Chief Editor, Luxe Auto Review',
    rating: 5,
    video: '/videos/hero2.mp4',
  },
  {
    quote: 'The attention to detail is staggering. From the hand-stitched leather to the way the chassis communicates with you through every corner. Extraordinary.',
    name: 'Marcus Chen',
    role: 'Performance Director, Autocraft',
    rating: 5,
    video: '/videos/video3.mp4',
  },
  {
    quote: 'I have driven every hypercar on the market. The Meridian Essence is the first that made me question whether I ever want to drive anything else.',
    name: 'Sophia Laurent',
    role: 'CEO, Laurent Motorsports',
    rating: 5,
    video: '/videos/hero.mp4',
  },
  {
    quote: 'From the moment you press the starter to the moment you reluctantly turn it off, every second is pure automotive theatre.',
    name: 'David Ashworth',
    role: 'Collector & Private Client',
    rating: 5,
    video: '/videos/hero2.mp4',
  },
  {
    quote: 'The Meridian Pursuit is proof that you do not need to sacrifice daily usability for extraordinary performance. A masterpiece of balance.',
    name: 'Lena Müller',
    role: 'Test Driver, Performance Weekly',
    rating: 5,
    video: '/videos/video3.mp4',
  },
]

const doubled = [...testimonials, ...testimonials]

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleEnter = () => {
    const content = contentRef.current
    const video = videoRef.current
    if (!content || !video) return
    video.play()
    gsap.to(content, { xPercent: -100, duration: 0.6, ease: 'power3.inOut' })
  }

  const handleLeave = () => {
    const content = contentRef.current
    const video = videoRef.current
    if (!content || !video) return
    gsap.to(content, { xPercent: 0, duration: 0.6, ease: 'power3.inOut' })
    video.pause()
    video.currentTime = 0
  }

  return (
    <div
      className="flex-shrink-0 w-[380px] md:w-[440px] relative mx-3 overflow-hidden"
      style={{ height: '280px' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <video
        ref={videoRef}
        src={t.video}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div ref={cardRef} className="absolute inset-0">
        <div
          ref={contentRef}
          className="absolute inset-0 bg-surface p-8 md:p-10 flex flex-col"
        >
          <div className="flex gap-1 mb-6">
            {Array.from({ length: t.rating }).map((_, j) => (
              <span key={j} className="text-accent text-sm">★</span>
            ))}
          </div>
          <blockquote className="font-heading text-base md:text-lg font-medium text-primary leading-relaxed mb-8 flex-1">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="border-t border-primary/10 pt-6">
            <span className="text-sm font-semibold text-primary block">{t.name}</span>
            <span className="text-xs font-light text-primary/40">{t.role}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })

    return () => { tween.kill() }
  }, [])

  return (
    <section className="bg-bg py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block" data-reveal>Testimonials</span>
        <h2 className="font-heading text-heading-1 font-semibold text-primary" data-reveal>
          What They Say
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div ref={trackRef} className="flex" style={{ width: 'max-content' }}>
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
