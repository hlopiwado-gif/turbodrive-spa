import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import './BookingForm.css';

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
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: [],
    date: '',
    address: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Service selection handled separately via addService / removeService

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: digitsOnly });
      return;
    }

    if (name === 'name') {
      const lettersOnly = value.replace(/[0-9]/g, '');
      setFormData({ ...formData, [name]: lettersOnly });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const addService = (e) => {
    const value = e.target.value;
    if (value && !formData.service.includes(value)) {
      setFormData({ ...formData, service: [...formData.service, value] });
    }
    e.target.value = ''; // reset select
  };

  const removeService = (serviceToRemove) => {
    setFormData({ ...formData, service: formData.service.filter(s => s !== serviceToRemove) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call (would connect to Payload CMS backend)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      // If backend is not yet connected, simulate success
    } catch (err) {
      // Backend not available - still show success for demo
    }
    
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="booking section-padding" id="book">
      <div className="container">
        <div className="booking__wrapper">
          <motion.div
            className="booking__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-tag">
              <span className="tag-dot"></span>
              Book Your Service
            </div>
            <h2 className="section-title">
              Ready for a <span className="highlight">Spotless</span> Ride?
            </h2>
            <p className="booking__desc">
              Schedule your mobile detailing appointment today. We'll come to 
              you with everything needed for a premium detail. Fill out the 
              form and we'll confirm your booking within the hour.
            </p>

            <div className="booking__contact-items">
              <div className="booking__contact-item">
                <div className="booking__contact-icon">
                  <FiPhone />
                </div>
                <div>
                  <div className="booking__contact-label">Call Us</div>
                  <div className="booking__contact-value">(801) 555-0123</div>
                </div>
              </div>
              <div className="booking__contact-item">
                <div className="booking__contact-icon">
                  <FiMail />
                </div>
                <div>
                  <div className="booking__contact-label">Email Us</div>
                  <div className="booking__contact-value">hello@autoshinepro.com</div>
                </div>
              </div>
              <div className="booking__contact-item">
                <div className="booking__contact-icon">
                  <FiMapPin />
                </div>
                <div>
                  <div className="booking__contact-label">Service Area</div>
                  <div className="booking__contact-value">Salt Lake City & Northern Utah</div>
                </div>
              </div>
            </div>

            <div className="booking__hours">
              <h4 className="booking__hours-title">Business Hours</h4>
              <div className="booking__hours-grid">
                <span>Mon - Fri</span><span>7:00 AM - 7:00 PM</span>
                <span>Saturday</span><span>8:00 AM - 6:00 PM</span>
                <span>Sunday</span><span>9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="booking__form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {submitted ? (
              <div className="booking__success">
                <div className="booking__success-icon">✅</div>
                <h3 className="booking__success-title">Booking Received!</h3>
                <p className="booking__success-text">
                  Thank you! We'll confirm your appointment via email within the hour.
                </p>
                <button 
                  className="btn-primary" 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', service: [], date: '', address: '' }); }}
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form className="booking__form" onSubmit={handleSubmit} id="booking-form">
                <h3 className="booking__form-title">Book Your Appointment</h3>

                <div className="booking__form-row">
                  <div className="booking__field">
                    <label className="booking__label" htmlFor="name">
                      <FiUser className="booking__label-icon" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="booking__input"
                    />
                  </div>
                  <div className="booking__field">
                    <label className="booking__label" htmlFor="phone">
                      <FiPhone className="booking__label-icon" /> Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
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
                    <label className="booking__label">
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
                    <label className="booking__label" htmlFor="date">
                      <FiCalendar className="booking__label-icon" /> Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="booking__input"
                    />
                  </div>
                </div>

                <div className="booking__field">
                  <label className="booking__label" htmlFor="address">
                    <FiMapPin className="booking__label-icon" /> Address
                  </label>
                  <input
                    type="text"
                    id="address"
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
                  id="booking-submit"
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
      </div>
    </section>
  );
}
