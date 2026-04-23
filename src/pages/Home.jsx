import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';
import { ServiceCard, TestimonialCard } from '../components/ui/Card';

gsap.registerPlugin(ScrollTrigger);

// ── Why Choose Us data ─────────────────────────────────
const whyCards = [
  { icon: '🏆', title: '15+ Years Experience', desc: 'Our veteran clinical team brings decades of combined expertise to every procedure.' },
  { icon: '💆', title: 'Gentle Treatments', desc: 'We prioritize your comfort with pain-free techniques and a calming environment.' },
  { icon: '⚡', title: 'Same-day Emergency', desc: "Dental emergencies can't wait. We reserve slots daily for immediate relief." },
  { icon: '🔬', title: 'Modern X-ray Tech', desc: 'Low-radiation digital imaging for precise diagnosis and safer patient care.' },
  { icon: '👨‍👩‍👧', title: 'Family-friendly', desc: 'A welcoming space designed to make patients of all ages feel at ease.' },
  { icon: '💳', title: 'Flexible Payment', desc: 'We accept most major insurance plans and offer structured financing options.' },
];

// ── Services Preview data ───────────────────────────────
const servicesPreview = [
  { icon: '🦷', title: 'General Dentistry', services: ['Routine Checkups', 'Teeth Cleaning', 'Fillings', 'Gum Care'] },
  { icon: '✨', title: 'Cosmetic Dentistry', services: ['Teeth Whitening', 'Veneers', 'Smile Design'] },
  { icon: '🔧', title: 'Restorative', services: ['Crowns & Bridges', 'Dental Implants'] },
];

// ── Stats data ─────────────────────────────────────────
const stats = [
  { end: 5000, suffix: '+', label: 'Happy Patients' },
  { end: 4.9, suffix: '⭐', label: 'Star Rating', decimal: true },
  { end: 15, suffix: '+', label: 'Years Experience' },
  { end: 24, suffix: '/7', label: 'Emergency Ready' },
];

// ── StatCounter component ──────────────────────────────
function StatItem({ end, suffix, label, decimal }) {
  const numRef = useRef(null);

  useEffect(() => {
    if (!numRef.current) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: numRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = decimal
              ? obj.val.toFixed(1) + suffix
              : Math.round(obj.val) + suffix;
          }
        },
      });
    });
    return () => ctx.revert();
  }, [end, suffix, decimal]);

  return (
    <div className="text-center px-6">
      <p ref={numRef} className="font-manrope font-800 text-4xl md:text-5xl text-white mb-2">
        0{suffix}
      </p>
      <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}

// ── HOME PAGE ──────────────────────────────────────────
const Home = () => {
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnsRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const whyRef = useScrollAnimation({ selector: '.why-card', stagger: 0.1, y: 40 });
  const servicesRef = useScrollAnimation({ selector: '.service-card', stagger: 0.12, y: 50 });
  const testimonialRef = useScrollAnimation({ selector: '.testimonial-block', y: 40 });
  const ctaRef = useScrollAnimation({ selector: '.cta-content', y: 30 });

  // Hero stagger on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(heroBadgeRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power3.out' })
        .from(heroTitleRef.current, { opacity: 0, y: 70, duration: 0.9, ease: 'power4.out' }, '-=0.2')
        .from(heroSubRef.current, { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from(heroBtnsRef.current?.children, { opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.4');
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── HERO SECTION ── */}
      <section
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 40%, #E0F2FE 70%, #F0F9FF 100%)',
        }}
        aria-label="Hero section"
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container-xl pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Content */}
          <div>
            {/* Badge */}
            <div ref={heroBadgeRef} className="inline-flex items-center gap-2 bg-white border border-primary/20 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-primary text-sm font-semibold">Now Accepting New Patients</span>
            </div>

            {/* Headline */}
            <h1
              ref={heroTitleRef}
              className="font-manrope font-800 text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[1.1] mb-6"
            >
              Trusted Dental Care{' '}
              <span className="text-gradient">for the Whole Family</span>
            </h1>

            {/* Sub-headline */}
            <p
              ref={heroSubRef}
              className="font-inter text-text-muted text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Modern dentistry with gentle care, advanced technology, and a friendly team dedicated to your smile.
            </p>

            {/* CTA Buttons */}
            <div ref={heroBtnsRef} className="flex flex-wrap gap-4">
              <Link
                to="/book-appointment"
                id="hero-book-btn"
                className="bg-primary text-white px-8 py-4 rounded-pill text-base font-semibold hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-card-hover hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                Book Appointment <span>→</span>
              </Link>
              <a
                href="tel:+15125550147"
                id="hero-call-btn"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-pill text-base font-semibold hover:bg-primary hover:text-white transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>📞</span> Call Now
              </a>
            </div>

            {/* Trust micro-badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              {['✅ HIPAA Compliant', '🦷 15+ Years', '⚡ Same-Day Emergency'].map((b) => (
                <span key={b} className="text-text-muted text-sm bg-white/70 rounded-full px-3 py-1.5 border border-gray-200">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Visual card */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-glass p-8 w-80">
                <div className="text-6xl text-center mb-4">🦷</div>
                <h3 className="font-manrope font-700 text-text-primary text-center text-xl mb-2">
                  Your Smile, Our Mission
                </h3>
                <p className="text-text-muted text-sm text-center leading-relaxed">
                  From your first checkup to your perfect smile — we're here every step.
                </p>
                <div className="mt-4 flex justify-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-star text-xl">★</span>
                  ))}
                </div>
                <p className="text-text-muted text-xs text-center mt-1">4.9 from 500+ reviews</p>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
                ✓ Open Today
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white border border-gray-100 rounded-xl shadow-lg p-3 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-xs font-bold text-text-primary">Top Rated</p>
                  <p className="text-xs text-text-muted">Austin, TX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-padding bg-white" aria-label="Why choose us">
        <div ref={whyRef} className="container-xl">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Why Choose BrightSmile</p>
            <h2 className="font-manrope font-700 text-4xl md:text-5xl text-text-primary mb-4">
              Excellence in Every Visit
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              We combine years of clinical expertise with a commitment to patient comfort, utilizing the latest dental technologies.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="why-card bg-white border border-gray-100 rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-bg-light flex items-center justify-center text-2xl mb-4">
                  {card.icon}
                </div>
                <h3 className="font-manrope font-700 text-text-primary text-lg mb-2">{card.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #3573B9 50%, #0369A1 100%)' }}
        aria-label="Statistics"
      >
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/20">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section-padding bg-bg-light" aria-label="Our services">
        <div ref={servicesRef} className="container-xl">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Our Services</p>
            <h2 className="font-manrope font-700 text-4xl md:text-5xl text-text-primary mb-4">
              Comprehensive Dental Care
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              From routine cleanings to complete smile makeovers — we offer everything your family needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {servicesPreview.map((s) => (
              <div key={s.title} className="service-card">
                <ServiceCard {...s} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold border-2 border-primary px-8 py-3 rounded-pill hover:bg-primary hover:text-white transition-all duration-300"
            >
              View All Services <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED TESTIMONIAL ── */}
      <section className="section-padding bg-white" aria-label="Patient testimonial">
        <div ref={testimonialRef} className="container-xl max-w-4xl">
          <div className="testimonial-block text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-8">What Patients Say</p>
            <div className="text-6xl text-primary/20 font-serif mb-4">"</div>
            <p className="font-manrope text-2xl md:text-3xl text-text-primary font-600 leading-relaxed mb-8">
              Amazing staff and painless treatment. Best dental experience I've ever had in Austin.
            </p>
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-star text-xl">★</span>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                S
              </div>
              <div className="text-left">
                <p className="font-semibold text-text-primary">Sarah Johnson</p>
                <p className="text-text-muted text-sm">Austin, TX</p>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/testimonials" className="text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1">
                Read More Reviews →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #3573B9 0%, #38BDF8 100%)' }}
        aria-label="Call to action"
      >
        <div ref={ctaRef} className="container-xl text-center">
          <div className="cta-content">
            <h2 className="font-manrope font-800 text-4xl md:text-5xl text-white mb-4">
              Ready for a Healthier Smile?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Book your appointment today and join over 5,000 happy patients who trust BrightSmile Dental Care.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/book-appointment"
                id="cta-book-btn"
                className="bg-white text-primary px-8 py-4 rounded-pill text-base font-semibold hover:bg-bg-light transition-all duration-300 shadow-md hover:shadow-card-hover hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                Book Appointment <span>→</span>
              </Link>
              <a
                href="tel:+15125550147"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-pill text-base font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
              >
                📞 (512) 555-0147
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
