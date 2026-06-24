import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        card: '#1A1A1A',
        border: '#2D2D2D',
        accent: '#FFFFFF',
        muted: '#888888',
        danger: '#FF3B3B',
        success: '#00C853',
        warning: '#FFB300',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(64px,10vw,128px)', { lineHeight: '0.95', fontWeight: '900', letterSpacing: '-0.04em' }],
        headline: ['clamp(40px,6vw,72px)', { lineHeight: '1.0', fontWeight: '900', letterSpacing: '-0.03em' }],
        title: ['clamp(28px,4vw,48px)', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        label: ['11px', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.12em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
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

export default config
