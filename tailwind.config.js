/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#06060a',
          raised: '#0c0c12',
          overlay: '#13131b',
          soft: '#1a1a24',
          elevated: '#1d1d24',
        },
        neutral: {
          50: '#f5f5f7',
          100: '#ebebef',
          200: '#d4d4dc',
          300: '#b0b0be',
          400: '#8a8a9e',
          500: '#64647a',
          600: '#4a4a5e',
          700: '#33334a',
          800: '#222236',
          900: '#15152a',
        },
        accent: {
          DEFAULT: '#10b981',
          light: '#34d399',
          bright: '#6ee7b7',
          dim: 'rgba(16, 185, 129, 0.14)',
          muted: 'rgba(16, 185, 129, 0.07)',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
        signal: {
          DEFAULT: '#34d399',
          light: '#6ee7b7',
          dim: 'rgba(52, 211, 153, 0.12)',
          glow: 'rgba(52, 211, 153, 0.2)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          hover: 'rgba(255, 255, 255, 0.12)',
          active: 'rgba(255, 255, 255, 0.18)',
          solid: '#20202a',
          strong: '#2b2b36',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        display: ['4.5rem', { lineHeight: '1.04', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-sm': ['3.25rem', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' }],
        heading: ['2.125rem', { lineHeight: '1.18', letterSpacing: '-0.025em', fontWeight: '600' }],
        subheading: ['1.3rem', { lineHeight: '1.5', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        label: ['0.7rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
        hero: ['clamp(3.25rem, 10vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'hero-display': ['clamp(3rem, 12vw, 6rem)', { lineHeight: '0.92', letterSpacing: '-0.03em', fontWeight: '700' }],
      },
      spacing: {
        section: '11rem',
        'section-sm': '7rem',
        18: '4.5rem',
        22: '5.5rem',
      },
      maxWidth: {
        content: '68rem',
        narrow: '44rem',
        '8xl': '88rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(16, 185, 129, 0.12)',
        glow: '0 0 24px rgba(16, 185, 129, 0.18)',
        'glow-lg': '0 0 48px rgba(16, 185, 129, 0.22)',
        'glow-signal': '0 0 24px rgba(52, 211, 153, 0.16)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
        elevated: 'inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -20px rgba(0,0,0,0.7)',
      },
      backgroundImage: {
        'accent-sheen': 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'trace-flow': 'traceFlow 3s linear infinite',
        'dash-flow': 'dashFlow 6s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
        sheen: 'sheen 2.4s ease-out infinite',
        'text-shine': 'textShine 4s linear infinite',
        'hero-energy': 'heroEnergyFlow 10s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
        'hero-luminosity': 'heroLuminosity 3s ease-in-out infinite',
        'runtime-pulse': 'runtimePulse 4s ease-in-out infinite',
        'ring-pulse': 'ringPulse 5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(16, 185, 129, 0.15)' },
          '50%': { boxShadow: '0 0 24px rgba(16, 185, 129, 0.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        traceFlow: {
          '0%': { strokeDashoffset: '40' },
          '100%': { strokeDashoffset: '0' },
        },
        dashFlow: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-60' },
        },
        sheen: {
          '0%': { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '250% 0' },
        },
        textShine: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        heroEnergyFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '40%': { backgroundPosition: '60% 50%' },
          '60%': { backgroundPosition: '80% 50%' },
        },
        heroLuminosity: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.15)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          },
          '50%': {
            filter: 'drop-shadow(0 0 35px rgba(16, 185, 129, 0.28)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          },
        },
        runtimePulse: {
          '0%, 100%': { opacity: '0.8', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1.05)' },
        },
        ringPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '0.7', transform: 'translate(-50%, -50%) scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
