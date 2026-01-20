import { fail, redirect } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp'; // <--- NOUVEL IMPORT

// --- INIT ---
const sql = neon(env.DATABASE_URL);

/** @type {import('@supabase/supabase-js').SupabaseClient | null} */
let supabase = null;

try {
    if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
        supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
    } else {
        console.warn("⚠️ Clés Supabase manquantes dans le .env");
    }
} catch (e) {
    console.error("Erreur init Supabase:", e);
}

const ALLOWED_TABLES = ['loisirs_v2', 'offres_permanentes'];
const BUCKET_NAME = 'amicale';

/**
 * Fonction utilitaire pour parser le JSON sans erreur
 * @param {any} data
 * @returns {any[]}
 */
function parseJsonSafe(data) {
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (e) {
            return [];
        }
    }
    return [];
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const loisirs = await sql`SELECT *, 'loisirs_v2' as type FROM loisirs_v2`;
        const permanentes = await sql`SELECT *, 'offres_permanentes' as type FROM offres_permanentes`;
        
        // @ts-ignore
        let allOffers = [...loisirs, ...permanentes].sort((a, b) => a.id - b.id);

        allOffers = allOffers.map(offer => ({
            ...offer,
            images: parseJsonSafe(offer.images),
            links: parseJsonSafe(offer.links)
        }));

        return { offers: allOffers };
    } catch (error) {
        console.error("Erreur load:", error);
        // @ts-ignore
        return { offers: [], error: "Impossible de charger les offres." };
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    save: async ({ request }) => {
        if (!supabase) return fail(500, { error: "Supabase non configuré." });

        const data = await request.formData();
        const id = data.get('id');
        const type = data.get('type')?.toString();

        if (!type || !ALLOWED_TABLES.includes(type)) return fail(400, { error: "Type invalide." });

        // 1. IMAGES (AVEC OPTIMISATION SHARP)
        const newImageFiles = data.getAll('images');
        let existingImages = parseJsonSafe(data.get('existing_images')?.toString());

        for (const file of newImageFiles) {
            if (file instanceof File && file.size > 0) {
                try {
                    // On sécurise le nom
                    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_').split('.')[0] + '.jpg'; // Force l'extension .jpg
                    const uniqueName = `images/${Date.now()}-${safeName}`;
                    
                    // --- OPTIMISATION DU FICHIER ICI ---
                    const originalBuffer = await file.arrayBuffer();
                    const optimizedBuffer = await sharp(Buffer.from(originalBuffer))
                        .rotate() // Remet l'image à l'endroit (ex: photos iPhone)
                        .resize(1200, 1200, { // Redimensionne max 1200px
                            fit: 'inside',
                            withoutEnlargement: true 
                        })
                        .jpeg({ quality: 80, mozjpeg: true }) // Compresse en JPEG
                        .toBuffer();
                    // ------------------------------------

                    const { error: uploadError } = await supabase.storage
                        .from(BUCKET_NAME)
                        .upload(uniqueName, optimizedBuffer, { contentType: 'image/jpeg', upsert: false });

                    if (uploadError) throw uploadError;

                    const { data: publicData } = supabase.storage
                        .from(BUCKET_NAME)
                        .getPublicUrl(uniqueName);
                        
                    existingImages.push(publicData.publicUrl);
                } catch (err) {
                    console.error("Erreur Upload Image:", err);
                    // @ts-ignore
                    return fail(500, { error: "Erreur upload image: " + (err.message || "Inconnue") });
                }
            }
        }

        // 2. PDF & LIENS (Pas de changement)
        const manualLinksText = data.get('manual_links')?.toString() ?? '';
        let finalLinks = manualLinksText.split('\n').map(line => {
            const [label, url] = line.split('|').map(s => s.trim());
            return { label, url };
        }).filter(l => l.label && l.url);

        const newPdfFiles = data.getAll('pdfs');
        for (const file of newPdfFiles) {
            if (file instanceof File && file.size > 0) {
                try {
                    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
                    const uniqueName = `documents/${Date.now()}-${safeName}`;
                    const buffer = await file.arrayBuffer();

                    const { error: uploadError } = await supabase.storage
                        .from(BUCKET_NAME)
                        .upload(uniqueName, buffer, { contentType: file.type || 'application/pdf' });

                    if (uploadError) throw uploadError;

                    const { data: publicData } = supabase.storage
                        .from(BUCKET_NAME)
                        .getPublicUrl(uniqueName);

                    finalLinks.push({ label: file.name, url: publicData.publicUrl });
                } catch (err) {
                    console.error("Erreur Upload PDF:", err);
                    // @ts-ignore
                    return fail(500, { error: "Erreur upload PDF: " + (err.message || "Inconnue") });
                }
            }
        }

        // 3. SAUVEGARDE DB
        try {
            const offerData = {
                title: data.get('title')?.toString() ?? '',
                description: data.get('description')?.toString() ?? '',
                status: data.get('status')?.toString() ?? '',
                images: JSON.stringify(existingImages),
                links: JSON.stringify(finalLinks)
            };

            const tableName = sql.unsafe(type); 
            if (id) {
                await sql`UPDATE ${tableName} SET title = ${offerData.title}, description = ${offerData.description}, status = ${offerData.status}, images = ${offerData.images}, links = ${offerData.links} WHERE id = ${id}`;
            } else {
                await sql`INSERT INTO ${tableName} (title, description, status, images, links) VALUES (${offerData.title}, ${offerData.description}, ${offerData.status}, ${offerData.images}, ${offerData.links})`;
            }
            return { success: true };
        } catch (error) {
            console.error("Erreur DB:", error);
            // @ts-ignore
            return fail(500, { error: "Erreur base de données: " + (error.message || "Inconnue") });
        }
    },
    
    delete: async ({ request }) => {
        if (!supabase) return fail(500, { error: "Supabase non configuré." });

        const data = await request.formData();
        const id = data.get('id');
        const type = data.get('type')?.toString();

        if (!type || !ALLOWED_TABLES.includes(type) || !id) {
            return fail(400, { deleteError: "Données invalides." });
        }

        try {
            const tableName = sql.unsafe(type);
            const offers = await sql`SELECT images, links FROM ${tableName} WHERE id = ${id}`;
            
            if (offers.length > 0) {
                const offer = offers[0];
                const images = parseJsonSafe(offer.images);
                const links = parseJsonSafe(offer.links);
                const filesToDelete = [];

                for (const url of images) {
                    if (url && typeof url === 'string' && url.includes(`/${BUCKET_NAME}/`)) {
                        const path = url.split(`/${BUCKET_NAME}/`).pop();
                        if (path) filesToDelete.push(path);
                    }
                }

                for (const link of links) {
                    if (link.url && typeof link.url === 'string' && link.url.includes(`/${BUCKET_NAME}/`)) {
                        const path = link.url.split(`/${BUCKET_NAME}/`).pop();
                        if (path) filesToDelete.push(path);
                    }
                }

                if (filesToDelete.length > 0) {
                    const { error } = await supabase.storage
                        .from(BUCKET_NAME)
                        .remove(filesToDelete);
                    if (error) console.error("Erreur suppression fichiers Supabase:", error);
                }
            }

            await sql`DELETE FROM ${tableName} WHERE id = ${id}`;
            throw redirect(303, '/admin/offres?deleted=true');

        } catch (error) {
            // @ts-ignore
            if (error.status === 303) throw error;
            console.error("Erreur delete:", error);
            return fail(500, { deleteError: "Suppression impossible." });
        }
    }
};