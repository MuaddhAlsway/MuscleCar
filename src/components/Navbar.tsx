import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Collection', href: '#vehicles' },
  { label: 'Models', href: '#flagship' },
  { label: 'Services', href: '#ownership' },
  { label: 'About', href: '#performance' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ detail }: { detail?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNav = (href: string) => {
    setOpen(false)
    if (detail) {
      navigate('/')
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[200] py-5 transition-all duration-500 ${scrolled ? 'bg-dark/95 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-light">
            Meridian
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <button key={l.label} onClick={() => handleNav(l.href)} className="text-xs font-medium tracking-[0.12em] uppercase text-light/60 transition-colors duration-300 hover:text-light">
                {l.label}
              </button>
            ))}
            <button onClick={() => handleNav('#contact')} className="text-xs font-medium tracking-[0.12em] uppercase px-5 py-2.5 border border-light/20 text-light transition-all duration-400 hover:bg-light/10">
              Book Test Drive
            </button>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden flex items-center justify-center w-10 h-10 z-[200]" aria-label="Menu">
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-light">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <span className="flex flex-col gap-[5px]">
                <span className="block w-6 h-[1.5px] bg-light" />
                <span className="block w-6 h-[1.5px] bg-light" />
                <span className="block w-6 h-[1.5px] bg-light" />
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[150] bg-dark flex items-center justify-center transition-opacity duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-8">
          {links.map(l => (
            <button key={l.label} onClick={() => handleNav(l.href)} className="font-heading text-3xl md:text-5xl font-light text-light hover:text-accent transition-colors">
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
