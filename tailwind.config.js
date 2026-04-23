/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3573B9',
          dark: '#0369A1',
          light: '#38BDF8',
        },
        accent: '#38BDF8',
        'bg-light': '#F0F9FF',
        'bg-white': '#FFFFFF',
        'text-primary': '#1E293B',
        'text-muted': '#64748B',
        'star': '#FACC15',
        neutral: '#3B4953',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        input: '8px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.06)',
        'card-hover': '0px 10px 30px rgba(3, 105, 161, 0.12)',
        glass: '0 8px 32px rgba(53, 115, 185, 0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
