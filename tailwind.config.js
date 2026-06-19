/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#d4af37', /* Classic Gold */
          600: '#b5952f',
          700: '#967b27',
          800: '#78621f',
          900: '#5a4917',
          950: '#3c310f',
        },
        slate: {
          850: '#141b2d',
          900: '#0f172a',
          950: '#020617', /* Deep Obsidian */
          975: '#010409',
        },
        accent: {
          500: '#f59e0b', /* Amber */
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      }
    },
  },
  plugins: [],
}
