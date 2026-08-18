/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      },
      colors: {
        k: {
          bg:        '#15171a',
          surface:   '#24262b',
          elevated:  '#363940',
          primary:   '#f8fafc',
          secondary: '#cdd5df',
          muted:     '#9da4ae',
          purple:    '#8b5cf6',
          'purple-dim': '#320f50',
          'purple-light': '#c896ff',
          green:     '#22c55e',
          red:       '#ef4444',
          amber:     '#f59e0b',
          border:    '#363940',
        },
      },
      borderRadius: {
        'k-sm':   '8px',
        'k-md':   '12px',
        'k-lg':   '16px',
        'k-xl':   '20px',
        'k-2xl':  '24px',
      },
    },
  },
  plugins: [],
}
