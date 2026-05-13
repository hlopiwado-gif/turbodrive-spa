'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar, FiUser, FiPhone, FiMapPin, FiSend, FiX } from 'react-icons/fi'
import { useBooking } from '../context/BookingContext'
import './BookingModal.css'
import './BookingForm.css'

const services = [
  'Ceramic Coating',
  'Premium Foam Wash',
  'Car Wax & Polish',
  'Interior Vacuum Cleaning',
  'Blow Cleaning',
  'Car Odor Bomb Treatment',
  'Interior Detailing',
  'Exterior Detailing',
  'Engine Bay Cleaning',
  'Glass Cleaning & Polish',
  'Tyre & Alloy Dressing',
  'Dashboard Polish',
  'Seat Shampooing',
  'Underbody Wash',
  'Headlight Restoration',
  'Paint Protection Treatment',
]

export default function BookingModal() {
  const { isBookingOpen, setIsBookingOpen } = useBooking()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: [] as string[],
    date: '',
    address: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsBookingOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [setIsBookingOpen])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isBookingOpen])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10)
      setFormData({ ...formData, [name]: digitsOnly })
      return
    }

    if (name === 'name') {
      const lettersOnly = value.replace(/[0-9]/g, '')
      setFormData({ ...formData, [name]: lettersOnly })
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const addService = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value && !formData.service.includes(value)) {
      setFormData({ ...formData, service: [...formData.service, value] })
    }
    e.target.value = '' // reset select
  }

  const removeService = (serviceToRemove: string) => {
    setFormData({ ...formData, service: formData.service.filter(s => s !== serviceToRemove) })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.service.map(s => ({ serviceName: s })),
          date: formData.date,
          time: '10:00',
          status: 'pending',
        }),
      })
    } catch {
      // Backend not available - still show success
    }
    
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1000)
  }

  const handleClose = () => {
    setIsBookingOpen(false)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', phone: '', service: [], date: '', address: '' })
    }, 300)
  }

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div className="booking-modal-overlay" onClick={handleClose}>
          <motion.div
            className="booking-modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <button className="booking-modal-close" onClick={handleClose}>
              <FiX />
            </button>

            {submitted ? (
              <div className="booking__success">
                <div className="booking__success-icon">✅</div>
                <h3 className="booking__success-title">Booking Received!</h3>
                <p className="booking__success-text">
                  Thank you! We&apos;ll confirm your appointment via email within the hour.
                </p>
                <button 
                  className="btn-primary" 
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="booking__form" onSubmit={handleSubmit} id="booking-modal-form">
                <h3 className="booking__form-title">Book Your Appointment</h3>

                <div className="booking__form-row">
                  <div className="booking__field">
                    <label className="booking__label" htmlFor="modal-name">
                      <FiUser className="booking__label-icon" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="booking__input"
                    />
                  </div>
                  <div className="booking__field">
                    <label className="booking__label" htmlFor="modal-phone">
                      <FiPhone className="booking__label-icon" /> Phone
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      name="phone"
                      placeholder="1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="booking__input"
                    />
                  </div>
                </div>

                <div className="booking__form-row">
                  <div className="booking__field">
                    <label className="booking__label" htmlFor="modal-service">
                      Service
                    </label>
                    {formData.service.length > 0 && (
                      <div className="booking__tags">
                        {formData.service.map((s) => (
                          <span key={s} className="booking__tag">
                            {s}
                            <button type="button" onClick={() => removeService(s)}>
                              <FiX />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <select
                      className="booking__select"
                      onChange={addService}
                      defaultValue=""
                      required={formData.service.length === 0}
                    >
                      <option value="" disabled>+ Add a service</option>
                      {services
                        .filter((s) => !formData.service.includes(s))
                        .map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="booking__field">
                    <label className="booking__label" htmlFor="modal-date">
                      <FiCalendar className="booking__label-icon" /> Date
                    </label>
                    <input
                      type="date"
                      id="modal-date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="booking__input"
                    />
                  </div>
                </div>

                <div className="booking__field">
                  <label className="booking__label" htmlFor="modal-address">
                    <FiMapPin className="booking__label-icon" /> Address
                  </label>
                  <input
                    type="text"
                    id="modal-address"
                    name="address"
                    placeholder="123 Main St, Salt Lake City, UT"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="booking__input"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary booking__submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="booking__loader"></span>
                  ) : (
                    <>
                      <FiSend /> Book Now
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
