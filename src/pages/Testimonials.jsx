import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { TestimonialCard } from '../components/ui/Card';

const allTestimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Austin, TX',
    rating: 5,
    review: "Amazing staff and painless treatment. Best dental experience I've had. Dr. Carter made me feel completely at ease from the moment I walked in.",
  },
  {
    name: 'David Miller',
    role: 'Austin, TX',
    rating: 5,
    review: 'Very professional clinic. My teeth whitening results were fantastic. I got compliments all week after my appointment. Highly recommend!',
  },
  {
    name: 'Emma Clark',
    role: 'Austin, TX',
    rating: 5,
    review: 'Clean office, friendly team, and easy online booking. They saw me within hours for an emergency. I trust BrightSmile completely.',
  },
  {
    name: 'James Rodriguez',
    role: 'Round Rock, TX',
    rating: 5,
    review: "I brought my whole family here and everyone was treated with such care. The kids actually enjoyed going to the dentist for the first time!",
  },
  {
    name: 'Priya Patel',
    role: 'Cedar Park, TX',
    rating: 5,
    review: 'My Invisalign journey has been incredible. Dr. Carter walked me through every step and the results after 8 months are beyond what I hoped for.',
  },
  {
    name: 'Michael Thompson',
    role: 'Austin, TX',
    rating: 5,
    review: 'Absolutely five-star service. From the front desk to the dentist chair, everyone was professional, warm, and efficient. My go-to dental clinic.',
  },
];

const Testimonials = () => {
  const heroRef = useRef(null);
  const cardsRef = useScrollAnimation({ selector: '.review-card', stagger: 0.1, y: 50 });
  const statsRef = useScrollAnimation({ selector: '.stat-item', stagger: 0.12, y: 30 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current?.querySelectorAll('.hero-el'), {
        opacity: 0, y: 60, duration: 0.9, stagger: 0.2, ease: 'power4.out', delay: 0.2,
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
          <p className="hero-el text-primary text-sm font-semibold uppercase tracking-wider mb-4">Patient Stories</p>
          <h1 className="hero-el font-manrope font-800 text-5xl md:text-6xl text-text-primary mb-6">
            What Our <span className="text-gradient">Patients Say</span>
          </h1>
          <p className="hero-el text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Don't just take our word for it — hear from the thousands of Austin families who trust BrightSmile Dental Care.
          </p>
          {/* Overall rating */}
          <div className="hero-el inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-card mt-8 border border-gray-100">
            <div>
              <p className="font-manrope font-800 text-4xl text-text-primary">4.9</p>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-star text-sm">★</span>
                ))}
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-left">
              <p className="font-semibold text-text-primary">Overall Rating</p>
              <p className="text-text-muted text-sm">Based on 500+ reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div ref={statsRef} className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5,000+', label: 'Happy Patients' },
              { value: '4.9⭐', label: 'Average Rating' },
              { value: '500+', label: 'Reviews Written' },
              { value: '98%', label: 'Would Recommend' },
            ].map((s) => (
              <div key={s.label} className="stat-item">
                <p className="font-manrope font-800 text-3xl text-primary mb-1">{s.value}</p>
                <p className="text-text-muted text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS GRID ── */}
      <section className="section-padding bg-bg-light">
        <div ref={cardsRef} className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTestimonials.map((review) => (
              <div key={review.name} className="review-card">
                <TestimonialCard {...review} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAVE A REVIEW ── */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-3xl text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Share Your Experience</p>
          <h2 className="font-manrope font-700 text-3xl text-text-primary mb-4">
            Love BrightSmile? Let Others Know!
          </h2>
          <p className="text-text-muted mb-8 leading-relaxed">
            Your review helps other families in Austin find the dental care they deserve.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border-2 border-gray-200 text-text-primary px-6 py-3 rounded-pill font-semibold hover:border-primary hover:text-primary transition-all duration-300 shadow-sm"
            >
              <span>⭐</span> Review on Google
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border-2 border-gray-200 text-text-primary px-6 py-3 rounded-pill font-semibold hover:border-primary hover:text-primary transition-all duration-300 shadow-sm"
            >
              <span>👍</span> Review on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #3573B9 0%, #38BDF8 100%)' }}
      >
        <div className="container-xl text-center">
          <h2 className="font-manrope font-800 text-4xl text-white mb-4">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Join over 5,000 happy patients. Book your appointment today.
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

export default Testimonials;
