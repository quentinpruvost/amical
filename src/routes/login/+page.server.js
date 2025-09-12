// src/routes/login/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';
import bcrypt from 'bcrypt';

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').Actions} */
export const actions = {
    // La 'default' action est plus simple à appeler depuis le formulaire
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const password = data.get('password');

        if (typeof password !== 'string' || !password) {
            return fail(400, { error: 'Le mot de passe est requis.' });
        }

        try {
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

            cookies.set('session', 'admin_logged_in', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 // 1 jour
            });

        } catch (error) {
            console.error("Erreur serveur lors de la connexion:", error);
            return fail(500, { error: 'Erreur du serveur, veuillez contacter un administrateur.' });
        }

        // Si tout s'est bien passé, on redirige.
        throw redirect(303, '/admin');
    }
};