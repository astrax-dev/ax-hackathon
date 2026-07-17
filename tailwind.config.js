// #genai
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'astrax': {
          black: '#0B0E11',
          dark: '#0E1116',
          card: '#12161B',
          border: '#1E2329',

          muted: '#7A828E',
          light: '#C9CED6',
          white: '#F0F3F6',

          accent: '#3B82F6',
          'accent-light': '#60A5FA',
          'accent-dark': '#2563EB',

          violet: '#7C6AEF',
          'violet-light': '#9D8DF7',

          rose: '#E879A9',
          'rose-light': '#F49CBF',
        }
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
