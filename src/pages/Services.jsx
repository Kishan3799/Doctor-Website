import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const serviceCategories = [
  {
    icon: '🦷',
    title: 'General Dentistry',
    desc: 'Foundational care to keep your teeth and gums healthy for life.',
    services: ['Routine Checkups', 'Professional Teeth Cleaning', 'Tooth Fillings', 'Gum Disease Treatment (Gum Care)'],
    color: 'from-blue-500 to-primary',
  },
  {
    icon: '✨',
    title: 'Cosmetic Dentistry',
    desc: 'Enhance your smile with our range of aesthetic treatments.',
    services: ['Teeth Whitening', 'Porcelain Veneers', 'Smile Design & Makeover'],
    color: 'from-accent to-blue-400',
  },
  {
    icon: '🔧',
    title: 'Restorative Dentistry',
    desc: 'Restore function and beauty to damaged or missing teeth.',
    services: ['Dental Crowns', 'Dental Bridges', 'Dental Implants'],
    color: 'from-indigo-500 to-primary',
  },
  {
    icon: '😁',
    title: 'Orthodontics',
    desc: 'Straighten your teeth discreetly and comfortably.',
    services: ['Invisalign Clear Aligners', 'Braces Consultation'],
    color: 'from-sky-400 to-cyan-500',
  },
  {
    icon: '🚨',
    title: 'Emergency Dentistry',
    desc: 'Fast, compassionate care when you need it most.',
    services: ['Severe Tooth Pain Relief', 'Broken Tooth Repair', 'Same-Day Emergency Appointments'],
    color: 'from-rose-500 to-red-400',
  },
];

const Services = () => {
  const heroRef = useRef(null);
  const cardsRef = useScrollAnimation({ selector: '.service-category', stagger: 0.12, y: 50 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current?.querySelectorAll('.hero-el'), {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #F0F9FF 100%)' }}
      >
        <div className="container-xl max-w-3xl text-center">
          <p className="hero-el text-primary text-sm font-semibold uppercase tracking-wider mb-4">What We Offer</p>
          <h1 className="hero-el font-manrope font-800 text-5xl md:text-6xl text-text-primary mb-6">
            Our Dental <span className="text-gradient">Services</span>
          </h1>
          <p className="hero-el text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Comprehensive dental care for your entire family — from routine cleanings to complete smile transformations.
          </p>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES ── */}
      <section className="section-padding bg-white">
        <div ref={cardsRef} className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((cat) => (
              <div
                key={cat.title}
                className="service-category bg-white rounded-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
              >
                {/* Card header */}
                <div className={`bg-gradient-to-br ${cat.color} p-6 text-white`}>
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <h3 className="font-manrope font-700 text-xl mb-1">{cat.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{cat.desc}</p>
                </div>
                {/* Service list */}
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {cat.services.map((service) => (
                      <li key={service} className="flex items-start gap-3 text-text-muted text-sm">
                        <span className="w-5 h-5 rounded-full bg-bg-light flex items-center justify-center text-primary flex-shrink-0 mt-0.5 text-xs font-bold">
                          ✓
                        </span>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/book-appointment"
                    className="w-full text-center bg-bg-light text-primary text-sm font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 block group-hover:bg-primary group-hover:text-white"
                  >
                    Book Now →
                  </Link>
                </div>
              </div>
            ))}

            {/* Emergency callout card */}
            <div className="service-category md:col-span-2 lg:col-span-full bg-gradient-to-r from-gray-900 to-primary-dark rounded-card p-8 text-white flex flex-col md:flex-row items-center gap-6">
              <div className="text-5xl">⚡</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-manrope font-700 text-2xl mb-2">Dental Emergency?</h3>
                <p className="text-gray-300 text-base">
                  We reserve daily slots for emergency patients. Don't suffer — call us now for same-day relief.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="tel:+15125550147"
                  className="bg-white text-primary px-6 py-3 rounded-pill font-semibold hover:bg-bg-light transition-all duration-300 text-center"
                >
                  📞 Call Now
                </a>
                <Link
                  to="/book-appointment"
                  className="border-2 border-white text-white px-6 py-3 rounded-pill font-semibold hover:bg-white hover:text-primary transition-all duration-300 text-center"
                >
                  Book Emergency
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section-padding bg-bg-light">
        <div className="container-xl max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Simple Process</p>
            <h2 className="font-manrope font-700 text-4xl text-text-primary">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary to-accent" />
            {[
              { step: '01', title: 'Book Online', desc: 'Schedule in under 1 minute via our online form.' },
              { step: '02', title: 'Confirmation', desc: "We'll confirm your appointment via email or phone." },
              { step: '03', title: 'Your Visit', desc: 'Come in and experience our gentle, modern care.' },
              { step: '04', title: 'Follow-Up', desc: 'We check in to ensure you are fully satisfied.' },
            ].map((step) => (
              <div key={step.step} className="text-center relative">
                <div className="w-14 h-14 rounded-full bg-primary text-white font-manrope font-800 text-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                  {step.step}
                </div>
                <h4 className="font-manrope font-700 text-text-primary mb-2">{step.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #3573B9 0%, #38BDF8 100%)' }}
      >
        <div className="container-xl text-center">
          <h2 className="font-manrope font-800 text-4xl text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Book your appointment today and take the first step toward a healthier, brighter smile.
          </p>
          <Link
            to="/book-appointment"
            className="bg-white text-primary px-8 py-4 rounded-pill font-semibold hover:bg-bg-light transition-all duration-300 shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            Book Appointment <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
