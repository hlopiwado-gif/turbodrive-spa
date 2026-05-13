import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <BookingContext.Provider value={{ isBookingOpen, setIsBookingOpen }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
