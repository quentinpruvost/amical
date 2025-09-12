// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        // Ajoute la police 'Playfair Display' sous le nom 'serif'
        // et garde 'Inter' comme police par défaut ('sans')
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'amicale-green': '#006A4E', // Personnalisez vos couleurs ici
        'amicale-light-green': '#E6F0ED',
      }
    },
  },
  plugins: [],
}