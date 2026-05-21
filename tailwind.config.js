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
          DEFAULT: '#030303',
          deep:    '#050505',
          green:   '#060807',
          raised:  '#0D0D0D',
          overlay: '#121212',
          soft:    '#1C1C1E',
          elevated:'#1e1e24',
        },
        green: {
          dark:    '#07100D',
          mid:     '#0A1511',
          deep:    '#0F2A20',
          rich:    '#123C2D',
        },
        amber: {
          DEFAULT: '#F59E0B',
          dark:    '#D97706',
          copper:  '#B45309',
          dim:     'rgba(245, 158, 11, 0.10)',
          glow:    'rgba(245, 158, 11, 0.22)',
          muted:   'rgba(245, 158, 11, 0.06)',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light:   '#FBBF24',
          bright:  '#FCD34D',
          dim:     'rgba(245, 158, 11, 0.10)',
          muted:   'rgba(245, 158, 11, 0.06)',
          glow:    'rgba(245, 158, 11, 0.22)',
        },
        success: {
          DEFAULT: '#22C55E',
          dim:     'rgba(34, 197, 94, 0.10)',
          glow:    'rgba(34, 197, 94, 0.20)',
        },
        danger: {
          DEFAULT: '#EF4444',
          dim:     'rgba(239, 68, 68, 0.10)',
        },
        neutral: {
          50:  '#f4f4f5',
          100: '#e4e4e7',
          200: '#d4d4d8',
          300: '#a1a1aa',
          400: '#71717a',
          500: '#52525b',
          600: '#3f3f46',
          700: '#27272a',
          800: '#18181b',
          900: '#0f0f12',
        },
        text: {
          primary:   '#F4F7F3',
          secondary: '#E6EFE9',
          muted:     '#9BAAA1',
          dim:       '#A8B3AC',
          faint:     '#5C6B63',
        },
        border: {
          DEFAULT:  'rgba(255, 255, 255, 0.06)',
          hover:    'rgba(255, 255, 255, 0.12)',
          active:   'rgba(255, 255, 255, 0.18)',
          solid:    '#1f1f26',
          strong:   '#2a2a34',
          amber:    'rgba(245, 158, 11, 0.20)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        'hero-xl': ['5.5rem', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'hero-lg': ['4.5rem', { lineHeight: '0.96', letterSpacing: '-0.025em', fontWeight: '700' }],
        'hero-md': ['3.5rem', { lineHeight: '0.98', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.0', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading':  ['2rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subheading': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body':    ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label':   ['0.68rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '700' }],
      },
      spacing: {
        section: '10rem',
        'section-sm': '6.5rem',
        18: '4.5rem',
        22: '5.5rem',
      },
      maxWidth: {
        content: '68rem',
        narrow: '42rem',
        '8xl': '88rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      transitionTimingFunction: {
        'out-expo':  'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        soft:        'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'glow-amber-sm': '0 0 10px rgba(245, 158, 11, 0.10)',
        'glow-amber':    '0 0 20px rgba(245, 158, 11, 0.16)',
        'glow-amber-lg': '0 0 40px rgba(245, 158, 11, 0.20)',
        'glow-green-sm': '0 0 10px rgba(34, 197, 94, 0.10)',
        'glow-green':    '0 0 20px rgba(34, 197, 94, 0.16)',
        'inner-light':   'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      },
      animation: {
        'fade-in':     'fadeIn 0.6s ease-out forwards',
        'fade-in-up':  'fadeInUp 0.6s ease-out forwards',
        'pulse-soft':  'pulseSoft 3s ease-in-out infinite',
        'pulse-amber': 'pulseAmber 2.5s ease-in-out infinite',
        'scan':        'scan 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.7' },
        },
        pulseAmber: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      },
    },
  },
  plugins: [],
}
