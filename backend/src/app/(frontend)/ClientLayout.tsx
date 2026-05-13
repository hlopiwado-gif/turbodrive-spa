'use client'

import React from 'react'
import { BookingProvider } from './context/BookingContext'
import Navbar from './components/Navbar'
import BookingModal from './components/BookingModal'
import Footer from './components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 400px)' }}>
        {children}
      </main>
      <Footer />
      <BookingModal />
    </BookingProvider>
  )
}
