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
          50: '#f0f5fa',
          100: '#e1ebf5',
          200: '#c3d7eb',
          300: '#a5c3e1',
          400: '#699cd0',
          500: '#2d75bf', /* Royal Blue */
          600: '#2869ac',
          700: '#22588f',
          800: '#1b4673',
          900: '#16395e',
          950: '#0e2339',
        },
        slate: {
          50: '#f8fafc', /* Pristine White */
          100: '#f1f5f9',
          850: '#1e293b',
          900: '#0f172a',
          950: '#020617',
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
        'glass-light': 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))',
      }
    },
  },
  plugins: [],
}
