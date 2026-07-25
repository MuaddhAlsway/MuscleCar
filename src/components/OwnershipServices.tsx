const services = [
  {
    number: '01',
    title: 'Premium Financing',
    text: 'Tailored financial solutions with competitive rates and flexible terms. Your acquisition, your way.',
    video: '/videos/hero.mp4',
  },
  {
    number: '02',
    title: 'Concierge Delivery',
    text: 'Hand-delivered by specialist to your doorstep. Anywhere in the world. A ceremony, not a transaction.',
    video: '/videos/hero2.mp4',
  },
  {
    number: '03',
    title: 'Maintenance Programme',
    text: 'Comprehensive care by factory-trained technicians. Scheduled maintenance included for the first five years.',
    video: '/videos/video3.mp4',
  },
  {
    number: '04',
    title: 'Private Advisor',
    text: 'A dedicated specialist available around the clock. Anticipating your needs before you articulate them.',
    video: '/videos/hero.mp4',
  },
  {
    number: '05',
    title: 'Roadside Assistance',
    text: '24/7 global roadside support. From mechanical assistance to emergency arrangements. Always a call away.',
    video: '/videos/hero2.mp4',
  },
  {
    number: '06',
    title: 'VIP Support',
    text: 'Priority access to exclusive events, private track days, and limited-edition unveilings across the globe.',
    video: '/videos/video3.mp4',
  },
]

export default function OwnershipServices() {
  return (
    <section id="ownership" className="bg-surface py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-24 max-w-xl">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block" data-reveal>Ownership</span>
          <h2 className="font-heading text-heading-1 font-semibold text-primary mb-4" data-reveal>
            Beyond the Drive
          </h2>
          <p className="text-sm font-light text-primary/45 leading-relaxed" data-reveal>
            Ownership extends far beyond the vehicle itself. Every touchpoint is crafted to match the standard of your Meridian.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10">
          {services.map((s) => (
            <div
              key={s.number}
              className="relative bg-surface overflow-hidden group hover:bg-bg transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(26,42,58,0.12)] hover:z-10"
              data-reveal
              onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video')
                if (video) { video.play() }
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video')
                if (video) { video.pause(); video.currentTime = 0 }
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <video
                  src={s.video}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark/80" />
              </div>
              <div className="relative z-10 p-8 md:p-10">
                <span className="text-4xl md:text-5xl font-heading font-bold text-accent/20 group-hover:text-accent/50 transition-colors duration-500 block mb-6">
                  {s.number}
                </span>
                <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-light transition-colors duration-500 mb-3">{s.title}</h3>
                <p className="text-sm font-light text-primary/45 group-hover:text-light/60 leading-relaxed transition-colors duration-500">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
