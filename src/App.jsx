import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import BookAppointment from './pages/BookAppointment';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import { initLenis } from './lib/lenis';

gsap.registerPlugin(ScrollTrigger);

// ── Page transition wrapper ─────────────────────────────
function PageWrapper({ children }) {
  const location = useLocation();
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Page entrance animation
    if (wrapperRef.current) {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [location.pathname]);

  return <div ref={wrapperRef}>{children}</div>;
}

// ── App Layout ─────────────────────────────────────────
function AppLayout() {
  return (
    <>
      <Header />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center pt-20">
              <div className="text-center">
                <p className="text-8xl mb-6">🦷</p>
                <h1 className="font-manrope font-800 text-5xl text-text-primary mb-4">404</h1>
                <p className="text-text-muted text-lg mb-8">Oops! This page doesn't exist.</p>
                <a
                  href="/"
                  className="bg-primary text-white px-8 py-3 rounded-pill font-semibold hover:bg-primary-dark transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </PageWrapper>
      <Footer />
    </>
  );
}

// ── Root App ───────────────────────────────────────────
function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = initLenis();

    return () => {
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
