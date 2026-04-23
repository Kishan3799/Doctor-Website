import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { EMAILJS_CONFIG } from '../lib/emailjs.config';

const Contact = () => {
  const heroRef = useRef(null);
  const infoRef = useScrollAnimation({ selector: '.contact-card', stagger: 0.12, y: 40 });
  const formRef = useScrollAnimation({ selector: '.contact-form', y: 50 });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current?.querySelectorAll('.hero-el'), {
        opacity: 0, y: 60, duration: 0.9, stagger: 0.2, ease: 'power4.out', delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      // Template variables sent to EmailJS
      const templateParams = {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject,
        message:    form.message,
        to_name:    'BrightSmile Dental Care',
        reply_to:   form.email,
      };

      await emailjs.send(
        EMAILJS_CONFIG.CONTACT.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.CONTACT.PUBLIC_KEY,
      );

      setSubmitted(true);
      gsap.from('.success-box', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });
    } catch (error) {
      console.error('EmailJS Error (Contact):', error);
      alert('Sorry, something went wrong. Please email us directly at hello@brightsmiledental.com');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-input border text-text-primary text-sm placeholder-text-muted transition-all duration-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 ${
      errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`;

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      lines: ['1284 Westlake Drive', 'Austin, Texas, USA'],
      link: null,
    },
    {
      icon: '📞',
      title: 'Call Us',
      lines: ['+1 (512) 555-0147'],
      link: 'tel:+15125550147',
    },
    {
      icon: '✉️',
      title: 'Email Us',
      lines: ['hello@brightsmiledental.com'],
      link: 'mailto:hello@brightsmiledental.com',
    },
  ];

  return (
    <main>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="pt-36 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #F0F9FF 100%)' }}
      >
        <div className="container-xl max-w-3xl text-center">
          <p className="hero-el text-primary text-sm font-semibold uppercase tracking-wider mb-4">Get In Touch</p>
          <h1 className="hero-el font-manrope font-800 text-5xl md:text-6xl text-text-primary mb-6">
            Contact <span className="text-gradient">BrightSmile</span>
          </h1>
          <p className="hero-el text-text-muted text-lg leading-relaxed">
            We're here to help. Reach out with any questions, or just say hello!
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div ref={infoRef} className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="contact-card text-center bg-bg-light rounded-2xl p-8 hover:bg-white hover:shadow-card transition-all duration-300"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="font-manrope font-700 text-text-primary text-lg mb-3">{info.title}</h3>
                {info.lines.map((line, i) => (
                  info.link ? (
                    <a
                      key={i}
                      href={info.link}
                      className="block text-primary font-medium hover:text-primary-dark transition-colors"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={i} className="text-text-muted">{line}</p>
                  )
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP + FORM ── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div>
              <h2 className="font-manrope font-700 text-2xl text-text-primary mb-2">Find Us</h2>
              <p className="text-text-muted text-sm mb-5">1284 Westlake Drive, Austin, Texas, USA</p>
              <div className="rounded-2xl overflow-hidden shadow-card border border-gray-100 h-80 md:h-96">
                <iframe
                  title="BrightSmile Dental Care Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?q=Austin+Texas&output=embed"
                  aria-label="Google Maps location of BrightSmile Dental Care in Austin, Texas"
                />
              </div>
              {/* Hours */}
              <div className="mt-6 bg-bg-light rounded-2xl p-6">
                <h3 className="font-manrope font-700 text-text-primary mb-4">Opening Hours</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM', open: true },
                    { day: 'Saturday', hours: '9:00 AM – 2:00 PM', open: true },
                    { day: 'Sunday', hours: 'Closed', open: false },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between pb-2 border-b border-gray-200 last:border-0">
                      <span className="text-text-muted">{row.day}</span>
                      <span className={`font-medium ${row.open ? 'text-text-primary' : 'text-red-400'}`}>
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={formRef}>
              {submitted ? (
                <div className="contact-form bg-green-50 border border-green-200 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="font-manrope font-700 text-2xl text-text-primary mb-3">Message Sent!</h2>
                  <p className="text-text-muted mb-6">Thank you for reaching out. We'll reply to <strong>{form.email}</strong> within 1 business day.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="text-primary font-semibold hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form bg-white rounded-2xl shadow-card p-8 border border-gray-100">
                  <h2 className="font-manrope font-700 text-2xl text-text-primary mb-6">Send a Message</h2>
                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="contact-name">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="contact-email">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="contact-subject">
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        placeholder="How can we help you?"
                        value={form.subject}
                        onChange={handleChange}
                        className={inputClass('subject')}
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>
                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="contact-message">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder="Tell us more..."
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputClass('message')} resize-none`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white py-4 rounded-pill font-semibold hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-card-hover hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending...
                        </>
                      ) : 'Send Message →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
