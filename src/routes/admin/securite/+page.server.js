import { fail } from '@sveltejs/kit';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';
import bcrypt from 'bcrypt';

const sql = neon(env.DATABASE_URL);

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const oldPassword = data.get('oldPassword');
        const newPassword = data.get('newPassword');
        const confirmPassword = data.get('confirmPassword');

        if (typeof oldPassword !== 'string' || typeof newPassword !== 'string' || typeof confirmPassword !== 'string' || !oldPassword || !newPassword) {
            return fail(400, { error: 'Tous les champs sont requis.' });
        }

        if (newPassword !== confirmPassword) {
            return fail(400, { error: 'Le nouveau mot de passe et sa confirmation ne correspondent pas.' });
        }

        if (newPassword.length < 8) {
            return fail(400, { error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' });
        }

        try {
            // 1. Récupérer le mot de passe haché de l'utilisateur modifiable
            const modifiableUser = await sql`SELECT password_hash FROM users WHERE is_modifiable = true`;
            if (modifiableUser.length === 0) {
                return fail(500, { error: 'Aucun utilisateur modifiable trouvé.' });
            }
            const storedHash = modifiableUser[0].password_hash;

            // 2. Vérifier si l'ancien mot de passe est correct
            const isOldPasswordCorrect = await bcrypt.compare(oldPassword, storedHash);
            if (!isOldPasswordCorrect) {
                return fail(400, { error: 'L\'ancien mot de passe est incorrect.' });
            }

            // 3. Hacher le nouveau mot de passe
            const newPasswordHash = await bcrypt.hash(newPassword, 10);

            // 4. Mettre à jour le mot de passe dans la base de données
            await sql`UPDATE users SET password_hash = ${newPasswordHash} WHERE is_modifiable = true`;

            return { success: 'Le mot de passe a été mis à jour avec succès.' };

        } catch (error) {
            console.error("Erreur lors du changement de mot de passe:", error);
            return fail(500, { error: 'Une erreur est survenue sur le serveur.' });
        }
    }
};