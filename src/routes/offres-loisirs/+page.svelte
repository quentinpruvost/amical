<script lang="ts">
	import { fly, fade } from 'svelte/transition';
    import { page } from '$app/stores'; // <-- On importe le store 'page'

	// ... (le reste de vos types Link et Offer ne change pas)
	type Link = { url: string; label: string; };
	type Offer = { id: number | string; title: string; description: string; images: string[]; links: Link[]; status: string; };

	/** @type {import('./$types').PageData} */
	export let data;

	let selectedLoisir: Offer | null = null;
	
	// On lit le paramètre 'tab' de l'URL pour définir l'onglet actif.
    // S'il n'y a pas de paramètre, on affiche 'loisirs' par défaut.
	let activeTab: 'loisirs' | 'permanentes' = $page.url.searchParams.get('tab') === 'permanentes' ? 'permanentes' : 'loisirs';

	// ... (le reste de votre script : openModal, closeModal, etc. ne change pas)
	function openModal(offer: Offer) { selectedLoisir = offer; }
	function closeModal() { selectedLoisir = null; }
	function handleKeydown(event: KeyboardEvent) { if (event.key === 'Escape') closeModal(); }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-12">
        <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-extrabold text-amicale-green mb-2">Nos Offres</h1>
            <p class="text-lg text-gray-600">Explorez nos avantages exclusifs pour les membres.</p>
        </div>

        <div class="mb-10 flex justify-center border-b-2 border-gray-200">
            <button
                on:click={() => activeTab = 'loisirs'}
                class="px-6 py-3 text-lg font-semibold transition-colors duration-300"
                class:text-amicale-green={activeTab === 'loisirs'}
                class:border-b-4={activeTab === 'loisirs'}
                class:border-amicale-green={activeTab === 'loisirs'}
                class:text-gray-500={activeTab !== 'loisirs'}
            >
                Offres Loisirs
            </button>
            <button
                on:click={() => activeTab = 'permanentes'}
                class="px-6 py-3 text-lg font-semibold transition-colors duration-300"
                class:text-amicale-green={activeTab === 'permanentes'}
                class:border-b-4={activeTab === 'permanentes'}
                class:border-amicale-green={activeTab === 'permanentes'}
                class:text-gray-500={activeTab !== 'permanentes'}
            >
                Offres Permanentes
            </button>
        </div>

        {#if activeTab === 'loisirs'}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" in:fade>
                {#if data.loisirs && data.loisirs.length > 0}
                    {#each data.loisirs as loisir (loisir.id)}
                        <button
                            on:click={() => openModal(loisir)}
                            class="card bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col text-left focus:outline-none focus:ring-2 focus:ring-amicale-green focus:ring-opacity-50"
                        >
                            <div class="relative">
                                <img src={loisir.images[0]} alt="Image pour {loisir.title}" class="w-full aspect-video object-cover">
                                {#if loisir.status}
                                    <div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{loisir.status}</div>
                                {/if}
                            </div>
                            <div class="p-6 flex-grow flex flex-col">
                                <h2 class="font-bold text-xl text-gray-800 mb-2">{loisir.title}</h2>
                                <p class="text-gray-600 leading-relaxed flex-grow text-sm line-clamp-3">{loisir.description}</p>
                                <div class="text-right mt-4 text-amicale-green font-semibold text-sm">
                                    Voir les détails →
                                </div>
                            </div>
                        </button>
                    {/each}
                {:else}
                    <p class="text-center col-span-full text-gray-500">Aucune offre de loisirs disponible pour le moment.</p>
                {/if}
            </div>
        {:else if activeTab === 'permanentes'}
             <div class="space-y-6 max-w-4xl mx-auto" in:fade>
                {#if data.permanentes && data.permanentes.length > 0}
                    {#each data.permanentes as offer (offer.id)}
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <h3 class="text-2xl font-bold text-amicale-green mb-2">{offer.title}</h3>
                            <p class="text-gray-700 mb-4 whitespace-pre-line">{offer.description}</p>
                            {#if offer.links && offer.links.length > 0}
                                <div class="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                                    {#each offer.links as link}
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" class="flex items-center text-sm text-amicale-green hover:underline font-semibold">
                                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                                            {link.label}
                                        </a>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {/each}
                {:else}
                    <p class="text-center col-span-full text-gray-500">Aucune offre permanente disponible pour le moment.</p>
                {/if}
            </div>
        {/if}
    </div>
</div>


{#if selectedLoisir}
    <div
        role="dialog"
        aria-modal="true"
        class="fixed inset-0 bg-white z-50 overflow-y-auto"
        transition:fly={{ y: '100%', duration: 400 }}
    >
        <div class="container mx-auto px-4 sm:px-8 py-12">
            <div class="text-right mb-8">
                 <button
                    on:click={closeModal}
                    class="sticky top-4 right-4 text-gray-500 hover:text-gray-900 bg-white/70 backdrop-blur-sm rounded-full p-2 transition-colors"
                    aria-label="Fermer"
                >
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div class="max-w-4xl mx-auto">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{selectedLoisir.title}</h2>
                <p class="text-xl text-gray-600 mb-8">{selectedLoisir.description}</p>

                {#if selectedLoisir.status}
                    <div class="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-8 rounded-r-lg" role="alert">
                        <p class="font-bold uppercase">→ {selectedLoisir.status}</p>
                    </div>
                {/if}

                {#if selectedLoisir.links && selectedLoisir.links.length > 0}
                    <div class="mb-8 flex flex-wrap gap-x-6 gap-y-2">
                        {#each selectedLoisir.links as link}
                            <a href={link.url} target="_blank" rel="noopener noreferrer" class="flex items-center text-amicale-green hover:underline font-semibold text-lg">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                                {link.label}
                            </a>
                        {/each}
                    </div>
                {/if}

                <div class="grid grid-cols-3 grid-rows-2 gap-4" style="height: 500px;">
                    {#if selectedLoisir.images && selectedLoisir.images.length > 1}
                        <div class="col-span-2 row-span-2 rounded-lg overflow-hidden shadow-lg">
                             <img src={selectedLoisir.images[1]} alt="Vue principale" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
                        </div>
                        <div class="col-span-1 row-span-1 rounded-lg overflow-hidden shadow-lg">
                             <img src={selectedLoisir.images[2] || selectedLoisir.images[0]} alt="Détail 1" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
                        </div>
                        <div class="col-span-1 row-span-1 rounded-lg overflow-hidden shadow-lg">
                             <img src={selectedLoisir.images[3] || selectedLoisir.images[0]} alt="Détail 2" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
                        </div>
                    {:else if selectedLoisir.images && selectedLoisir.images.length > 0}
                        <div class="col-span-3 row-span-2 rounded-lg overflow-hidden shadow-lg">
                            <img src={selectedLoisir.images[0]} alt="Image principale" class="w-full h-full object-cover">
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Permet de couper le texte de la description sur 3 lignes dans la carte */
    .line-clamp-3 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
    /* Préserve les sauts de ligne dans les descriptions des offres permanentes */
    .whitespace-pre-line {
        white-space: pre-line;
    }
</style>