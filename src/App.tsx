import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedVehicles from './components/FeaturedVehicles'
import FlagshipVehicle from './components/FlagshipVehicle'
import OwnershipServices from './components/OwnershipServices'
import Performance from './components/Performance'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import CarDetail from './pages/CarDetail'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) {
  const { pathname } = useLocation()
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
    ScrollTrigger.getAll().forEach(t => t.kill())
  }, [pathname, lenisRef])
  return null
}

function HomePage() {
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
  }, [])

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <FeaturedVehicles />
        <FlagshipVehicle />
        <OwnershipServices />
        <Performance />
        <Testimonials />
        <Gallery />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => { lenis.destroy() }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop lenisRef={lenisRef} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
