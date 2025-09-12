<script lang="ts">
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    // Définit la "forme" d'une offre pour que le code soit sûr
    type Link = { label: string; url: string; };
    type Offer = {
        id: number;
        type: 'loisirs_v2' | 'offres_permanentes';
        title: string;
        description: string;
        status: string;
        images: string[];
        links: Link[];
        imagesText?: string;
        linksText?: string;
    };

    /** @type {import('./$types').PageData} */
    export let data: { offers: Offer[] };

    /** @type {import('./$types').ActionData} */
    export let form;

    // Cette variable contient l'offre à modifier, ou est 'null' si la modale est fermée.
    let selectedOffer: Offer | null = null;

    // Cette fonction est appelée au clic sur "Modifier" ou "Ajouter"
    function openEditor(offer: Offer | null = null) {
        if (offer) {
            // Si on modifie, on copie l'offre existante
            selectedOffer = { ...offer };
        } else {
            // Si on ajoute, on crée une nouvelle offre vide
            selectedOffer = { type: 'loisirs_v2', title: '', description: '', status: '', images: [], links: [] };
        }
        
        // Prépare le texte pour les champs de formulaire
        selectedOffer.imagesText = selectedOffer.images.join('\n');
        selectedOffer.linksText = selectedOffer.links.map(l => `${l.label} | ${l.url}`).join('\n');
    }

    // Ferme la modale
    function closeModal() {
        selectedOffer = null;
    }

    // Demande une confirmation avant de supprimer
    function handleDelete(event: SubmitEvent) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
            event.preventDefault();
        }
    }
</script>

<h2 class="text-3xl font-serif font-bold text-gray-800 border-b pb-4 mb-6">Gestion des Offres (Loisirs & Permanentes)</h2>

<div class="text-right mb-6">
    <button on:click={() => openEditor()} class="px-5 py-2 bg-amicale-green text-white rounded-md hover:bg-green-700">
        + Ajouter une offre
    </button>
</div>

<div class="space-y-3">
    {#each data.offers as offer (offer.id + offer.type)}
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
    {/each}
</div>

{#if selectedOffer}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" on:click={closeModal}>
        <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation in:fly={{ y: 20 }}>
            <form method="POST" action="?/save" class="p-8 space-y-4">
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
                    <label for="images" class="block text-sm font-medium text-gray-700">Images (une URL par ligne)</label>
                    <textarea id="images" name="images" bind:value={selectedOffer.imagesText} rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
                <div>
                    <label for="links" class="block text-sm font-medium text-gray-700">Liens (Format: Texte du lien | URL)</label>
                    <textarea id="links" name="links" bind:value={selectedOffer.linksText} rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
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
            </form>
        </div>
    </div>
{/if}