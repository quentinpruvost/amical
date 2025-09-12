// src/lib/server/security.js
import { redirect } from '@sveltejs/kit';

/**
 * La seule fonction dont nous avons besoin.
 * Elle vérifie si l'utilisateur est connecté et le redirige si ce n'est pas le cas.
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export function guard(event) {
    const session = event.cookies.get('session');
    if (session !== 'admin_logged_in') {
        throw redirect(303, '/login');
    }
}