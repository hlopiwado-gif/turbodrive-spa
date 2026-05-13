'use client'

import Link from 'next/link'
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiArrowUp } from 'react-icons/fi'
import { useBooking } from '../context/BookingContext'
import './Footer.css'

const footerLinks: Record<string, { name: string; to: string }[]> = {
  Services: [
    { name: 'Ceramic Coating', to: '/services' },
    { name: 'Premium Foam Wash', to: '/services' },
    { name: 'Interior Detailing', to: '/services' },
    { name: 'Exterior Detailing', to: '/services' },
    { name: 'Paint Protection', to: '/services' },
    { name: 'All Services →', to: '/services' },
  ],
  Company: [
    { name: 'Home', to: '/' },
    { name: 'Why Choose Us', to: '/why-us' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Testimonials', to: '/testimonials' },
  ],
  Support: [
    { name: 'FAQ', to: '/' },
    { name: 'Service Areas', to: '/' },
    { name: 'Gift Cards', to: '/' },
    { name: 'Privacy Policy', to: '/' },
    { name: 'Terms of Service', to: '/' },
  ],
}

export default function Footer() {
  const { setIsBookingOpen } = useBooking()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" id="footer">
      <div className="container">
        {/* CTA Banner */}
        <div className="footer__cta">
          <div className="footer__cta-content">
            <h3 className="footer__cta-title">
              Ready to make your car <span className="highlight">shine</span>?
            </h3>
            <p className="footer__cta-text">
              Book your mobile detailing appointment today and experience the difference.
            </p>
          </div>
          <button onClick={() => setIsBookingOpen(true)} className="btn-primary footer__cta-btn">
            Book Now ⚡
          </button>
        </div>

        {/* Links Grid */}
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <img src="/logo.png" alt="Turbo Drive & Spa" className="footer__logo-img" />
            </Link>
            <p className="footer__brand-desc">
              Premium mobile detailing & car wash services in Salt Lake City and Northern Utah.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" className="footer__social" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" className="footer__social" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" className="footer__social" aria-label="YouTube"><FiYoutube /></a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer__col">
              <h4 className="footer__col-title">{title}</h4>
              <ul className="footer__col-links">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.to} className="footer__col-link">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Turbo Drive & Spa. All rights reserved.
          </p>
          <button className="footer__scroll-top" onClick={scrollToTop} aria-label="Scroll to top" id="scroll-top">
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
