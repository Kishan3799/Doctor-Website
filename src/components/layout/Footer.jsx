import React from 'react';
import { Link } from 'react-router-dom';

const ToothIcon = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
    <path
      d="M14 2C10.5 2 7 4.5 7 8C7 10 7.5 11.5 8 13C8.5 14.5 9 16 9 18.5C9 21.5 9.5 26 11 26C12.5 26 13 22 14 22C15 22 15.5 26 17 26C18.5 26 19 21.5 19 18.5C19 16 19.5 14.5 20 13C20.5 11.5 21 10 21 8C21 4.5 17.5 2 14 2Z"
      fill="#38BDF8"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ToothIcon />
              <div>
                <p className="font-manrope font-800 text-white text-base">BrightSmile</p>
                <p className="text-gray-400 text-xs">Dental Care</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Healthy Smiles Start Here. Professional dental care in Austin, Texas with over 15 years of clinical excellence.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: <FacebookIcon />, href: 'https://facebook.com/BrightSmileDentalCare', label: 'Facebook' },
                { icon: <InstagramIcon />, href: 'https://instagram.com/BrightSmileDental', label: 'Instagram' },
                { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/brightsmile-dental-care', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-manrope font-700 text-white text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Book Appointment', path: '/book-appointment' },
                { label: 'Testimonials', path: '/testimonials' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-accent transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-manrope font-700 text-white text-sm uppercase tracking-wider mb-5">
              Contact Info
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex gap-3">
                <span className="text-accent mt-0.5 flex-shrink-0">📍</span>
                <span>1284 Westlake Drive,<br />Austin, Texas, USA</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent flex-shrink-0">📞</span>
                <a href="tel:+15125550147" className="hover:text-accent transition-colors">
                  +1 (512) 555-0147
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-accent flex-shrink-0">✉️</span>
                <a href="mailto:hello@brightsmiledental.com" className="hover:text-accent transition-colors">
                  hello@brightsmiledental.com
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-manrope font-700 text-white text-sm uppercase tracking-wider mb-5">
              Opening Hours
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-gray-400">Monday – Friday</span>
                <span className="text-white font-medium">8:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-gray-400">Saturday</span>
                <span className="text-white font-medium">9:00 AM – 2:00 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-400">Sunday</span>
                <span className="text-red-400 font-medium">Closed</span>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-primary/20 rounded-xl border border-primary/30">
              <p className="text-xs text-accent font-semibold">🚨 Emergency Care</p>
              <p className="text-xs text-gray-400 mt-1">Same-day appointments available. Call us now.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
           BrightSmile Dental Care &copy; {currentYear} Designed by <a href="https://craftkoder.com" className="hover:text-accent transition-colors">CraftKoder</a>. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-gray-500 text-sm hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
