'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import { useBooking } from '../context/BookingContext'
import './Pricing.css'

const plans = [
  {
    name: 'Basic Wash',
    price: 49,
    description: 'Perfect for a quick exterior refresh',
    features: [
      'Premium Foam Wash',
      'Tyre & Alloy Dressing',
      'Glass Cleaning',
      'Dashboard Polish',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Full Detail',
    price: 149,
    description: 'Our most popular complete package',
    features: [
      'Everything in Basic',
      'Interior Vacuum Cleaning',
      'Seat Shampooing',
      'Interior Detailing',
      'Exterior Detailing',
      'Car Wax & Polish',
    ],
    cta: 'Book Now',
    popular: true,
  },
  {
    name: 'Ultimate Shield',
    price: 349,
    description: 'Maximum protection & showroom finish',
    features: [
      'Everything in Full Detail',
      'Ceramic Coating',
      'Paint Protection Treatment',
      'Headlight Restoration',
      'Engine Bay Cleaning',
      'Underbody Wash',
      'Car Odor Bomb Treatment',
    ],
    cta: 'Go Premium',
  },
]

export default function Pricing() {
  const { setIsBookingOpen } = useBooking()

  return (
    <section className="pricing section-padding" id="pricing">
      <div className="container">
        <div className="pricing__header">
          <div className="section-tag">
            <span className="tag-dot"></span>
            Pricing Plans
          </div>
          <h2 className="section-title">
            Transparent <span className="highlight">Pricing</span>
          </h2>
          <p className="section-subtitle">
            No hidden fees. Choose the package that fits your needs and budget.
            Every plan includes our satisfaction guarantee.
          </p>
        </div>

        <div className="pricing__grid">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing__card ${plan.popular ? 'pricing__card--popular' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              {plan.popular && (
                <div className="pricing__card-ribbon">⚡ Best Value</div>
              )}
              <div className="pricing__card-header">
                <h3 className="pricing__card-name">{plan.name}</h3>
                <p className="pricing__card-desc">{plan.description}</p>
                <div className="pricing__card-price" style={{ display: 'none' }}>
                  <span className="pricing__price-currency">₹</span>
                  <span className="pricing__price-amount">{plan.price}</span>
                  <span className="pricing__price-per">/session</span>
                </div>
              </div>
              <ul className="pricing__card-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="pricing__card-feature">
                    <FiCheck className="pricing__feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsBookingOpen(true)}
                className={`pricing__card-cta ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                style={{ width: '100%', cursor: 'pointer' }}
              >
                {plan.cta}
                <FiArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
