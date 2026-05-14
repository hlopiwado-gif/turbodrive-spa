'use client'

import { motion } from 'framer-motion'
import { useBooking } from '../context/BookingContext'
import './Services.css'

const services = [
  {
    title: 'Premium Detail',
    description: 'Comprehensive interior & exterior detail',
    price: '₹125',
  },
  {
    title: 'Essentials Membership',
    description: '4 scratch-free maintenance washes a month',
    price: '₹150',
  }
]

export default function Services() {
  const { setIsBookingOpen } = useBooking()

  return (
    <section className="services section-padding" id="services">
      <div className="container">
        <div className="services__header">
          <h2 className="section-title">
            Our Services
          </h2>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="services__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="services__card-image">
                <img src="/car-wash-hero.png" alt={service.title} />
              </div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.description}</p>
              <div className="services__card-price-label" style={{ display: 'none' }}>Starting at</div>
              <div className="services__card-price" style={{ display: 'none' }}>{service.price}</div>
              <button 
                onClick={() => setIsBookingOpen(true)} 
                className="services__card-link"
              >
                LEARN MORE <span>&gt;</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
