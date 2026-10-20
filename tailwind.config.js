/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        // MOTIVO brand tokens — single source of truth for the landing.
        // green/onyx/white/coolGray come from the brand book; surface/border/textMuted
        // are derived elevation grays for the dark UI (same pattern as the mobile app's theme.ts).
        motivo: {
          green: '#00C853',
          onyx: '#0B0B0B',
          white: '#FFFFFF',
          coolGray: '#F2F4F7',
          surface: '#151515',
          surfaceAlt: '#1C1C1C',
          border: '#2A2A2A',
          textMuted: '#9CA3AF',
        },
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientShift: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'float': 'float 5s ease-in-out infinite',
        'gradient-pulse': 'gradientShift 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
