import React from 'react'
import { Metadata } from 'next'
import './globals.css'
import ClientLayout from './ClientLayout'

export const metadata: Metadata = {
  title: 'Turbo Drive & Spa | Premium Mobile Detailing in Salt Lake City, UT',
  description: 'Northern Utah\'s #1 rated mobile detailing & car wash service. Premium eco-friendly products, professional equipment, and 100% satisfaction guaranteed. Book your appointment today!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
