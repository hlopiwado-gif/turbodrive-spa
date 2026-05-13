'use client'

import { motion } from 'framer-motion'
import { useBooking } from '../context/BookingContext'
import './HowItWorks.css'

const steps = [
  {
    num: '01.',
    title: 'Reservation and Confirmation',
    description: 'Effortlessly schedule your appointment online or send us a text at (000) 000-0000. Confirm your booking with a nominal deposit, and we\'ll promptly send you a confirmation text for your assurance.',
  },
  {
    num: '02.',
    title: 'On-Site Expertise',
    description: 'Our professional team, equipped with all the necessary tools and equipment, arrives at your location. Simply provide access to a power outlet, and we\'ll begin to elevate your vehicle\'s condition.',
  },
  {
    num: '03.',
    title: 'Visual Approval and Payment',
    description: 'Review photos and videos showcasing the completed service. Once you\'re completely satisfied, settle the remaining balance with ease. Experience stress-free vehicle maintenance at its finest.',
  }
]

export default function HowItWorks() {
  const { setIsBookingOpen } = useBooking()

  return (
    <section className="how-it-works section-padding" id="how-it-works">
      <div className="container">
        <h2 className="how-it-works__title">How it Works</h2>
        
        <div className="how-it-works__steps">
          {steps.map((step, index) => (
            <motion.div 
              className="how-it-works__step" 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="how-it-works__image-container">
                <div className="how-it-works__image-box">
                  <img src="/car-wash-hero.png" alt={step.title} />
                </div>
                <div className={`how-it-works__number ${index === 0 ? 'how-it-works__number--active' : ''}`}>
                  {step.num}
                </div>
              </div>
              <div className="how-it-works__content">
                <h3 className="how-it-works__step-title">{step.title}</h3>
                <p className="how-it-works__step-desc">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="how-it-works__cta">
          <button className="btn-primary" onClick={() => setIsBookingOpen(true)}>
            Book Now
          </button>
        </div>
      </div>
    </section>
  )
}
