'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface BookingContextType {
  isBookingOpen: boolean
  setIsBookingOpen: (open: boolean) => void
}

const BookingContext = createContext<BookingContextType>({
  isBookingOpen: false,
  setIsBookingOpen: () => {},
})

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <BookingContext.Provider value={{ isBookingOpen, setIsBookingOpen }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
