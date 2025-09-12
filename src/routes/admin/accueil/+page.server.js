// src/routes/admin/accueil/+page.server.js
import { fail } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const homepageContent = await sql`SELECT section, content FROM page_accueil`;
        const formattedContent = homepageContent.reduce((acc, item) => {
            acc[item.section] = item.content;
            return acc;
        }, {});
        return {
            homepageContent: formattedContent
        };
    } catch (error) {
        console.error("Erreur de chargement du contenu de l'accueil:", error);
        return { homepageContent: null, error: "Impossible de charger les données." };
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    updateHero: async ({ request }) => {
        const data = await request.formData();
        const content = {
            title: data.get('title'),
            intro_1: data.get('intro_1'),
            tarif_principal: data.get('tarif_principal'),
            annee_tarif: data.get('annee_tarif'),
            tarif_etudiant: data.get('tarif_etudiant'),
            note_title: data.get('note_title'),
            note_content: data.get('note_content'),
            note_inscription: data.get('note_inscription')
        };

        try {
            await sql`UPDATE page_accueil SET content = ${JSON.stringify(content)} WHERE section = 'hero'`;
            return { success: true, section: 'hero' };
        } catch (error) {
            console.error("Erreur de mise à jour (Hero):", error);
            return fail(500, { error: "La mise à jour de la section d'accueil a échoué." });
        }
    },
    updateContacts: async ({ request }) => {
        const data = await request.formData();
        const content = {
            permanences_intro: data.get('permanences_intro'),
            permanences_horaires: data.get('permanences_horaires'),
            permanences_ehpad: data.get('permanences_ehpad'),
            email: data.get('email'),
            poste_telephonique: data.get('poste_telephonique'),
            telephone: data.get('telephone')
        };
        try {
            await sql`UPDATE page_accueil SET content = ${JSON.stringify(content)} WHERE section = 'contacts'`;
            return { success: true, section: 'contacts' };
        } catch (error) {
            console.error("Erreur de mise à jour (Contacts):", error);
            return fail(500, { error: "La mise à jour de la section contacts a échoué." });
        }
    },
    updateEquipe: async ({ request }) => {
        const data = await request.formData();
        
        // On transforme les listes (une par ligne) en tableaux
        const charges_mission = data.get('charges_mission')?.toString().split('\n').map(s => s.trim()).filter(Boolean) || [];
        const membres_actifs = data.get('membres_actifs')?.toString().split('\n').map(s => s.trim()).filter(Boolean) || [];

        const content = {
            presidente: { nom: data.get('presidente_nom'), role: data.get('presidente_role') },
            vice_presidente: { nom: data.get('vice_presidente_nom'), role: data.get('vice_presidente_role') },
            tresoriere: { nom: data.get('tresoriere_nom'), role: data.get('tresoriere_role') },
            tresoriere_adjointe: { nom: data.get('tresoriere_adjointe_nom'), role: data.get('tresoriere_adjointe_role') },
            secretaire: { nom: data.get('secretaire_nom'), role: data.get('secretaire_role') },
            secretaire_adjointe: { nom: data.get('secretaire_adjointe_nom'), role: data.get('secretaire_adjointe_role') },
            president_honneur: data.get('president_honneur'),
            charges_mission,
            membres_actifs
        };

        try {
            await sql`UPDATE page_accueil SET content = ${JSON.stringify(content)} WHERE section = 'equipe'`;
            return { success: true, section: 'equipe' };
        } catch (error) {
            console.error("Erreur de mise à jour (Equipe):", error);
            return fail(500, { error: "La mise à jour de la section équipe a échoué." });
        }
    }
};