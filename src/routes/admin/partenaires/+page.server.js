import { fail, redirect } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const partners = await sql`SELECT * FROM offres_partenaires ORDER BY category, title`;
        return { partners };
    } catch (error) {
        console.error("Erreur de chargement des partenaires:", error);
        return { partners: [], error: "Impossible de charger les partenaires." };
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        
        const partnerData = {
            title: data.get('title')?.toString() ?? '',
            description: data.get('description')?.toString() ?? '',
            category: data.get('category')?.toString() ?? '',
            website_url: data.get('website_url')?.toString() ?? null
        };

        try {
            if (id) {
                // Modification
                await sql`UPDATE offres_partenaires SET title = ${partnerData.title}, description = ${partnerData.description}, category = ${partnerData.category}, website_url = ${partnerData.website_url} WHERE id = ${id}`;
            } else {
                // Ajout
                await sql`INSERT INTO offres_partenaires (title, description, category, website_url) VALUES (${partnerData.title}, ${partnerData.description}, ${partnerData.category}, ${partnerData.website_url})`;
            }
            return { success: true };
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du partenaire:", error);
            return fail(500, { error: "L'enregistrement a échoué." });
        }
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');

        if (!id) {
            return fail(400, { deleteError: "ID du partenaire manquant." });
        }

        try {
            await sql`DELETE FROM offres_partenaires WHERE id = ${id}`;
            throw redirect(303, '/admin/partenaires?deleted=true');
        } catch (error) {
            if (error.status === 303) throw error; 
            console.error("Erreur lors de la suppression du partenaire:", error);
            return fail(500, { deleteError: "La suppression a échoué." });
        }
    }
};