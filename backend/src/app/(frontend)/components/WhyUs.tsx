'use client'

import { motion } from 'framer-motion'
import { FiDroplet, FiFeather, FiFile, FiTool, FiSun } from 'react-icons/fi'
import './WhyUs.css'

const reasons = [
  {
    icon: <img src="/our-service-image/1.png" alt="All Certified Products" style={{ width: '100%', height: '100%', objectFit: 'contain' as const }} />,
    title: 'All Certified Products',
    description: 'We use only certified, high-quality products that are tested and trusted by professionals for superior results.',
  },
  {
    icon: <FiDroplet />,
    title: 'Specially Made for Cars',
    description: 'Every product and solution we use is specifically formulated for automotive surfaces — no generic cleaners here.',
  },
  {
    icon: <FiFeather />,
    title: 'Premium Microfiber Care',
    description: 'Scratch-free finish guaranteed with our premium microfiber towels and applicators for a flawless, swirl-free result.',
  },
  {
    icon: <FiFile />,
    title: 'Complimentary Paper Mats',
    description: 'We provide complimentary paper mats to protect your freshly cleaned interior floors when you drive away.',
  },
  {
    icon: <FiTool />,
    title: 'Professional Detailing Equipment',
    description: 'State-of-the-art detailing equipment including dual-action polishers, steam cleaners, and extraction machines.',
  },
  {
    icon: <FiSun />,
    title: 'Premium Shine & Protection',
    description: 'Delivering showroom-quality shine with long-lasting protection against UV rays, contaminants, and daily wear.',
  },
]

export default function WhyUs() {
  return (
    <section className="why-us section-padding" id="why-us">
      <div className="container">
        <div className="why-us__header">
          <div className="section-tag">
            <span className="tag-dot"></span>
            Why Choose Us
          </div>
          <h2 className="section-title">
            Why Customers <span className="highlight">Trust Us</span>
          </h2>
          <p className="section-subtitle">
            We go above and beyond to deliver the best detailing experience
            with certified products and professional-grade equipment.
          </p>
        </div>

        <div className="why-us__grid">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className={`why-us__card ${index === 1 ? 'why-us__card--highlight' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="why-us__card-icon">
                {reason.icon}
              </div>
              <h3 className="why-us__card-title">{reason.title}</h3>
              <p className="why-us__card-desc">{reason.description}</p>
              <div className="why-us__card-link">
                LEARN MORE <span>&gt;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
