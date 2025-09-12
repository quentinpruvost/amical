import { fail, redirect } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';
import { v2 as cloudinary } from 'cloudinary';

const sql = neon(env.DATABASE_URL);

// Liste des tables autorisées pour sécuriser les requêtes
const ALLOWED_TABLES = ['loisirs_v2', 'offres_permanentes'];

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        // On récupère les offres des deux tables en parallèle
        const loisirs = await sql`SELECT *, 'loisirs_v2' as type FROM loisirs_v2`;
        const permanentes = await sql`SELECT *, 'offres_permanentes' as type FROM offres_permanentes`;
        
        // On combine et trie les offres pour l'affichage
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
        // La configuration de Cloudinary se fait uniquement lors de cette action
        cloudinary.config({
            cloud_name: env.CLOUD_NAME,
            api_key: env.API_KEY,
            api_secret: env.API_SECRET
        });

        const data = await request.formData();
        const id = data.get('id');
        const type = data.get('type')?.toString();

        if (!type || !ALLOWED_TABLES.includes(type)) {
            return fail(400, { error: "Type d'offre invalide." });
        }

        // --- GESTION DES IMAGES ---
        const newImageFiles = data.getAll('images');
        let existingImages = JSON.parse(data.get('existing_images')?.toString() || '[]');
        try {
            for (const file of newImageFiles) {
                if (typeof file === 'object' && file.size > 0) {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;
                    const result = await cloudinary.uploader.upload(dataUri, { folder: 'amicale' });
                    existingImages.push(result.secure_url);
                }
            }
        } catch (error) {
            console.error("Erreur d'upload d'image:", error);
            return fail(500, { error: "L'upload d'image a échoué. Vérifiez vos clés API Cloudinary." });
        }

        // --- GESTION DES LIENS ET PDF ---
        const manualLinksText = data.get('manual_links')?.toString() ?? '';
        let finalLinks = manualLinksText.split('\n').map(line => {
            const [label, url] = line.split('|').map(s => s.trim());
            return { label, url };
        }).filter(l => l.label && l.url);

        const newPdfFiles = data.getAll('pdfs');
        try {
            for (const file of newPdfFiles) {
                if (typeof file === 'object' && file.size > 0) {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;
                    const result = await cloudinary.uploader.upload(dataUri, { folder: 'amicale', resource_type: 'auto' });
                    finalLinks.push({ label: file.name, url: result.secure_url });
                }
            }
        } catch (error) {
            console.error("Erreur d'upload de PDF:", error);
            return fail(500, { error: "L'upload de PDF a échoué." });
        }

        const offerData = {
            title: data.get('title')?.toString() ?? '',
            description: data.get('description')?.toString() ?? '',
            status: data.get('status')?.toString() ?? '',
            images: JSON.stringify(existingImages),
            links: JSON.stringify(finalLinks)
        };

        try {
            const tableName = sql.unsafe(type); // sql.unsafe est sûr ici car 'type' est vérifié
            if (id) {
                // Modification
                await sql`UPDATE ${tableName} SET title = ${offerData.title}, description = ${offerData.description}, status = ${offerData.status}, images = ${offerData.images}, links = ${offerData.links} WHERE id = ${id}`;
            } else {
                // Ajout
                await sql`INSERT INTO ${tableName} (title, description, status, images, links) VALUES (${offerData.title}, ${offerData.description}, ${offerData.status}, ${offerData.images}, ${offerData.links})`;
            }
            return { success: true };
        } catch (error) {
            console.error("Erreur lors de la sauvegarde de l'offre:", error);
            return fail(500, { error: "L'enregistrement dans la base de données a échoué." });
        }
    },
    
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const type = data.get('type')?.toString();

        if (!type || !ALLOWED_TABLES.includes(type)) {
            return fail(400, { deleteError: "Type d'offre invalide." });
        }
        if (!id) {
            return fail(400, { deleteError: "ID de l'offre manquant." });
        }

        try {
            const tableName = sql.unsafe(type);
            await sql`DELETE FROM ${tableName} WHERE id = ${id}`;
            // On force le rechargement de la page avec un message de succès
            throw redirect(303, '/admin/offres?deleted=true');

        } catch (error) {
            // Si l'erreur est une redirection, on la laisse passer
            if (error.status === 303) throw error; 
            
            console.error("Erreur lors de la suppression de l'offre:", error);
            return fail(500, { deleteError: "La suppression a échoué." });
        }
    }
};