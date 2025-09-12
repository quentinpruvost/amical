import { fail } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

const sql = neon(env.DATABASE_URL);

// Liste des tables autorisées pour la sécurité
const ALLOWED_TABLES = ['loisirs_v2', 'offres_permanentes'];

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const loisirs = await sql`SELECT *, 'loisirs_v2' as type FROM loisirs_v2`;
        const permanentes = await sql`SELECT *, 'offres_permanentes' as type FROM offres_permanentes`;
        const allOffers = [...loisirs, ...permanentes].sort((a, b) => a.id - b.id);
        return { offers: allOffers };
    } catch (error) {
        console.error("Erreur de chargement des offres:", error);
        return { offers: [], error: "Impossible de charger les offres." };
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const type = data.get('type')?.toString();

        if (!type || !ALLOWED_TABLES.includes(type)) {
            return fail(400, { error: "Type d'offre invalide." });
        }

        const images = JSON.stringify(data.get('images')?.toString().split('\n').map(s => s.trim()).filter(Boolean) ?? []);
        const links = JSON.stringify(data.get('links')?.toString().split('\n').map(line => {
            const [label, url] = line.split('|').map(s => s.trim());
            return { label, url };
        }).filter(l => l.label && l.url) ?? []);

        const offerData = {
            title: data.get('title')?.toString() ?? '',
            description: data.get('description')?.toString() ?? '',
            status: data.get('status')?.toString() ?? '',
            images,
            links
        };

        try {
            const tableName = sql.unsafe(type);
            if (id) {
                // Modification d'une offre existante
                await sql`UPDATE ${tableName} SET title = ${offerData.title}, description = ${offerData.description}, status = ${offerData.status}, images = ${offerData.images}, links = ${offerData.links} WHERE id = ${id}`;
            } else {
                // Ajout d'une nouvelle offre
                await sql`INSERT INTO ${tableName} (title, description, status, images, links) VALUES (${offerData.title}, ${offerData.description}, ${offerData.status}, ${offerData.images}, ${offerData.links})`;
            }
            return { success: true };
        } catch (error) {
            console.error("Erreur lors de la sauvegarde de l'offre:", error);
            return fail(500, { error: "L'enregistrement a échoué." });
        }
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const type = data.get('type')?.toString();

        if (!type || !ALLOWED_TABLES.includes(type)) {
            return fail(400, { error: "Type d'offre invalide." });
        }

        try {
            const tableName = sql.unsafe(type);
            await sql`DELETE FROM ${tableName} WHERE id = ${id}`;
            return { success: true };
        } catch (error) {
            console.error("Erreur lors de la suppression de l'offre:", error);
            return fail(500, { error: "La suppression a échoué." });
        }
    }
};