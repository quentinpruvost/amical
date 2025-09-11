// src/routes/api/permanentes/+server.js
import { json } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    try {
        const permanentes = await sql`
            SELECT id, title, description, images, links, status
            FROM offres_permanentes
            ORDER BY id ASC;
        `;
        
        return json(permanentes);
    } catch (error) {
        console.error('Erreur lors de la récupération des offres permanentes:', error);
        return json({ error: 'Une erreur est survenue.' }, { status: 500 });
    }
}