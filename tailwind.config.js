/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saharaTerracotta: {
          300: '#f0a878',
          400: '#e07a3f',
          500: '#c2652a',
          600: '#9e4e1c',
        },
        sandLinen: '#faf5ee',
        sandSurface: '#f3ede2',
        sandMuted: '#d8d0c8',
        dustyRose: '#8c3c3c',
        deepNavy: '#0c0a09',
        panelDark: '#1c1917',
        panelDarkHover: '#292524',
        amberSilicon: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        emeraldVerified: {
          400: '#34d399',
          500: '#10b981',
        },
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'sahara-soft': '0 2px 16px rgba(58, 48, 42, 0.04)',
        'sahara-card': '0 4px 20px rgba(58, 48, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
