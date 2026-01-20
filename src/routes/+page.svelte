<svelte:head>
    <title>Accueil - Amicale du Centre Hospitalier</title>
    <meta name="description" content="Site officiel de l'Amicale. Retrouvez toute la billetterie, les loisirs et les offres partenaires pour le personnel." />
    <meta property="og:title" content="Accueil - Amicale du Centre Hospitalier" />
    <meta property="og:description" content="Profitez de tarifs réduits cinéma, parcs et spectacles." />
    <meta property="og:image" content="/logo-amicale.jpg" />
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Amicale du Centre Hospitalier de Bagnols-sur-Cèze",
  "url": "https://www.amicale-chbagnols-sur-ceze.fr",
  "logo": "https://www.amicale-chbagnols-sur-ceze.fr/logo-amicale.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "04-66-79-10-11",
    "contactType": "customer service"
  }
}
</script>
</svelte:head>
<script lang="ts">
    import HeroSection from '$lib/components/accueil/HeroSection.svelte';
    import OffersSection from '$lib/components/accueil/OffersSection.svelte';
    import ContactsSection from '$lib/components/accueil/ContactsSection.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    // Les données du site viennent du layout parent
    const { hero, contacts, equipe, site_settings } = data.siteData;
</script>

<div class="container mx-auto px-4 py-8">
    <HeroSection content={hero} />
    <OffersSection />
    <ContactsSection 
        contactsContent={contacts} 
        teamContent={equipe} 
        reglementUrl={site_settings?.reglement_interieur_url} 
    />
</div>