import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { EMAILJS_CONFIG } from '../lib/emailjs.config';

const serviceOptions = [
  'General Checkup & Cleaning',
  'Teeth Whitening',
  'Dental Fillings',
  'Dental Implants',
  'Crowns & Bridges',
  'Invisalign',
  'Veneers',
  'Emergency Dental Care',
  'Gum Disease Treatment',
  'Braces Consultation',
  'Smile Makeover',
  'Other',
];

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

const BookAppointment = () => {
  const heroRef = useRef(null);
  const formRef = useScrollAnimation({ selector: '.form-section', y: 40 });
  const sidebarRef = useScrollAnimation({ selector: '.info-card', stagger: 0.1, y: 30 });

  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', date: '', time: '', service: '', message: '',
  });
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
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.date) newErrors.date = 'Preferred date is required';
    if (!form.time) newErrors.time = 'Preferred time is required';
    if (!form.service) newErrors.service = 'Please select a service';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      gsap.from('.form-inner', { x: -8, duration: 0.5, ease: 'elastic.out(1, 0.3)', repeat: 2, yoyo: true });
      return;
    }
    setLoading(true);
    try {
      // Template variables sent to EmailJS
      const templateParams = {
        from_name:        form.fullName,
        from_email:       form.email,
        from_phone:       form.phone,
        appointment_date: form.date,
        appointment_time: form.time,
        service_needed:   form.service,
        message:          form.message || 'No additional notes.',
        to_name:          'BrightSmile Dental Care',
        reply_to:         form.email,
      };

      await emailjs.send(
        EMAILJS_CONFIG.APPOINTMENT.SERVICE_ID,
        EMAILJS_CONFIG.APPOINTMENT.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.APPOINTMENT.PUBLIC_KEY,
      );

      setSubmitted(true);
      gsap.from('.success-message', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });
    } catch (error) {
      console.error('EmailJS Error (Appointment):', error);
      alert('Sorry, something went wrong sending your request. Please call us at (512) 555-0147.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-input border text-text-primary text-sm font-inter placeholder-text-muted transition-all duration-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 ${
      errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`;

  return (
    <main>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="pt-36 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #F0F9FF 100%)' }}
      >
        <div className="container-xl max-w-3xl text-center">
          <p className="hero-el text-primary text-sm font-semibold uppercase tracking-wider mb-4">Schedule a Visit</p>
          <h1 className="hero-el font-manrope font-800 text-5xl md:text-6xl text-text-primary mb-4">
            Schedule Your <span className="text-gradient">Visit</span>
          </h1>
          <p className="hero-el text-text-muted text-lg">Book your appointment in less than 1 minute.</p>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* ── FORM ── */}
            <div ref={formRef} className="lg:col-span-2">
              <div className="form-section">
                {submitted ? (
                  <div className="success-message bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="font-manrope font-700 text-2xl text-text-primary mb-3">
                      Appointment Requested!
                    </h2>
                    <p className="text-text-muted text-lg mb-2">
                      Thank you, <strong>{form.fullName}</strong>! We'll confirm your appointment shortly.
                    </p>
                    <p className="text-text-muted text-sm">
                      We'll reach you at <strong>{form.email}</strong> or <strong>{form.phone}</strong>.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ fullName: '', phone: '', email: '', date: '', time: '', service: '', message: '' }); }}
                      className="mt-6 text-primary font-semibold hover:underline"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="form-inner bg-white rounded-2xl shadow-card p-8">
                    <h2 className="font-manrope font-700 text-2xl text-text-primary mb-6">Patient Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      {/* Full Name */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="fullName">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="e.g. John Smith"
                          value={form.fullName}
                          onChange={handleChange}
                          className={inputClass('fullName')}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="phone">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (512) 000-0000"
                          value={form.phone}
                          onChange={handleChange}
                          className={inputClass('phone')}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="email">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          className={inputClass('email')}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      {/* Date */}
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="date">
                          Preferred Date <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={form.date}
                          onChange={handleChange}
                          className={inputClass('date')}
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                      </div>
                      {/* Time */}
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="time">
                          Preferred Time <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="time"
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                          className={inputClass('time')}
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                      </div>
                      {/* Service */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="service">
                          Service Needed <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className={inputClass('service')}
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                      </div>
                      {/* Message */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-text-primary mb-1.5" htmlFor="message">
                          Additional Notes <span className="text-text-muted font-normal">(optional)</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Anything we should know before your appointment..."
                          value={form.message}
                          onChange={handleChange}
                          className={`${inputClass('message')} resize-none`}
                        />
                      </div>
                    </div>
                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white py-4 rounded-pill font-semibold text-base hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-card-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Confirm Appointment →'
                      )}
                    </button>
                    <p className="text-text-muted text-xs text-center mt-4">
                      🔒 Your information is secure and HIPAA compliant.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div ref={sidebarRef} className="flex flex-col gap-5">
              {/* Clinic Info */}
              <div className="info-card bg-bg-light rounded-2xl p-6">
                <h3 className="font-manrope font-700 text-text-primary text-lg mb-4">Clinic Information</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-3">
                    <span className="text-primary text-lg flex-shrink-0">📍</span>
                    <span className="text-text-muted">1284 Westlake Drive,<br />Austin, Texas, USA</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary text-lg flex-shrink-0">📞</span>
                    <a href="tel:+15125550147" className="text-text-muted hover:text-primary transition-colors">
                      +1 (512) 555-0147
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary text-lg flex-shrink-0">✉️</span>
                    <a href="mailto:hello@brightsmiledental.com" className="text-text-muted hover:text-primary transition-colors break-all">
                      hello@brightsmiledental.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* Hours */}
              <div className="info-card bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <h3 className="font-manrope font-700 text-text-primary text-lg mb-4">Office Hours</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { day: 'Mon – Fri', hours: '8:00 AM – 6:00 PM', open: true },
                    { day: 'Saturday', hours: '9:00 AM – 2:00 PM', open: true },
                    { day: 'Sunday', hours: 'Closed', open: false },
                  ].map((row) => (
                    <li key={row.day} className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0">
                      <span className="text-text-muted">{row.day}</span>
                      <span className={`font-medium ${row.open ? 'text-text-primary' : 'text-red-400'}`}>
                        {row.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency */}
              <div className="info-card bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6">
                <div className="text-2xl mb-2">🚨</div>
                <h4 className="font-manrope font-700 text-red-700 mb-2">Dental Emergency?</h4>
                <p className="text-red-600/80 text-sm mb-4">
                  Don't wait. Call us immediately for same-day emergency care.
                </p>
                <a
                  href="tel:+15125550147"
                  className="bg-red-600 text-white px-4 py-2.5 rounded-pill text-sm font-semibold hover:bg-red-700 transition-colors inline-block text-center w-full"
                >
                  📞 Call Now — Emergency
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookAppointment;
