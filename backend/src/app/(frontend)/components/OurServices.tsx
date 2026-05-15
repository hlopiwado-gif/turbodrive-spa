'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useBooking } from '../context/BookingContext'
import './OurServices.css'

interface ServiceItem {
  id: string
  title: string
  description?: string
  image: {
    url: string
    alt?: string
  }
}

// Fallback data when CMS is empty
const fallbackServices: ServiceItem[] = [
  { id: '1', title: 'Exterior Detailing', description: 'Complete exterior wash & wax', image: { url: '/car-wash-hero.png', alt: 'Exterior Detailing' } },
  { id: '2', title: 'Interior Detailing', description: 'Deep clean & condition interiors', image: { url: '/car-wash-hero.png', alt: 'Interior Detailing' } },
  { id: '3', title: 'Ceramic Coating', description: 'Long-lasting paint protection', image: { url: '/car-wash-hero.png', alt: 'Ceramic Coating' } },
  { id: '4', title: 'Paint Correction', description: 'Remove swirls & scratches', image: { url: '/car-wash-hero.png', alt: 'Paint Correction' } },
  { id: '5', title: 'Full Detail Package', description: 'Complete inside & out', image: { url: '/car-wash-hero.png', alt: 'Full Detail' } },
]

interface OurServicesProps {
  data?: {
    title: string
    titleHighlight: string
    subtitle: string
    cards?: ServiceItem[]
  }
}

export default function OurServices({ data }: OurServicesProps) {
  // Use CMS cards if provided, otherwise start with fallback
  const [services, setServices] = useState<ServiceItem[]>(
    data?.cards && data.cards.length > 0 ? data.cards : fallbackServices
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const { setIsBookingOpen } = useBooking()

  // Only fetch from API if no CMS cards were provided
  useEffect(() => {
    if (data?.cards && data.cards.length > 0) return // CMS cards take priority

    async function fetchServices() {
      try {
        const res = await fetch('/api/services?sort=order&limit=20')
        const json = await res.json()
        if (json.docs && json.docs.length > 0) {
          const mapped = json.docs.map((doc: any) => ({
            id: doc.id,
            title: doc.title,
            description: doc.description || '',
            image: {
              url: typeof doc.image === 'object' ? doc.image.url : '/car-wash-hero.png',
              alt: typeof doc.image === 'object' ? (doc.image.alt || doc.title) : doc.title,
            },
          }))
          setServices(mapped)
        }
      } catch {
        // Use fallback data
      }
    }
    fetchServices()
  }, [data?.cards])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % services.length)
  }, [services.length])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
  }, [services.length])

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(goNext, 4000)
    return () => clearInterval(interval)
  }, [goNext])

  const getPosition = (index: number) => {
    const diff = index - activeIndex
    const len = services.length

    // Handle wrapping
    let pos = diff
    if (Math.abs(diff) > len / 2) {
      pos = diff > 0 ? diff - len : diff + len
    }

    // Clamp to -2..2
    if (pos < -2) return -3
    if (pos > 2) return 3
    return pos
  }

  const sectionTitle = data?.title || 'All'
  const sectionHighlight = data?.titleHighlight || 'Services'
  const sectionSubtitle = data?.subtitle || ''

  return (
    <section className="our-services" id="our-services">
      <div className="container">
        <motion.div
          className="our-services__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="our-services__title">
            {sectionTitle} <span className="highlight">{sectionHighlight}</span>
          </h2>
          {sectionSubtitle && (
            <p className="our-services__subtitle">{sectionSubtitle}</p>
          )}
        </motion.div>

        <div className="our-services__carousel">
          {services.map((service, index) => {
            const pos = getPosition(index)
            if (pos === -3 || pos === 3) return null

            return (
              <div
                key={service.id}
                className="our-services__card"
                data-position={pos}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={service.image.url}
                  alt={service.image.alt || service.title}
                />
                <div className="our-services__card-overlay">
                  <h3>{service.title}</h3>
                  {service.description && <p>{service.description}</p>}
                  <button
                    className="our-services__card-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsBookingOpen(true)
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="our-services__nav">
          <button className="our-services__nav-btn" onClick={goPrev} aria-label="Previous">
            <FiChevronLeft />
          </button>
          <div className="our-services__dots">
            {services.map((_, index) => (
              <button
                key={index}
                className={`our-services__dot ${index === activeIndex ? 'our-services__dot--active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
          <button className="our-services__nav-btn" onClick={goNext} aria-label="Next">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
