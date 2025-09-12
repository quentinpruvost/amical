// src/routes/admin/+layout.server.js
import { guard } from '$lib/server/security';

/** @type {import('./$types').LayoutServerLoad} */
export function load(event) {
    // On appelle notre garde. C'est tout.
    guard(event);
}