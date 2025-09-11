<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import HeroSection from '$lib/components/accueil/HeroSection.svelte';
    import OffersSection from '$lib/components/accueil/OffersSection.svelte';
    import ContactsSection from '$lib/components/accueil/ContactsSection.svelte';
</script>


<main>
    <HeroSection />
    <OffersSection />
    <ContactsSection />
</main>


<style>
    :global(body) {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }
</style>