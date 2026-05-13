import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Navbar />
        <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 400px)' }}>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <WhyUs />
                <Services />
                <HowItWorks />
                <Testimonials />
              </>
            } />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </Routes>
        </main>
        <Footer />
        <BookingModal />
      </Router>
    </BookingProvider>
  );
}

export default App;
