'use client'

import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import './Testimonials.css'

// Fallback data when CMS has no testimonials
const fallbackTestimonials = [
  {
    title: 'Amazing Experience',
    text: "AutoShine's auto detailing exceeded all my expectations. Scheduling was a breeze, and their professional team brought everything to my doorstep. My car has never looked better and the attention to detail was impressive.",
    name: 'Derek C.',
    avatar: 'https://i.pravatar.cc/150?u=derek',
    rating: 5,
  },
  {
    title: 'Highly Recommended!',
    text: "AutoShine's changed my mind about mobile auto detailing. From scheduling to the final result, it was stress-free. Their well-equipped team transformed my car—highly recommended!",
    name: 'Becky K.',
    avatar: 'https://i.pravatar.cc/150?u=becky',
    rating: 5,
  },
  {
    title: 'Fully Satisfy',
    text: "AutoShine's detailing isn't just about shiny cars; it's about making customers feel valued. Despite not being home, their outstanding communication, updates, and meticulous detailing left me impressed. My car looks fantastic, and I appreciate their unmatched commitment to customer satisfaction.",
    name: 'Parker J.',
    avatar: 'https://i.pravatar.cc/150?u=parker',
    rating: 5,
  },
]

interface TestimonialsProps {
  data: {
    sectionTitle: string
    testimonials: {
      title: string
      text: string
      name: string
      avatar: string
      rating: number
    }[]
  }
}

export default function Testimonials({ data }: TestimonialsProps) {
  const testimonials = data.testimonials.length > 0 ? data.testimonials : fallbackTestimonials

  return (
    <section className="testimonials section-padding" id="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <h2 className="section-title">
            {data.sectionTitle}
          </h2>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonials__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <h3 className="testimonials__card-title">{testimonial.title}</h3>
              
              <div className="testimonials__card-content">
                <span className="testimonials__quote-icon">&ldquo;</span>
                <p className="testimonials__card-text">
                  {testimonial.text}
                </p>
              </div>

              <hr className="testimonials__divider" />

              <div className="testimonials__author">
                <img src={testimonial.avatar} alt={testimonial.name} className="testimonials__author-avatar" />
                <div className="testimonials__author-info">
                  <h4 className="testimonials__author-name">{testimonial.name}</h4>
                  <div className="testimonials__stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="testimonials__star" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
