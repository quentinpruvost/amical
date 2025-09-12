<script lang="ts">
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    // Définit le type pour un lien (URL ou PDF)
    type Link = { 
        label: string; 
        url: string; 
    };

    // Définit le type pour une offre
    type Offer = {
        id?: number; // L'ID est optionnel pour une nouvelle offre
        type: 'loisirs_v2' | 'offres_permanentes';
        title: string;
        description: string;
        status: string;
        images: string[];
        links: Link[];
        linksText?: string; // Champ temporaire pour le formulaire
    };

    /** @type {import('./$types').PageData} */
    export let data: { offers: Offer[] };

    /** @type {import('./$types').ActionData} */
    export let form;

    // --- LOGIQUE DE RECHERCHE ET DE FILTRAGE ---
    let searchTerm = '';
    let selectedType: 'tous' | 'loisirs_v2' | 'offres_permanentes' = 'tous';

    // Variable réactive qui filtre les offres à afficher
    $: filteredOffers = data.offers.filter(offer => {
        const typeMatch = selectedType === 'tous' || offer.type === selectedType;
        const searchMatch = offer.title.toLowerCase().includes(searchTerm.toLowerCase());
        return typeMatch && searchMatch;
    });
    
    // Contient l'offre sélectionnée pour l'édition, ou 'null' si la modale est fermée
    let selectedOffer: Offer | null = null;

    // Ouvre la modale pour l'édition ou l'ajout
    function openEditor(offer: Offer | null = null) {
        if (offer) {
            // Modification : on fait une copie de l'offre et de ses tableaux
            selectedOffer = { ...offer, images: [...offer.images], links: [...offer.links] };
        } else {
            // Ajout : on crée une nouvelle offre vide
            selectedOffer = { type: 'loisirs_v2', title: '', description: '', status: '', images: [], links: [] };
        }
        if (selectedOffer) {
            selectedOffer.linksText = selectedOffer.links.map(l => `${l.label} | ${l.url}`).join('\n');
        }
    }

    // Ferme la modale
    function closeModal() { 
        selectedOffer = null; 
    }

    // Fonctions pour retirer une image ou un lien
    function removeImage(index: number) {
        if (selectedOffer) {
            selectedOffer.images.splice(index, 1);
            selectedOffer = selectedOffer;
        }
    }
    
    function removeLink(index: number) {
        if (selectedOffer) {
            selectedOffer.links.splice(index, 1);
            selectedOffer = selectedOffer;
        }
    }

    // Demande confirmation avant suppression
    function handleDelete(event: SubmitEvent) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
            event.preventDefault();
        }
    }
</script>

<h2 class="text-3xl font-serif font-bold text-gray-800 border-b pb-4 mb-6">Gestion des Offres (Loisirs & Permanentes)</h2>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
    <div class="md:col-span-2">
        <label for="search" class="block text-sm font-medium text-gray-700">Rechercher par titre</label>
        <input 
            type="text" 
            id="search" 
            bind:value={searchTerm} 
            placeholder="Ex: Croisière, Cinéma..."
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
    </div>
    <div>
        <label for="type-filter" class="block text-sm font-medium text-gray-700">Filtrer par type</label>
        <select id="type-filter" bind:value={selectedType} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option value="tous">Toutes les offres</option>
            <option value="loisirs_v2">Loisir</option>
            <option value="offres_permanentes">Permanente</option>
        </select>
    </div>
</div>

<div class="text-right mb-6">
    <button on:click={() => openEditor()} class="px-5 py-2 bg-amicale-green text-white rounded-md hover:bg-green-700">
        + Ajouter une offre
    </button>
</div>

<div class="space-y-3">
    {#each filteredOffers as offer (offer.id + offer.type)}
        <div class="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
                <span class="text-xs font-semibold uppercase px-2 py-1 rounded-full
                    {offer.type === 'loisirs_v2' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                ">
                    {offer.type === 'loisirs_v2' ? 'Loisir' : 'Permanente'}
                </span>
                <p class="font-bold text-gray-800 mt-1">{offer.title}</p>
            </div>
            <div class="flex items-center space-x-3">
                <button on:click={() => openEditor(offer)} class="text-sm font-semibold text-blue-600 hover:underline">Modifier</button>
                <form method="POST" action="?/delete" on:submit={handleDelete}>
                    <input type="hidden" name="id" value={offer.id}>
                    <input type="hidden" name="type" value={offer.type}>
                    <button type="submit" class="text-sm font-semibold text-red-600 hover:underline">Supprimer</button>
                </form>
            </div>
        </div>
    {:else}
        <div class="text-center py-10 bg-white rounded-lg border">
            <p class="text-gray-500">Aucune offre ne correspond à vos critères de recherche.</p>
        </div>
    {/each}
</div>

{#if selectedOffer}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" on:click={closeModal}>
        <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation in:fly={{ y: 20 }}>
            <form method="POST" action="?/save" enctype="multipart/form-data" class="p-8 space-y-4">
                <h3 class="text-2xl font-serif font-bold text-gray-800 mb-4">{selectedOffer.id ? 'Modifier' : 'Ajouter'} une offre</h3>
                
                <input type="hidden" name="id" value={selectedOffer.id}>

                <div>
                    <label for="type" class="block text-sm font-medium text-gray-700">Type d'offre</label>
                    <select id="type" name="type" bind:value={selectedOffer.type} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                        <option value="loisirs_v2">Loisir</option>
                        <option value="offres_permanentes">Permanente</option>
                    </select>
                </div>
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
                    <input type="text" id="title" name="title" bind:value={selectedOffer.title} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" bind:value={selectedOffer.description} rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">Statut</label>
                    <input type="text" id="status" name="status" bind:value={selectedOffer.status} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700">Images</label>
                    {#if selectedOffer.images.length > 0}
                        <div class="grid grid-cols-3 gap-2 mt-2 border p-2 rounded-lg">
                            {#each selectedOffer.images as image, i}
                                <div class="relative">
                                    <img src={image} alt="Aperçu" class="w-full h-24 object-cover rounded">
                                    <button type="button" on:click={() => removeImage(i)} class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">X</button>
                                </div>
                            {/each}
                        </div>
                    {/if}
                    <input type="hidden" name="existing_images" value={JSON.stringify(selectedOffer.images)}>
                    <label for="images" class="block text-sm font-medium text-gray-700 mt-2">Ajouter de nouvelles images</label>
                    <input type="file" id="images" name="images" multiple accept="image/*" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amicale-light-green file:text-amicale-green hover:file:bg-green-100">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Liens & Documents</label>
                    {#if selectedOffer.links.length > 0}
                        <div class="space-y-2 mt-2 border p-2 rounded-lg">
                            {#each selectedOffer.links as link, i}
                                <div class="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                                    <a href={link.url} target="_blank" class="text-blue-600 hover:underline truncate pr-4">{link.label}</a>
                                    <button type="button" on:click={() => removeLink(i)} class="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">X</button>
                                </div>
                            {/each}
                        </div>
                    {/if}
                    <label for="pdfs" class="block text-sm font-medium text-gray-700 mt-2">Ajouter de nouveaux PDF</label>
                    <input type="file" id="pdfs" name="pdfs" multiple accept="application/pdf" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amicale-light-green file:text-amicale-green hover:file:bg-green-100">
                    <label for="manual_links" class="block text-sm font-medium text-gray-700 mt-2">Ajouter des liens manuels (Format: Texte | URL)</label>
                    <textarea id="manual_links" name="manual_links" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>

                <div class="flex justify-end pt-4 space-x-3">
                    <button type="button" on:click={closeModal} class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Annuler</button>
                    <button type="submit" class="px-4 py-2 bg-amicale-green text-white rounded-md hover:bg-green-700">Enregistrer</button>
                </div>
                 {#if form?.success}
                    <p class="text-sm text-green-600 text-center">Opération réussie ! La page va se rafraîchir.</p>
                    <script>
                        onMount(() => {
                            if (form?.success) {
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            }
                        });
                    </script>
                 {/if}
                 {#if form?.error}
                    <p class="text-sm text-red-600 text-center">{form.error}</p>
                 {/if}
            </form>
        </div>
    </div>
{/if}