// ─────────────────────────────────────────────────────────
//  EmailJS Configuration
//  Replace the placeholder values below with your real
//  credentials from https://www.emailjs.com/
// ─────────────────────────────────────────────────────────

export const EMAILJS_CONFIG = {
  // ── Appointment Form (Book Appointment page) ──────────
  APPOINTMENT: {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_APPOINTMENT_SERVICE_ID,        // e.g. 'service_abc123'
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_APPOINTMENT_TEMPLATE_ID, // e.g. 'template_appt01'
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_APPOINTMENT_PUBLIC_KEY,        // e.g. 'ABCdefGHIjkl_XYZ'
  },

  // ── Contact Form (Contact page) ───────────────────────
  CONTACT: {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_CONTACT_SERVICE_ID,        // Same service is fine
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,     // e.g. 'template_contact01'
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_CONTACT_PUBLIC_KEY,        // Same public key
  },
};
