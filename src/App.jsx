import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const rooms = [
  { title: 'Suite Vista Mar', desc: 'Balcón privado con vista panorámica.', price: '$180', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400', badge: 'Más Popular' },
  { title: 'Villa Jardín', desc: 'Villa privada con jardín y piscina.', price: '$250', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400' },
  { title: 'Suite Presidencial', desc: 'Jacuzzi y acceso exclusivo a playa.', price: '$400', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', badge: 'Premium' },
]

const features = [
  { icon: 'fa-swimming-pool', title: 'Piscina Infinita', desc: 'Vista al mar sin límites' },
  { icon: 'fa-spa', title: 'Spa & Wellness', desc: 'Tratamientos rejuvenecedores' },
  { icon: 'fa-utensils', title: 'Gastronomía', desc: 'Cocina marina premium' },
  { icon: 'fa-wind', title: 'Yoga & Meditación', desc: 'Sesiones al atardecer' },
]

function App() {
  const heroRef = useRef(null)
  const roomsRef = useRef(null)

  useEffect(() => {
    gsap.fromTo('.hero-content > *', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.3 })
    gsap.fromTo('.hero-image img', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5 })
    gsap.fromTo('.room-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: roomsRef.current, start: 'top 80%' } })
  }, [])

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <header className="fixed top-0 left-0 right-0 bg-[#fafaf9]/97 backdrop-blur-sm z-50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-[#1c1917] no-underline">Aurora Cove</a>
          <nav className="flex items-center gap-6">
            <a href="#habitaciones" className="text-[#1c1917] no-underline font-medium hover:text-[#14b8a6] transition">Habitaciones</a>
            <a href="#reservar" className="bg-[#14b8a6] text-white px-6 py-2 rounded-full font-semibold no-underline hover:bg-[#0d9488] transition">Reservar</a>
          </nav>
        </div>
      </header>

      <section ref={heroRef} className="min-h-screen flex items-center pt-20 bg-gradient-to-b from-[#fafaf9] to-[#f5f5f4]">
        <div className="max-w-7xl mx-auto px-5 flex items-center gap-12">
          <div className="hero-content flex-1">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">Donde el Océano<br /><span className="text-[#14b8a6]">Te Abraza</span></h1>
            <p className="text-lg text-gray-500 mb-8">Una experiencia única de relajación y lujo natural.</p>
            <a href="#reservar" className="inline-block bg-[#14b8a6] text-white px-8 py-3 rounded-full font-semibold no-underline hover:bg-[#0d9488] transition">Reservar</a>
          </div>
          <div className="hero-image flex-1 hidden md:block">
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600" alt="Hotel" className="w-full max-w-lg rounded-2xl" loading="lazy" />
          </div>
        </div>
      </section>

      <section ref={roomsRef} id="habitaciones" className="py-24 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Nuestras Habitaciones</h2>
          <p className="text-gray-500 text-center mb-12">Espacios diseñados para tu comodidad</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room, i) => (
              <div key={i} className="room-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative">
                  <img src={room.img} alt={room.title} className="w-full h-56 object-cover" loading="lazy" />
                  {room.badge && <span className="absolute top-4 left-4 bg-white text-[#14b8a6] px-4 py-1 rounded-full text-xs font-semibold">{room.badge}</span>}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{room.desc}</p>
                  <div className="text-2xl font-bold text-[#14b8a6]">{room.price} <span className="text-sm text-gray-400 font-normal">/ noche</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#134e4a] text-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {features.map((f, i) => (
              <div key={i}>
                <div className="w-16 h-16 mx-auto mb-4 bg-white/15 rounded-full flex items-center justify-center text-2xl text-[#14b8a6]"><i className={`fas fa-${f.icon}`}></i></div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-white/70 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reservar" className="py-20 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] text-white text-center">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Vive la Experiencia</h2>
          <p className="mb-8">Reserva tu escape soñado</p>
          <a href="#" className="inline-block bg-white text-[#14b8a6] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition">Reservar Ahora</a>
        </div>
      </section>

      <footer className="bg-[#1c1917] text-white py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <a href="#" className="text-2xl font-bold no-underline text-white">Aurora Cove</a>
              <p className="text-white/60 text-sm mt-4">Tu santuario junto al mar.</p>
            </div>
            <div><h4 className="font-semibold mb-4">Habitaciones</h4><ul className="space-y-2 text-white/60 text-sm"><li>Suite Vista Mar</li><li>Villa Jardín</li><li>Presidencial</li></ul></div>
            <div><h4 className="font-semibold mb-4">Servicios</h4><ul className="space-y-2 text-white/60 text-sm"><li>Spa</li><li>Restaurante</li></ul></div>
            <div><h4 className="font-semibold mb-4">Contacto</h4><ul className="space-y-2 text-white/60 text-sm"><li><i className="fas fa-map-marker-alt mr-2"></i>Ecuador</li><li><i className="fas fa-phone mr-2"></i>+593 99 999 9999</li></ul></div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-sm">© 2026 Aurora Cove. Todos los derechos reservados.</div>
        </div>
      </footer>

      <a href="https://wa.me/593999999999" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
    </div>
  )
}
export default App
