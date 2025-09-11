// src/routes/offres-partenaires/+page.js
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const response = await fetch('/api/partenaires');
    const partnersByCategory = await response.json();
    return { partnersByCategory };
}