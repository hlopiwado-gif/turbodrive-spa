'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiStar, FiCheck } from 'react-icons/fi'
import { useBooking } from '../context/BookingContext'
import './Hero.css'

interface HeroProps {
  data: {
    badge: string
    title: string
    titleHighlight: string
    description: string
    features: string[]
    heroImageUrl: string
    customerCount: string
    rating: string
    yearsExperience: string
  }
}

export default function Hero({ data }: HeroProps) {
  const { setIsBookingOpen } = useBooking()

  return (
    <section className="hero" id="home">
      {/* Background Effects */}
      <div className="hero__bg-effects">
        <div className="hero__bg-grid"></div>
        <div className="hero__bg-glow hero__bg-glow--1"></div>
        <div className="hero__bg-glow hero__bg-glow--2"></div>
      </div>

      <div className="hero__container container">
        <div className="hero__content">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="hero__badge">
              <FiStar className="hero__badge-icon" />
              <span>{data.badge}</span>
            </div>

            <h1 className="hero__title">
              {data.title} <span className="hero__title-highlight">{data.titleHighlight}</span>
            </h1>

            <p className="hero__description">
              {data.description}
            </p>

            <div className="hero__features">
              {data.features.map((feature, index) => (
                <div className="hero__feature" key={index}>
                  <FiCheck className="hero__feature-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="hero__actions">
              <button onClick={() => setIsBookingOpen(true)} className="btn-primary hero__btn-book">
                Book Now
                <FiArrowRight />
              </button>
              <Link href="/services" className="btn-outline hero__btn-services">
                Our Services
              </Link>
            </div>

            <div className="hero__trust">
              <div className="hero__trust-avatars">
                <div className="hero__trust-avatar" style={{ background: '#FFD600' }}>⭐</div>
                <div className="hero__trust-avatar" style={{ background: '#333' }}>🚗</div>
                <div className="hero__trust-avatar" style={{ background: '#FFD600' }}>✨</div>
              </div>
              <div className="hero__trust-text">
                <span className="hero__trust-count">{data.customerCount}</span>
                <span className="hero__trust-label">Happy Customers</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="hero__image-wrapper">
              <div className="hero__image-bg"></div>
              <img
                src={data.heroImageUrl}
                alt="Professional car detailing service"
                className="hero__image"
              />
              <div className="hero__floating-card hero__floating-card--rating animate-float">
                <div className="hero__card-stars">⭐⭐⭐⭐⭐</div>
                <div className="hero__card-text">{data.rating}</div>
              </div>
              <div className="hero__floating-card hero__floating-card--years animate-float" style={{ animationDelay: '1s' }}>
                <div className="hero__card-number">{data.yearsExperience}</div>
                <div className="hero__card-text">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
