// src/routes/offres-loisirs/+page.js
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    // On lance les deux requêtes en parallèle pour plus de performance
    const loisirsRes = fetch('/api/loisirs');
    const permanentesRes = fetch('/api/permanentes');

    // On attend les réponses et on les convertit en JSON
    const loisirs = await (await loisirsRes).json();
    const permanentes = await (await permanentesRes).json();

    // On retourne les deux listes d'offres
    return { loisirs, permanentes };
}