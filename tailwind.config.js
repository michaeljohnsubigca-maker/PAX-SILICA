/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        deepNavy: '#050a18',
        surfaceObsidian: '#0a1226',
        panelBase: '#0d1730',
        panelHover: '#142245',
        electricBlue: {
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        cyanGlow: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#06b6d4',
          600: '#0891b2',
        },
        frostWhite: {
          50: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
        },
        // Backward compatibility mappings to Blue & White Palette
        saharaTerracotta: {
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        siliconAmber: {
          300: '#bae6fd',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        sandOchre: {
          100: '#ffffff',
          200: '#f8fafc',
          300: '#e2e8f0',
          400: '#cbd5e1',
        },
        telemetryEmerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        hazardRose: {
          400: '#f87171',
          500: '#ef4444',
        },
        primary: '#3b82f6',
        'primary-container': '#2563eb',
      },
      fontFamily: {
        display: ['"Manrope"', 'sans-serif'],
        sans: ['"Manrope"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        headline: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -4px rgba(59, 130, 246, 0.55)',
        'glow-cyan': '0 0 20px -3px rgba(56, 189, 248, 0.45)',
        'glow-white': '0 0 20px -3px rgba(255, 255, 255, 0.35)',
        'glow-sahara': '0 0 25px -4px rgba(59, 130, 246, 0.55)',
        'glow-amber': '0 0 20px -3px rgba(56, 189, 248, 0.45)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.45)',
        'glass-elevated': '0 24px 48px -12px rgba(2, 6, 23, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 0 24px -4px rgba(59, 130, 246, 0.2)',
        'glass-panel': '0 20px 40px -10px rgba(2, 6, 23, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
};
