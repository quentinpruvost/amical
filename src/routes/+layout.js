// src/routes/+layout.js
/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
    // On charge les données du site (accueil, etc.) pour le layout
    const response = await fetch('/api/accueil');
    const siteData = await response.json();
    
    // On retourne ces données. SvelteKit les rendra disponibles pour toutes les pages.
    return { siteData };
}