// src/routes/offres-loisirs/+page.js
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const loisirsRes = fetch('/api/loisirs');
    const permanentesRes = fetch('/api/permanentes');

    const loisirs = await (await loisirsRes).json();
    const permanentes = await (await permanentesRes).json();

    // Cette page retourne SES propres données
    return { loisirs, permanentes };
}