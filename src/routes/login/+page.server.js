import { fail, redirect } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';
import bcrypt from 'bcrypt';

// Connexion BDD
const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').Actions} */
export const actions = {
    // On utilise 'default' pour que cela marche sans configuration spéciale dans le HTML
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const password = data.get('password');

        if (typeof password !== 'string' || !password) {
            return fail(400, { error: 'Le mot de passe est requis.' });
        }

        try {
            // 1. Vérification du mot de passe (Votre code existant avec bcrypt)
            const adminUsers = await sql`SELECT password_hash FROM users`;
            
            if (adminUsers.length === 0) {
                 return fail(500, { error: 'Aucun utilisateur admin configuré.' });
            }

            let passwordMatch = false;
            for (const user of adminUsers) {
                if (await bcrypt.compare(password, user.password_hash)) {
                    passwordMatch = true;
                    break;
                }
            }

            if (!passwordMatch) {
                return fail(400, { error: 'Mot de passe incorrect.' });
            }

            // --- C'EST ICI QUE LA SÉCURITÉ CHANGE ---
            
            // 2. Générer un ID de session unique (UUID)
            const sessionId = crypto.randomUUID();
            const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

            // 3. Stocker la session en base de données (Sécurité)
            // Assurez-vous d'avoir créé la table 'sessions' comme demandé précédemment !
            await sql`INSERT INTO sessions (id, expires_at) VALUES (${sessionId}, ${expiresAt})`;

            // 4. Envoyer le cookie sécurisé
            cookies.set('session', sessionId, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24
            });

        } catch (error) {
            // Gestion de l'erreur TypeScript "unknown"
            if (/** @type {any} */(error).status === 303) throw error;

            console.error("Erreur connexion:", error);
            return fail(500, { error: "Erreur serveur. Avez-vous créé la table 'sessions' ?" });
        }

        throw redirect(303, '/admin');
    }
};