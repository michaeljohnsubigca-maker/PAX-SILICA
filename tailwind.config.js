/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--color-paper)',
          2: 'var(--color-paper-2)',
          3: 'var(--color-paper-3)',
          scrim: 'var(--color-paper-scrim)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
          2: 'var(--color-ink-2)',
        },
        muted: 'var(--color-muted)',
        rule: {
          DEFAULT: 'var(--color-rule)',
          2: 'var(--color-rule-2)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          2: 'var(--color-accent-2)',
          ink: 'var(--color-accent-ink)',
        },
        focus: 'var(--color-focus)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-body)'],
        body: ['var(--font-body)'],
      },
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: '1.35' }],
        sm: ['var(--text-sm)', { lineHeight: '1.45' }],
        base: ['var(--text-md)', { lineHeight: '1.45' }],
        lg: ['var(--text-lg)', { lineHeight: '1.25' }],
        xl: ['var(--text-xl)', { lineHeight: '1.15' }],
        '2xl': ['var(--text-2xl)', { lineHeight: '1.1' }],
        '3xl': ['var(--text-3xl)', { lineHeight: '1.05' }],
        section: ['var(--text-section)', { lineHeight: '1.15' }],
        display: ['var(--text-display)', { lineHeight: '1.06' }],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
    },
  },
  plugins: [],
};
