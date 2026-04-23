import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { gsap } from 'gsap';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

const ToothIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2C10.5 2 7 4.5 7 8C7 10 7.5 11.5 8 13C8.5 14.5 9 16 9 18.5C9 21.5 9.5 26 11 26C12.5 26 13 22 14 22C15 22 15.5 26 17 26C18.5 26 19 21.5 19 18.5C19 16 19.5 14.5 20 13C20.5 11.5 21 10 21 8C21 4.5 17.5 2 14 2Z"
      fill="#3573B9"
      stroke="#3573B9"
      strokeWidth="0.5"
    />
    <path
      d="M10.5 7.5C10.5 7 11.5 6 12.5 6C13.5 6 14.5 6.5 15.5 6C16.5 5.5 17.5 5.5 17.5 7"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const drawerLinksRef = useRef(null);

  // Handle scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP mobile menu animation
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (menuOpen) {
      // Open animation
      gsap.set(drawerRef.current, { display: 'flex' });
      gsap.set(overlayRef.current, { display: 'block' });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
      // Stagger nav links
      const links = drawerLinksRef.current?.querySelectorAll('a');
      if (links) {
        gsap.fromTo(links, { opacity: 0, x: 30 }, { opacity: 1, x: 0, stagger: 0.07, delay: 0.2, duration: 0.4, ease: 'power2.out' });
      }
      document.body.style.overflow = 'hidden';
    } else {
      // Close animation
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => {
          if (drawerRef.current) gsap.set(drawerRef.current, { display: 'none' });
          if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' });
        },
      });
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const activeLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:rounded-full after:transition-transform after:duration-300 ${
      isActive
        ? 'text-primary after:bg-primary after:scale-x-100'
        : 'text-text-muted hover:text-primary after:bg-primary after:scale-x-0 hover:after:scale-x-100'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-glass border-b border-gray-100 shadow-glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-xl flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <ToothIcon />
            <div className="leading-tight">
              <span className="font-manrope font-800 text-text-primary text-base group-hover:text-primary transition-colors duration-200">
                BrightSmile
              </span>
              <br />
              <span className="font-inter text-text-muted text-xs">Dental Care</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'} className={activeLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+15125550147"
              className="text-text-muted text-sm font-medium hover:text-primary transition-colors duration-200 flex items-center gap-1"
            >
              <span>📞</span> (512) 555-0147
            </a>
            <Link
              to="/book-appointment"
              className="bg-primary text-white px-5 py-2.5 rounded-pill text-sm font-semibold hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-card-hover hover:-translate-y-0.5"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 z-40 hidden"
        onClick={() => setMenuOpen(false)}
        style={{ display: 'none' }}
      />

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-80 bg-white z-50 flex-col p-8 shadow-2xl"
        style={{ display: 'none' }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <ToothIcon />
            <span className="font-manrope font-800 text-text-primary">BrightSmile</span>
          </Link>
          <button
            className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Drawer Links */}
        <nav ref={drawerLinksRef} className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-bg-light text-primary'
                    : 'text-text-muted hover:bg-bg-light hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/book-appointment"
            onClick={() => setMenuOpen(false)}
            className="bg-primary text-white text-center px-6 py-3 rounded-pill font-semibold hover:bg-primary-dark transition-all duration-300"
          >
            Book Appointment
          </Link>
          <a
            href="tel:+15125550147"
            className="text-center text-text-muted text-sm hover:text-primary transition-colors"
          >
            📞 (512) 555-0147
          </a>
        </div>

        {/* Clinic Hours in Drawer */}
        <div className="mt-auto pt-8 border-t border-gray-100">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Hours</p>
          <div className="text-xs text-text-muted space-y-1">
            <div className="flex justify-between">
              <span>Mon – Fri</span><span className="text-text-primary font-medium">8AM – 6PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span><span className="text-text-primary font-medium">9AM – 2PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span><span className="text-red-400 font-medium">Closed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
