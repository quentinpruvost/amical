import { redirect } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

const sql = neon(env.DATABASE_URL);

/**
 * Vérifie si la session est valide en base de données
 * @param {import('@sveltejs/kit').RequestEvent} event 
 */
export async function guard(event) {
    const sessionId = event.cookies.get('session');

    // 1. Si pas de cookie, dehors direct
    if (!sessionId) {
        throw redirect(303, '/login');
    }

    try {
        // 2. On vérifie si cet ID existe en base ET n'est pas expiré
        const result = await sql`
            SELECT id FROM sessions 
            WHERE id = ${sessionId} 
            AND expires_at > NOW()
        `;

        // 3. Si aucune ligne trouvée, la session est fausse ou expirée
        if (result.length === 0) {
            // Optionnel : On nettoie le cookie invalide
            event.cookies.delete('session', { path: '/' });
            throw redirect(303, '/login');
        }

        // Si on arrive ici, c'est que c'est bon !

} catch (error) {
        // CORRECTION : On dit à TS de traiter 'error' comme 'any' pour accéder à .status
        if (/** @type {any} */(error).status === 303) {
            throw error;
        }
        
        // En cas d'erreur DB, par sécurité, on redirige vers le login
        console.error("Erreur sécu:", error);
        throw redirect(303, '/login');
    }
}