import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiGrid, FiTag, FiStar } from 'react-icons/fi';
import { useBooking } from '../context/BookingContext';
import './Navbar.css';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Why Us', to: '/why-us' },
  { name: 'Services', to: '/services' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Testimonials', to: '/testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { setIsBookingOpen } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <div className="navbar__container container">
        <Link to="/" className="navbar__logo">
          <img src="/logo.png" alt="Turbo Drive & Spa" className="navbar__logo-img" />
        </Link>

        <div className="navbar__nav-pill">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <button onClick={() => setIsBookingOpen(true)} className="navbar__cta btn-primary">
          Book Now
        </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="navbar__bottom-nav">
        <NavLink to="/" end className={({ isActive }) => `navbar__bottom-link ${isActive ? 'navbar__bottom-link--active' : ''}`}>
          <FiHome className="navbar__bottom-icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => `navbar__bottom-link ${isActive ? 'navbar__bottom-link--active' : ''}`}>
          <FiGrid className="navbar__bottom-icon" />
          <span>Services</span>
        </NavLink>
        <NavLink to="/pricing" className={({ isActive }) => `navbar__bottom-link ${isActive ? 'navbar__bottom-link--active' : ''}`}>
          <FiTag className="navbar__bottom-icon" />
          <span>Pricing</span>
        </NavLink>
        <NavLink to="/why-us" className={({ isActive }) => `navbar__bottom-link ${isActive ? 'navbar__bottom-link--active' : ''}`}>
          <FiStar className="navbar__bottom-icon" />
          <span>Why Us</span>
        </NavLink>
      </div>
    </>
  );
}
