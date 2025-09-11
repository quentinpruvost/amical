// src/routes/api/partenaires/+server.js
import { json } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    try {
        const partenaires = await sql`
            SELECT id, category, title, description, website_url
            FROM offres_partenaires
            ORDER BY category, title;
        `;
        
        // On regroupe les partenaires par catégorie pour faciliter l'affichage
        const groupedByCategory = partenaires.reduce((acc, partner) => {
            const { category } = partner;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(partner);
            return acc;
        }, {});

        return json(groupedByCategory);
    } catch (error) {
        console.error('Erreur lors de la récupération des offres partenaires:', error);
        return json({ error: 'Une erreur est survenue.' }, { status: 500 });
    }
}