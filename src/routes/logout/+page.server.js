// src/routes/logout/+page.server.js
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: ({ cookies }) => {
        // On supprime le cookie de session
        cookies.delete('session', { path: '/' });

        // On redirige l'utilisateur vers la page de connexion
        throw redirect(303, '/login');
    }
};