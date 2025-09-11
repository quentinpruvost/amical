<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';

  /** @type {import('./$types').PageData} */
  export let data;

  // On extrait l'URL du règlement pour la passer au Footer
  const reglementUrl = data.siteData?.site_settings?.reglement_interieur_url;
</script>

<Header />

<main>
  <slot />
</main>

<Footer reglementUrl={reglementUrl} />