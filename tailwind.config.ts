// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                // On peut définir nos couleurs de marque ici pour une meilleure réutilisation
                'amicale-green': '#388e3c',
                'amicale-light-green': '#e6f7e6',
            },
        },
    },
    plugins: [],
};