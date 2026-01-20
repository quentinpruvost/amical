import { redirect } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies }) => {
        const sessionId = cookies.get('session');

        if (sessionId) {
            try {
                // Supprimer la session de la base de données
                await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
            } catch (e) {
                console.error("Erreur logout DB:", e);
            }
        }

        // Supprimer le cookie du navigateur
        cookies.delete('session', { path: '/' });
        
        // Rediriger vers la page de connexion
        throw redirect(303, '/login');
    }
};