// src/routes/sitemap.xml/+server.js
export async function GET() {
    // ⚠️ IMPORTANT : Remplacez par votre VRAIE URL de production (ex: https://amicale-bagnols.fr)
    // Ne mettez pas le "/" à la fin
    const site = 'https://www.amicale-chbagnols-sur-ceze.fr';

    // Liste de vos pages publiques (je me base sur vos fichiers actuels)
    const pages = [
        '', // Page d'accueil
        '/offres-loisirs',
        '/offres-partenaires',
        '/login'
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    >
        ${pages.map((page) => `
        <url>
            <loc>${site}${page}</loc>
            <changefreq>weekly</changefreq>
            <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
        `).join('')}
    </urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}