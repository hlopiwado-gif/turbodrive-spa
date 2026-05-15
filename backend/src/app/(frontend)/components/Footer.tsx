'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiArrowUp } from 'react-icons/fi'
import { useBooking } from '../context/BookingContext'
import './Footer.css'

const defaultFooterLinks: Record<string, { name: string; to: string }[]> = {
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

interface FooterData {
  ctaTitle: string
  ctaText: string
  brandDescription: string
  socialLinks: {
    instagram?: string
    facebook?: string
    twitter?: string
    youtube?: string
  }
  copyright: string
}

const defaultFooterData: FooterData = {
  ctaTitle: 'Ready to make your car shine?',
  ctaText: 'Book your mobile detailing appointment today and experience the difference.',
  brandDescription: 'Premium mobile detailing & car wash services in Salt Lake City and Northern Utah.',
  socialLinks: {},
  copyright: 'Turbo Drive & Spa. All rights reserved.',
}

export default function Footer() {
  const { setIsBookingOpen } = useBooking()
  const [data, setData] = useState<FooterData>(defaultFooterData)

  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await fetch('/api/globals/footer-section')
        const json = await res.json()
        setData({
          ctaTitle: json.ctaTitle || defaultFooterData.ctaTitle,
          ctaText: json.ctaText || defaultFooterData.ctaText,
          brandDescription: json.brandDescription || defaultFooterData.brandDescription,
          socialLinks: json.socialLinks || {},
          copyright: json.copyright || defaultFooterData.copyright,
        })
      } catch {
        // Use fallback data
      }
    }
    fetchFooter()
  }, [])

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
              {data.ctaTitle.includes('shine') ? (
                <>
                  {data.ctaTitle.split('shine')[0]}<span className="highlight">shine</span>{data.ctaTitle.split('shine')[1]}
                </>
              ) : data.ctaTitle}
            </h3>
            <p className="footer__cta-text">
              {data.ctaText}
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
              {data.brandDescription}
            </p>
            <div className="footer__socials">
              <a href={data.socialLinks.instagram || '#'} className="footer__social" aria-label="Instagram"><FiInstagram /></a>
              <a href={data.socialLinks.facebook || '#'} className="footer__social" aria-label="Facebook"><FiFacebook /></a>
              <a href={data.socialLinks.twitter || '#'} className="footer__social" aria-label="Twitter"><FiTwitter /></a>
              <a href={data.socialLinks.youtube || '#'} className="footer__social" aria-label="YouTube"><FiYoutube /></a>
            </div>
          </div>

          {Object.entries(defaultFooterLinks).map(([title, links]) => (
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
            © {new Date().getFullYear()} {data.copyright}
          </p>
          <button className="footer__scroll-top" onClick={scrollToTop} aria-label="Scroll to top" id="scroll-top">
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
