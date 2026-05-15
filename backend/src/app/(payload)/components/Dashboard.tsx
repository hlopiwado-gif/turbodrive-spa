'use client'

import React, { useEffect, useState } from 'react'

interface StatsData {
  bookings: number
  services: number
  media: number
  pages: number
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({ bookings: 0, services: 0, media: 0, pages: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [bookingsRes, servicesRes, mediaRes, pagesRes] = await Promise.all([
          fetch('/api/bookings?limit=0').then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch('/api/services?limit=0').then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch('/api/media?limit=0').then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch('/api/pages?limit=0').then(r => r.json()).catch(() => ({ totalDocs: 0 })),
        ])
        setStats({
          bookings: bookingsRes.totalDocs || 0,
          services: servicesRes.totalDocs || 0,
          media: mediaRes.totalDocs || 0,
          pages: pagesRes.totalDocs || 0,
        })
      } catch {
        // silently handle
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: 'Bookings', value: stats.bookings, icon: '📋', href: '/admin/collections/bookings', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
    { label: 'Services', value: stats.services, icon: '🚗', href: '/admin/collections/services', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
    { label: 'Media Files', value: stats.media, icon: '🖼️', href: '/admin/collections/media', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
    { label: 'Pages', value: stats.pages, icon: '📄', href: '/admin/collections/pages', color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
  ]

  const quickLinks = [
    { label: 'Edit Homepage', desc: 'Hero, Services, Pricing & more', href: '/admin/globals/homepage', icon: '🏠' },
    { label: 'Manage Bookings', desc: 'View and manage customer bookings', href: '/admin/collections/bookings', icon: '📋' },
    { label: 'Services', desc: 'Add or edit detailing services', href: '/admin/collections/services', icon: '⚙️' },
    { label: 'Pricing Plans', desc: 'Update pricing packages', href: '/admin/globals/pricing-page', icon: '💰' },
    { label: 'Testimonials', desc: 'Customer reviews and ratings', href: '/admin/globals/testimonials-page', icon: '⭐' },
    { label: 'Branding', desc: 'Logo, colors, and site identity', href: '/admin/globals/branding', icon: '🎨' },
    { label: 'Media Library', desc: 'Upload and manage images', href: '/admin/collections/media', icon: '🖼️' },
    { label: 'Footer', desc: 'Footer links and content', href: '/admin/globals/footer-section', icon: '🔗' },
  ]

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Dashboard
          </h1>
          <p style={styles.subtitle}>Welcome back — here&apos;s your site overview</p>
        </div>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          Live
        </div>
      </div>

      {/* Stats Row */}
      <div style={styles.statsGrid}>
        {statCards.map((card) => (
          <a key={card.label} href={card.href} style={{ ...styles.statCard, borderColor: `${card.color}15` }}>
            <div style={{ ...styles.statIcon, background: card.bg }}>
              <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
            </div>
            <div>
              <div style={styles.statValue}>
                {loading ? '—' : card.value}
              </div>
              <div style={styles.statLabel}>{card.label}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Access */}
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Quick Access</h2>
        <p style={styles.sectionSubtitle}>Jump to any section of your site</p>
      </div>

      <div style={styles.quickGrid}>
        {quickLinks.map((link) => (
          <a key={link.label} href={link.href} style={styles.quickCard}>
            <div style={styles.quickIcon}>
              <span style={{ fontSize: '1.3rem' }}>{link.icon}</span>
            </div>
            <div style={styles.quickContent}>
              <div style={styles.quickLabel}>{link.label}</div>
              <div style={styles.quickDesc}>{link.desc}</div>
            </div>
            <div style={styles.quickArrow}>→</div>
          </a>
        ))}
      </div>

      {/* Page Management */}
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Page Management</h2>
        <p style={styles.sectionSubtitle}>Edit individual page sections</p>
      </div>

      <div style={styles.pageGrid}>
        {[
          { label: 'Homepage', href: '/admin/globals/homepage', sections: '6 sections', color: '#FFD600' },
          { label: 'Why Us', href: '/admin/globals/why-us-page', sections: '4 cards', color: '#22c55e' },
          { label: 'Services', href: '/admin/globals/services-page', sections: 'All services', color: '#3b82f6' },
          { label: 'Pricing', href: '/admin/globals/pricing-page', sections: 'Plans & features', color: '#f97316' },
          { label: 'Testimonials', href: '/admin/globals/testimonials-page', sections: 'Reviews', color: '#a855f7' },
        ].map((page) => (
          <a key={page.label} href={page.href} style={styles.pageCard}>
            <div style={{ ...styles.pageIndicator, background: page.color }} />
            <div style={styles.pageInfo}>
              <div style={styles.pageLabel}>{page.label}</div>
              <div style={styles.pageSections}>{page.sections}</div>
            </div>
            <div style={styles.pageArrow}>
              Edit →
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 32px 60px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '36px',
  },
  title: {
    fontSize: '1.85rem',
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#71717a',
    marginTop: '6px',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(34, 197, 94, 0.08)',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    borderRadius: '20px',
    padding: '6px 16px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#22c55e',
  },
  badgeDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#22c55e',
    display: 'inline-block',
    animation: 'pulse 2s infinite',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '48px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: '#18181b',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '22px 24px',
    textDecoration: 'none',
    transition: 'all 0.25s ease',
    cursor: 'pointer',
  },
  statIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '0.82rem',
    color: '#71717a',
    fontWeight: 500,
    marginTop: '4px',
  },
  sectionHeader: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
  },
  sectionSubtitle: {
    fontSize: '0.85rem',
    color: '#52525b',
    marginTop: '4px',
  },
  quickGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '12px',
    marginBottom: '48px',
  },
  quickCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: '#141416',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '14px',
    padding: '16px 20px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  quickIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  quickContent: {
    flex: 1,
    minWidth: 0,
  },
  quickLabel: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#e4e4e7',
  },
  quickDesc: {
    fontSize: '0.78rem',
    color: '#52525b',
    marginTop: '2px',
  },
  quickArrow: {
    fontSize: '1rem',
    color: '#52525b',
    flexShrink: 0,
    transition: 'all 0.2s ease',
  },
  pageGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  pageCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: '#141416',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px',
    padding: '16px 22px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  pageIndicator: {
    width: '4px',
    height: '32px',
    borderRadius: '4px',
    flexShrink: 0,
  },
  pageInfo: {
    flex: 1,
  },
  pageLabel: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: '#e4e4e7',
  },
  pageSections: {
    fontSize: '0.78rem',
    color: '#52525b',
    marginTop: '2px',
  },
  pageArrow: {
    fontSize: '0.82rem',
    color: '#FFD600',
    fontWeight: 600,
    flexShrink: 0,
    opacity: 0.7,
  },
}

export default Dashboard
