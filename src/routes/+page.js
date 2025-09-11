// src/routes/+page.js
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const response = await fetch('/api/accueil');
    const homepageData = await response.json();
    return { homepageData };
}