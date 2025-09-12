<script lang="ts">
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    // Type pour un partenaire
    type Partner = {
        id?: number;
        title: string;
        description: string;
        category: string;
        website_url: string | null;
    };

    /** @type {import('./$types').PageData} */
    export let data: { partners: Partner[] };
    export let form;

    let selectedPartner: Partner | null = null;
    
    // --- LOGIQUE DE RECHERCHE ET FILTRAGE ---
    let searchTerm = '';
	let selectedCategory = 'Toutes les catégories';
    
    // On extrait dynamiquement la liste des catégories uniques depuis les données
	const categories = ['Toutes les catégories', ...new Set(data.partners.map(p => p.category))];

    // Variable réactive qui recalcule la liste des partenaires à afficher
	$: filteredPartners = data.partners.filter(partner => {
		const categoryMatch = selectedCategory === 'Toutes les catégories' || partner.category === selectedCategory;
		const searchMatch = partner.title.toLowerCase().includes(searchTerm.toLowerCase());
		return categoryMatch && searchMatch;
	});

    // --- Logique pour les messages et la modale ---
    let showDeleteSuccess = false;
    onMount(() => {
        if ($page.url.searchParams.get('deleted') === 'true') {
            showDeleteSuccess = true;
            setTimeout(() => { showDeleteSuccess = false; }, 3000);
        }
    });

    function openEditor(partner: Partner | null = null) {
        if (partner) {
            selectedPartner = { ...partner };
        } else {
            selectedPartner = { title: '', description: '', category: 'ACHATS', website_url: null };
        }
    }

    function closeModal() {
        selectedPartner = null;
    }

    function handleDelete(event: SubmitEvent) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
            event.preventDefault();
        }
    }
</script>

<h2 class="text-3xl font-serif font-bold text-gray-800 border-b pb-4 mb-6">Gestion des Partenaires</h2>

{#if showDeleteSuccess}
    <div in:fly={{ y: -10 }} class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong class="font-bold">Succès !</strong>
        <span class="block sm:inline">Le partenaire a été supprimé.</span>
    </div>
{/if}

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
    <div class="md:col-span-2">
        <label for="search" class="block text-sm font-medium text-gray-700">Rechercher un partenaire</label>
        <input 
            type="text" 
            id="search" 
            bind:value={searchTerm} 
            placeholder="Ex: King Jouet, Dekra..."
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
    </div>
    <div>
        <label for="category-filter" class="block text-sm font-medium text-gray-700">Filtrer par catégorie</label>
        <select id="category-filter" bind:value={selectedCategory} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            {#each categories as category}
                <option value={category}>{category}</option>
            {/each}
        </select>
    </div>
</div>


<div class="text-right mb-6">
    <button on:click={() => openEditor()} class="px-5 py-2 bg-amicale-green text-white rounded-md hover:bg-green-700">
        + Ajouter un partenaire
    </button>
</div>

<div class="space-y-3">
    {#each filteredPartners as partner (partner.id)}
        <div class="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
                <p class="text-xs font-semibold text-gray-500">{partner.category}</p>
                <p class="font-bold text-gray-800">{partner.title}</p>
            </div>
            <div class="flex items-center space-x-3">
                <button on:click={() => openEditor(partner)} class="text-sm font-semibold text-blue-600 hover:underline">Modifier</button>
                <form method="POST" action="?/delete" on:submit={handleDelete}>
                    <input type="hidden" name="id" value={partner.id}>
                    <button type="submit" class="text-sm font-semibold text-red-600 hover:underline">Supprimer</button>
                </form>
            </div>
        </div>
    {:else}
        <div class="text-center py-10 bg-white rounded-lg border">
            <p class="text-gray-500">Aucun partenaire ne correspond à vos critères de recherche.</p>
        </div>
    {/each}
</div>

{#if selectedPartner}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" on:click={closeModal}>
        <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full" on:click|stopPropagation in:fly={{ y: 20 }}>
            <form method="POST" action="?/save" class="p-8 space-y-4">
                <h3 class="text-2xl font-serif font-bold text-gray-800 mb-4">{selectedPartner.id ? 'Modifier' : 'Ajouter'} un partenaire</h3>
                
                <input type="hidden" name="id" value={selectedPartner.id}>

                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Nom du partenaire</label>
                    <input type="text" id="title" name="title" bind:value={selectedPartner.title} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                </div>
                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700">Catégorie</label>
                    <select id="category" name="category" bind:value={selectedPartner.category} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                        <option>BEAUTÉ & BIEN ÊTRE</option>
                        <option>ACHATS</option>
                        <option>LOISIRS / SPORTS / ACTIVITÉS</option>
                        <option>PARCS D'ATTRACTION</option>
                        <option>POUR LES PAPILLES</option>
                        <option>VOITURE</option>
                        <option>ACTIVITÉS DIVERSES</option>
                    </select>
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description de l'offre</label>
                    <textarea id="description" name="description" bind:value={selectedPartner.description} rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
                 <div>
                    <label for="website_url" class="block text-sm font-medium text-gray-700">Site Web (Optionnel)</label>
                    <input type="url" id="website_url" name="website_url" bind:value={selectedPartner.website_url} placeholder="https://..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>

                <div class="flex justify-end pt-4 space-x-3">
                    <button type="button" on:click={closeModal} class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Annuler</button>
                    <button type="submit" class="px-4 py-2 bg-amicale-green text-white rounded-md hover:bg-green-700">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>
{/if}