import { Link } from 'react-router-dom'

const vehicles = [
  {
    id: 'gt',
    name: 'Meridian GT',
    power: '640 HP',
    speed: '318 km/h',
    price: 'From £245,000',
    image: '/pugati.jpg',
  },
  {
    id: 'continental',
    name: 'Meridian Continental',
    power: '659 HP',
    speed: '333 km/h',
    price: 'From £295,000',
    image: '/bmw.jpg',
  },
  {
    id: 'volante',
    name: 'Meridian Volante',
    power: '770 HP',
    speed: '345 km/h',
    price: 'From £340,000',
    image: '/lambo.jpg',
  },
  {
    id: 'spyder',
    name: 'Meridian Spyder',
    power: '710 HP',
    speed: '330 km/h',
    price: 'From £310,000',
    image: '/mustang5thshelby.jpg',
  },
  {
    id: 'pursuit',
    name: 'Meridian Pursuit',
    power: '580 HP',
    speed: '295 km/h',
    price: 'From £195,000',
    image: '/charger.png',
  },
  {
    id: 'essence',
    name: 'Meridian Essence',
    power: '820 HP',
    speed: '360 km/h',
    price: 'From £425,000',
    image: '/dodge98.jpg',
  },
]

export default function FeaturedVehicles() {
  return (
    <section id="vehicles" className="bg-bg py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block" data-reveal>The Collection</span>
            <h2 className="font-heading text-heading-1 font-semibold text-primary" data-reveal>
              Curated for the<br />Extraordinary
            </h2>
          </div>
          <p className="text-sm font-light text-primary/45 max-w-sm mt-6 md:mt-0 md:text-right leading-relaxed" data-reveal>
            Six masterpieces. Each one engineered without compromise. Each one designed to stir the soul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {vehicles.map((v) => (
            <Link key={v.name} to={`/car/${v.id}`} className="group relative bg-dark overflow-hidden cursor-pointer" data-reveal>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover transition-transform duration-800 ease-luxury group-hover:scale-110"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-heading text-lg md:text-xl font-semibold text-light mb-4">{v.name}</h3>
                <div className="flex items-center gap-6 mb-6">
                  <div>
                    <span className="block text-xs font-medium text-accent tracking-wider uppercase mb-0.5">Power</span>
                    <span className="text-sm font-semibold text-light">{v.power}</span>
                  </div>
                  <div className="w-px h-8 bg-light/10" />
                  <div>
                    <span className="block text-xs font-medium text-accent tracking-wider uppercase mb-0.5">Top Speed</span>
                    <span className="text-sm font-semibold text-light">{v.speed}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-light text-light/50">{v.price}</span>
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase text-accent group-hover:translate-x-1 transition-transform duration-400">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
