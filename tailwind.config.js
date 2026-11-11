/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        deepNavy: '#0c0a09',
        surfaceObsidian: '#141210',
        panelBase: '#1c1917',
        panelHover: '#292524',
        saharaTerracotta: {
          300: '#f0a878',
          400: '#e07a3f',
          500: '#c2652a',
          600: '#9e4e1c',
        },
        siliconAmber: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        sandOchre: {
          100: '#fff7ed',
          200: '#ffedd5',
          300: '#fed7aa',
          400: '#fdba74',
        },
        telemetryEmerald: {
          400: '#6ee7b7',
          500: '#10b981',
          600: '#059669',
        },
        hazardRose: {
          400: '#fb7185',
          500: '#e11d48',
        },
        primary: '#c2652a',
        'primary-container': '#e08850',
      },
      fontFamily: {
        display: ['"EB Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        headline: ['"EB Garamond"', 'serif'],
        serif: ['"EB Garamond"', 'serif'],
      },
      boxShadow: {
        'glow-sahara': '0 0 25px -4px rgba(194, 101, 42, 0.45)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.35)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
        'glass-elevated': '0 24px 48px -12px rgba(0,0,0,0.9), inset 0 1px 0 rgba(254, 215, 170, 0.15)',
      },
    },
  },
  plugins: [],
};
