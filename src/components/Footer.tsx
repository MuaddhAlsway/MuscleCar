export default function Footer() {
  return (
    <footer className="bg-dark pt-20 pb-8 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <span className="font-heading text-2xl font-semibold text-light tracking-tight block mb-3">Meridian</span>
            <p className="text-xs font-light text-light/30 tracking-[0.08em] uppercase">Automotive Excellence</p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-5">Vehicles</h4>
            <div className="flex flex-col gap-3">
              {['Grand Tourer', 'Continental', 'Volante', 'Spyder', 'Configure'].map(l => (
                <a key={l} href="#" className="text-sm font-light text-light/40 hover:text-light transition-colors duration-300">{l}</a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-5">Company</h4>
            <div className="flex flex-col gap-3">
              {['Heritage', 'Craftsmanship', 'Ateliers', 'Sustainability', 'Careers'].map(l => (
                <a key={l} href="#" className="text-sm font-light text-light/40 hover:text-light transition-colors duration-300">{l}</a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-5">Ownership</h4>
            <div className="flex flex-col gap-3">
              {['Services', 'Maintenance', 'Roadside', 'VIP Programme', 'Contact'].map(l => (
                <a key={l} href="#" className="text-sm font-light text-light/40 hover:text-light transition-colors duration-300">{l}</a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-5">Connect</h4>
            <div className="flex flex-col gap-3">
              {['Instagram', 'YouTube', 'LinkedIn', 'Press', 'Newsletter'].map(l => (
                <a key={l} href="#" className="text-sm font-light text-light/40 hover:text-light transition-colors duration-300">{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-light/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] font-light text-light/20 tracking-[0.05em]">
            © 2024 Meridian Automotives. All rights reserved.
          </span>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(l => (
              <a key={l} href="#" className="text-[11px] font-light text-light/20 hover:text-light/50 transition-colors duration-300">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
