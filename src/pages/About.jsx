import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const heroRef = useRef(null);
  const storyRef = useScrollAnimation({ selector: '.story-el', stagger: 0.15, y: 40 });
  const teamRef = useScrollAnimation({ selector: '.team-card', y: 50 });
  const valuesRef = useScrollAnimation({ selector: '.value-card', stagger: 0.1, y: 40 });

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

  const values = [
    { icon: '❤️', title: 'Patient First', desc: 'Every decision we make centers on patient comfort, safety, and satisfaction.' },
    { icon: '🔬', title: 'Clinical Excellence', desc: 'We invest continuously in training and the latest dental technology.' },
    { icon: '🤝', title: 'Trust & Transparency', desc: 'Clear communication and honest recommendations — always.' },
    { icon: '🌱', title: 'Preventive Care', desc: 'We believe the best treatment is preventing problems before they start.' },
    { icon: '👨‍👩‍👧', title: 'Family-Centered', desc: 'From toddlers to seniors, we provide care for every member of your family.' },
    { icon: '💡', title: 'Continuous Innovation', desc: 'Staying current with the latest advances in dental science and technology.' },
  ];

  return (
    <main>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #F0F9FF 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container-xl max-w-3xl text-center">
          <p className="hero-el text-primary text-sm font-semibold uppercase tracking-wider mb-4">About Us</p>
          <h1 className="hero-el font-manrope font-800 text-5xl md:text-6xl text-text-primary mb-6 leading-tight">
            About BrightSmile<br />
            <span className="text-gradient">Dental Care</span>
          </h1>
          <p className="hero-el text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            At BrightSmile Dental Care, we believe every patient deserves comfortable, personalized treatment in a welcoming environment.
          </p>
        </div>
      </section>

      {/* ── CLINIC STORY ── */}
      <section className="section-padding bg-white">
        <div ref={storyRef} className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="story-el text-primary text-sm font-semibold uppercase tracking-wider mb-3">Our Story</p>
              <h2 className="story-el font-manrope font-700 text-4xl text-text-primary mb-6">
                15+ Years of Caring for Austin Families
              </h2>
              <p className="story-el text-text-muted text-lg leading-relaxed mb-6">
                At BrightSmile Dental Care, we believe every patient deserves comfortable, personalized treatment in a welcoming environment. Our mission is to help families achieve lifelong oral health through preventive care, cosmetic dentistry, and advanced treatments.
              </p>
              <p className="story-el text-text-muted leading-relaxed mb-8">
                Led by experienced dentists and caring staff, we make every visit stress-free. Since opening our doors in Austin, Texas, we've built lasting relationships with over 5,000 patients who trust us with their smiles.
              </p>
              <div className="story-el flex flex-wrap gap-4">
                <Link
                  to="/book-appointment"
                  className="bg-primary text-white px-6 py-3 rounded-pill font-semibold hover:bg-primary-dark transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  Book Appointment
                </Link>
                <a
                  href="tel:+15125550147"
                  className="border-2 border-primary text-primary px-6 py-3 rounded-pill font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  📞 Call Us
                </a>
              </div>
            </div>
            {/* Visual side */}
            <div className="story-el grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white text-center col-span-2">
                <p className="font-manrope font-800 text-5xl mb-2">5,000+</p>
                <p className="text-blue-100 font-medium">Happy Patients Served</p>
              </div>
              <div className="bg-bg-light rounded-2xl p-6 text-center">
                <p className="font-manrope font-800 text-3xl text-primary mb-1">15+</p>
                <p className="text-text-muted text-sm">Years Experience</p>
              </div>
              <div className="bg-bg-light rounded-2xl p-6 text-center">
                <p className="font-manrope font-800 text-3xl text-primary mb-1">4.9⭐</p>
                <p className="text-text-muted text-sm">Average Rating</p>
              </div>
              <div className="bg-bg-light rounded-2xl p-6 text-center col-span-2">
                <p className="font-manrope font-800 text-2xl text-primary mb-1">Same-Day</p>
                <p className="text-text-muted text-sm">Emergency Appointments Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEET THE DENTIST ── */}
      <section className="section-padding bg-bg-light">
        <div ref={teamRef} className="container-xl max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Our Team</p>
            <h2 className="font-manrope font-700 text-4xl text-text-primary">Meet Our Lead Dentist</h2>
          </div>
          <div className="team-card bg-white rounded-3xl shadow-card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Photo placeholder */}
              <div
                className="h-80 md:h-auto flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' }}
              >
                <div className="text-center">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-6xl font-bold mx-auto mb-4 shadow-lg">
                    MC
                  </div>
                  <div className="flex justify-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="text-star text-lg">★</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="p-10 flex flex-col justify-center">
                <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Lead Dentist</p>
                <h3 className="font-manrope font-800 text-3xl text-text-primary mb-1">Dr. Michael Carter</h3>
                <p className="text-text-muted font-medium mb-6">DDS — Doctor of Dental Surgery</p>
                <p className="text-text-muted leading-relaxed mb-6">
                  With over 15 years of experience in cosmetic and family dentistry, Dr. Carter is passionate about transforming smiles and improving quality of life for patients of all ages.
                </p>
                {/* Specialties */}
                <div className="mb-6">
                  <p className="font-semibold text-text-primary text-sm mb-3">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Smile Makeovers', 'Dental Implants', 'Invisalign', 'Preventive Care'].map((s) => (
                      <span key={s} className="bg-bg-light text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span>📍 Austin, Texas</span>
                  <span>🎓 UT Dental School</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section-padding bg-white">
        <div ref={valuesRef} className="container-xl">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Our Values</p>
            <h2 className="font-manrope font-700 text-4xl text-text-primary">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="value-card bg-bg-light rounded-card p-6 hover:bg-white hover:shadow-card transition-all duration-300">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-manrope font-700 text-text-primary text-lg mb-2">{v.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{v.desc}</p>
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
          <h2 className="font-manrope font-800 text-4xl text-white mb-4">Ready to Meet Our Team?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Schedule a consultation with Dr. Carter and experience BrightSmile Dental Care for yourself.
          </p>
          <Link
            to="/book-appointment"
            className="bg-white text-primary px-8 py-4 rounded-pill font-semibold hover:bg-bg-light transition-all duration-300 shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            Book a Consultation <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
