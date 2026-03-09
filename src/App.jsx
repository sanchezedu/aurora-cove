import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll animations hook
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeUp')
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}, [])

// Sample data
const suites = [
  {
    id: 1,
    name: "Ocean Haven",
    price: "$450",
    description: "King bed, terraza infinity, jacuzzi privado",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
  },
  {
    id: 2,
    name: "Garden Sanctuary",
    price: "$380",
    description: "Jardín tropical privado, ducha al aire libre",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
  },
  {
    id: 3,
    name: "Presidential Horizon",
    price: "$850",
    description: "Suite completa, piscina privada, mayordomo",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
  },
  {
    id: 4,
    name: "Sunset Penthouse",
    price: "$720",
    description: "Vista 270°, terraza privada, minibar premium",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"
  }
]

const amenities = [
  {
    id: 1,
    title: "Spa & Bienestar",
    description: "Tratamientos ancestrales reinventados para el alma moderna",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80"
  },
  {
    id: 2,
    title: "Alta Gastronomía",
    description: "Sabores del océano fusionados con tradición local",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
  },
  {
    id: 3,
    title: "Piscina Infinita",
    description: "Donde el agua besa el horizonte sin límites",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80"
  },
  {
    id: 4,
    title: "Yoga & Meditación",
    description: "Encuentro con tu ser en el sunrise",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80"
  }
]

const reviews = [
  {
    id: 1,
    text: "No es solo un hotel. Es una experiencia que transformó nuestra manera de viajar. Volveremos, sin dudas.",
    author: "María & Carlos",
    location: "Ciudad de México"
  },
  {
    id: 2,
    text: "El lugar donde olvidé que existía el tiempo. Silence, luxury, perfection.",
    author: "James T.",
    location: "Londres"
  },
  {
    id: 3,
    text: "Cada detalle pensado. El spa es celestial. La gastronomía, un viaje.",
    author: "Sofia R.",
    location: "Buenos Aires"
  }
]

const galleryImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80"
]

const bentoImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeAmenity, setActiveAmenity] = useState(0)
  const [currentReview, setCurrentReview] = useState(0)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2
  })

  // Handle scroll for sticky booking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Handle booking form
  const handleBooking = (e) => {
    e.preventDefault()
    alert('¡Reserva enviada! Te contactaremos pronto.')
  }

  return (
    <div className="bg-stone-900 text-white min-h-screen">
      {/* Floating CTA Button */}
      <a 
        href="#reservar"
        className="fixed bottom-8 right-8 z-50 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Reservar Tu Estancia
      </a>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'glass bg-black/80 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-2xl font-display tracking-widest text-amber-400">
            AURORA COVE
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#experiencia" className="text-white/80 hover:text-amber-400 transition-colors text-sm tracking-wider">Experiencia</a>
            <a href="#suites" className="text-white/80 hover:text-amber-400 transition-colors text-sm tracking-wider">Suites</a>
            <a href="#amenidades" className="text-white/80 hover:text-amber-400 transition-colors text-sm tracking-wider">Amenidades</a>
            <a href="#galeria" className="text-white/80 hover:text-amber-400 transition-colors text-sm tracking-wider">Galería</a>
            <a href="#reservar" className="border border-amber-400 text-amber-400 px-6 py-2 hover:bg-amber-400 hover:text-black transition-all text-sm tracking-wider">
              Reservar
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background with slow zoom */}
        <div className="absolute inset-0 animate-slowZoom">
          <img 
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80"
            alt="Aurora Cove"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-amber-400 tracking-[0.3em] text-sm mb-6 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
            REFUgIO DE LUJO
          </h2>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mb-6 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
            AURORA COVE
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl animate-fadeUp" style={{ animationDelay: '0.6s' }}>
            Donde el tiempo se detiene y tus sentidos despiertan
          </p>
          <p className="text-white/70 mt-4 animate-fadeUp" style={{ animationDelay: '0.8s' }}>
            22 suites exclusivas • Un océano de tranquilidad
          </p>
        </div>

        {/* Booking Engine - Glassmorphism */}
        <div className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-500 ${scrolled ? 'fixed top-24 left-0 right-0 mx-auto max-w-4xl glass bg-black/90 rounded-2xl p-6' : 'relative p-8'}`}>
          <form onSubmit={handleBooking} className="flex flex-wrap gap-4 justify-center items-end">
            <div className="flex flex-col">
              <label className="text-xs text-white/60 tracking-wider mb-2">CHECK-IN</label>
              <input 
                type="date" 
                value={bookingData.checkIn}
                onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-amber-400 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-white/60 tracking-wider mb-2">CHECK-OUT</label>
              <input 
                type="date" 
                value={bookingData.checkOut}
                onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-amber-400 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-white/60 tracking-wider mb-2">HUÉSPEDES</label>
              <select 
                value={bookingData.guests}
                onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-amber-400 outline-none"
              >
                <option value={1}>1 Huésped</option>
                <option value={2}>2 Huéspedes</option>
                <option value={3}>3 Huéspedes</option>
                <option value={4}>4 Huéspedes</option>
              </select>
            </div>
            <button 
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
            >
              Ver Disponibilidad
            </button>
          </form>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* La Experiencia - Bento Grid */}
      <section id="experiencia" className="py-32 px-6 bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-amber-400 tracking-[0.3em] text-sm mb-4">LA EXPERIENCIA</h2>
            <h3 className="font-display text-5xl md:text-6xl mb-6">Más que un hotel, un santuario</h3>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Donde cada amanecer es una promesa y cada atardecer, un recuerdo.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[600px]">
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl">
              <img src={bentoImages[0]} alt="Experience" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-2xl font-display">Piscina Infinita</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img src={bentoImages[1]} alt="Gastronomy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-lg font-display">Gastronomía</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img src={bentoImages[2]} alt="Suite" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-lg font-display">Suites</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img src={bentoImages[3]} alt="Spa" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-lg font-display">Spa</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img src={bentoImages[4]} alt="Beach" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-lg font-display">Playa Privada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suites - Horizontal Scroll */}
      <section id="suites" className="py-32 bg-stone-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-amber-400 tracking-[0.3em] text-sm mb-4">NUESTRAS SUITES</h2>
          <h3 className="font-display text-5xl md:text-6xl">Diseñadas para soñar</h3>
        </div>

        {/* Horizontal scroll container */}
        <div className="flex gap-8 px-6 overflow-x-auto hide-scrollbar pb-8">
          {suites.map((suite) => (
            <div 
              key={suite.id}
              className="flex-shrink-0 w-[400px] group relative overflow-hidden rounded-2xl"
            >
              <img 
                src={suite.image} 
                alt={suite.name}
                className="w-full h-[500px] object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Content on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <h4 className="font-display text-3xl text-white mb-2">{suite.name}</h4>
                <p className="text-white/80 mb-4">{suite.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-amber-400 font-semibold">Desde {suite.price}/noche</span>
                  <button className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-full font-semibold transition-all hover:scale-105">
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenidades Interactivas */}
      <section id="amenidades" className="py-32 relative overflow-hidden">
        {/* Background image that changes */}
        <div className="absolute inset-0 transition-all duration-700">
          <img 
            src={amenities[activeAmenity].image}
            alt={amenities[activeAmenity].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-amber-400 tracking-[0.3em] text-sm mb-4">AMENIDADES</h2>
            <h3 className="font-display text-5xl md:text-6xl mb-6">Tu experiencia, tu elección</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {amenities.map((amenity, index) => (
              <div 
                key={amenity.id}
                onMouseEnter={() => setActiveAmenity(index)}
                className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 ${activeAmenity === index ? 'bg-amber-500/20 border-amber-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <h4 className="font-display text-2xl mb-2">{amenity.title}</h4>
                <p className="text-white/60 text-sm">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería - Parallax */}
      <section id="galeria" className="py-32 bg-stone-900 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-amber-400 tracking-[0.3em] text-sm mb-4">GALERÍA</h2>
          <h3 className="font-display text-5xl md:text-6xl">Vive cada momento</h3>
        </div>

        {/* Infinite scroll gallery */}
        <div className="relative">
          <div className="flex gap-4 animate-[scroll_30s_linear_infinite]">
            {[...galleryImages, ...galleryImages].map((img, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] h-[400px] overflow-hidden rounded-2xl">
                <img 
                  src={img} 
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prueba Social - Reviews */}
      <section className="py-32 bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-amber-400 tracking-[0.3em] text-sm mb-12">TESTIMONIOS</h2>
          
          <div className="relative h-[300px]">
            {reviews.map((review, index) => (
              <div 
                key={review.id}
                className={`absolute inset-0 transition-all duration-700 ${index === currentReview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
                  "{review.text}"
                </blockquote>
                <p className="mt-8 text-amber-400 text-lg">
                  — {review.author}, {review.location}
                </p>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentReview(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentReview ? 'bg-amber-400 w-8' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer + CTA */}
      <section id="reservar" className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-6xl mb-6">Tu lugar en el mundo te espera</h2>
          <p className="text-white/60 text-xl mb-12">Reserva ahora y vive la magia de Aurora Cove</p>
          
          <form onSubmit={handleBooking} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-16">
            <input 
              type="email" 
              placeholder="Tu correo electrónico"
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:border-amber-400 outline-none"
            />
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 rounded-full transition-all hover:scale-105">
              Reservar Ahora
            </button>
          </form>

          {/* Footer links */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-display text-amber-400">AURORA COVE</div>
            <div className="flex gap-8 text-white/40 text-sm">
              <a href="#" className="hover:text-amber-400 transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Términos</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Contacto</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          
          <p className="text-white/20 text-sm mt-8">© 2026 Aurora Cove. Todos los derechos reservados.</p>
        </div>
      </section>
    </div>
  )
}

export default App
