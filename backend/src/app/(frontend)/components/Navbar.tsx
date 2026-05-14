'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiGrid, FiTag, FiStar } from 'react-icons/fi'
import { useBooking } from '../context/BookingContext'
import './Navbar.css'

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Why Us', to: '/why-us' },
  { name: 'Services', to: '/services' },
  { name: 'Pricing', to: '/pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { setIsBookingOpen } = useBooking()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <div className="navbar__container container">
        <Link href="/" className="navbar__logo">
          <img src="/logo.png" alt="Turbo Drive & Spa" className="navbar__logo-img" />
        </Link>

        <div className="navbar__nav-pill">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.to}
              className={`navbar__link ${
                (link.to === '/' ? pathname === '/' : pathname === link.to)
                  ? 'navbar__link--active'
                  : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button onClick={() => setIsBookingOpen(true)} className="navbar__cta btn-primary">
          Book Now
        </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="navbar__bottom-nav">
        <Link href="/" className={`navbar__bottom-link ${pathname === '/' ? 'navbar__bottom-link--active' : ''}`}>
          <FiHome className="navbar__bottom-icon" />
          <span>Home</span>
        </Link>
        <Link href="/services" className={`navbar__bottom-link ${pathname === '/services' ? 'navbar__bottom-link--active' : ''}`}>
          <FiGrid className="navbar__bottom-icon" />
          <span>Services</span>
        </Link>
        <Link href="/pricing" className={`navbar__bottom-link ${pathname === '/pricing' ? 'navbar__bottom-link--active' : ''}`}>
          <FiTag className="navbar__bottom-icon" />
          <span>Pricing</span>
        </Link>
        <Link href="/why-us" className={`navbar__bottom-link ${pathname === '/why-us' ? 'navbar__bottom-link--active' : ''}`}>
          <FiStar className="navbar__bottom-icon" />
          <span>Why Us</span>
        </Link>
      </div>
    </>
  )
}
