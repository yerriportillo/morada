import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Platform palette (core)
        'ocean-blue': '#1A6B8A',
        'volcanic-black': '#1C1C1A',
        'sand-white': '#FAF8F3',
        'pacific-mist': '#E8F4F8',
        'sunset-coral': '#E07050',
        'indigo-deep': '#2D3561',

        // Semantic colors
        success: '#2D7D5A',
        warning: '#C8873A',
        error: '#B83B3B',
        info: '#1A6B8A',

        // WhatsApp green (fixed, never change)
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        // 8px base unit system
        '0.5': '2px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(28, 28, 26, 0.08)',
        'md': '0 4px 12px rgba(28, 28, 26, 0.10)',
        'lg': '0 8px 24px rgba(28, 28, 26, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config
