import { json } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

// Vérifiez que la variable d'environnement est bien définie
if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in environment variables');
}

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    try {
        const loisirs = await sql`
            -- La requête est mise à jour pour correspondre aux colonnes de la table
            -- (id, title, description, images, links, status)
            SELECT id, title, description, images, links, status
            FROM loisirs_v2
            ORDER BY id ASC;
        `;
        
        return json(loisirs);
    } catch (error) {
        console.error('Erreur lors de la récupération des loisirs:', error);
        return json({ error: 'Une erreur est survenue lors du chargement des données.' }, { status: 500 });
    }
}