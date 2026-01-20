import { guard } from '$lib/server/security';

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
    // ⚠️ IMPORTANT : On ajoute 'await' ici car guard fait une requête DB maintenant
    await guard(event); 
    
    return {};
}