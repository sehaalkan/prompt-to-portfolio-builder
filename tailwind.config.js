/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gallery: {
          ivory: '#FAF7F2',
          cream: '#F5F0E8',
          champagne: '#EDE4D8',
          warm: '#E8DDD0',
          anthracite: '#1A1A1A',
          black: '#111111',
          muted: '#6B6B6B',
          line: '#C4BCB0',
          surface: '#F0EBE3',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card-soft': '0 2px 20px rgba(62, 48, 35, 0.07), 0 1px 4px rgba(62, 48, 35, 0.04)',
        'card-focus': '0 6px 32px rgba(62, 48, 35, 0.12), 0 0 0 1px rgba(17, 17, 17, 0.08)',
        'btn-hover': '0 10px 36px rgba(17, 17, 17, 0.22)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        heroFly: 'heroFly 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        stepEnter: 'stepEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        stepExit: 'stepExit 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
        floatBadge: 'floatBadge 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        heroFly: {
          '0%': { opacity: '1', transform: 'translate(0, 0) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(-42vw, -38vh) scale(0.18)' },
        },
        stepEnter: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        stepExit: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-30px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 2px 20px rgba(62,48,35,0.06), inset 0 1px 0 rgba(255,255,255,0.5)' },
          '50%': { boxShadow: '0 6px 28px rgba(62,48,35,0.1), inset 0 1px 0 rgba(255,255,255,0.6)' },
        },
        floatBadge: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
