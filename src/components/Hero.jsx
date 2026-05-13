import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiCheck } from 'react-icons/fi';
import { useBooking } from '../context/BookingContext';
import './Hero.css';

export default function Hero() {
  const { setIsBookingOpen } = useBooking();

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
              <span>#1 Rated Mobile Detailing Service</span>
            </div>

            <h1 className="hero__title">
              Mobile Detailing
              <br />
              <span className="hero__title-highlight">& Wash</span> in
              <br />
              Salt Lake City, UT
            </h1>

            <p className="hero__description">
              Northern Utah's best choice for convenient auto detailing services
              brought to your residence or workplace. Our team employs
              state-of-the-art techniques, premium tools, and eco-friendly
              cleaning products to ensure the impeccable upkeep and protection
              of your vehicle.
            </p>

            <div className="hero__features">
              <div className="hero__feature">
                <FiCheck className="hero__feature-icon" />
                <span>Eco-Friendly Products</span>
              </div>
              <div className="hero__feature">
                <FiCheck className="hero__feature-icon" />
                <span>We Come To You</span>
              </div>
              <div className="hero__feature">
                <FiCheck className="hero__feature-icon" />
                <span>100% Satisfaction</span>
              </div>
            </div>

            <div className="hero__actions">
              <button onClick={() => setIsBookingOpen(true)} className="btn-primary hero__btn-book">
                Book Now
                <FiArrowRight />
              </button>
              <Link to="/services" className="btn-outline hero__btn-services">
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
                <span className="hero__trust-count">2,500+</span>
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
                src="/car-wash-hero.png"
                alt="Professional car detailing service"
                className="hero__image"
              />
              <div className="hero__floating-card hero__floating-card--rating animate-float">
                <div className="hero__card-stars">⭐⭐⭐⭐⭐</div>
                <div className="hero__card-text">4.9 / 5.0 Rating</div>
              </div>
              <div className="hero__floating-card hero__floating-card--years animate-float" style={{ animationDelay: '1s' }}>
                <div className="hero__card-number">10+</div>
                <div className="hero__card-text">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
