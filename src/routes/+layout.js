// src/routes/+layout.js
/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
    const response = await fetch('/api/accueil');
    const siteData = await response.json();
    return { siteData };
}