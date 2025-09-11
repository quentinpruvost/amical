// src/routes/api/accueil/+server.js
import { json } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    try {
        const homepageContent = await sql`
            SELECT section, content FROM page_accueil;
        `;

        // Transforme le tableau en un objet plus facile à utiliser côté client
        const formattedContent = homepageContent.reduce((acc, item) => {
            acc[item.section] = item.content;
            return acc;
        }, {});

        return json(formattedContent);
    } catch (error) {
        // CORRECTION ICI : Remplacement des apostrophes par des guillemets
        console.error("Erreur lors de la récupération du contenu de la page d'accueil:", error);
        return json({ error: 'Une erreur est survenue.' }, { status: 500 });
    }
}