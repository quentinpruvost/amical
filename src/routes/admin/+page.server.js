import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        // On exécute les trois requêtes de comptage en parallèle pour plus de performance
        const [loisirsCount, permanentesCount, partenairesCount] = await Promise.all([
            sql`SELECT COUNT(*) FROM loisirs_v2`,
            sql`SELECT COUNT(*) FROM offres_permanentes`,
            sql`SELECT COUNT(*) FROM offres_partenaires`
        ]);

        return {
            stats: {
                loisirs: loisirsCount[0].count,
                permanentes: permanentesCount[0].count,
                partenaires: partenairesCount[0].count
            }
        };
    } catch (error) {
        console.error("Erreur lors du chargement des statistiques du tableau de bord:", error);
        return {
            stats: { loisirs: 0, permanentes: 0, partenaires: 0 },
            error: "Impossible de charger les statistiques."
        };
    }
}