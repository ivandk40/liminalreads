/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Libre Caslon Display"', '"Libre Caslon Text"', 'Caslon', 'Georgia', 'serif'],
        serif: ['"Libre Caslon Text"', 'Caslon', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ny: {
          black: '#111111',
          charcoal: '#222222',
          muted: '#666666',
          border: '#e5e5e5',
          light: '#f9f9f9',
          red: '#c02d28' // subtle classic editorial red
        }
      }
    },
  },
  plugins: [],
}
