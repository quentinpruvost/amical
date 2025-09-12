<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;

    const { stats, error } = data;
</script>

<h2 class="text-3xl font-serif font-bold text-gray-800 border-b pb-4 mb-6">Tableau de bord</h2>

{#if error}
    <p class="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
{:else}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 class="font-serif text-lg font-bold text-blue-800">Offres Loisirs</h3>
            <p class="text-5xl font-bold text-blue-900 mt-2">{stats.loisirs}</p>
        </div>
        <div class="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 class="font-serif text-lg font-bold text-green-800">Offres Permanentes</h3>
            <p class="text-5xl font-bold text-green-900 mt-2">{stats.permanentes}</p>
        </div>
        <div class="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h3 class="font-serif text-lg font-bold text-yellow-800">Partenaires</h3>
            <p class="text-5xl font-bold text-yellow-900 mt-2">{stats.partenaires}</p>
        </div>
    </div>

    <div>
        <h3 class="text-2xl font-serif font-bold text-gray-700 mb-4">Actions rapides</h3>
        <div class="flex flex-wrap gap-4">
            <a href="/admin/offres" class="flex-1 p-6 text-center bg-amicale-green text-white rounded-lg hover:bg-green-700 transition-colors">
                <span class="text-xl font-bold">+ Ajouter une Offre</span>
            </a>
            <a href="/admin/partenaires" class="flex-1 p-6 text-center bg-amicale-green text-white rounded-lg hover:bg-green-700 transition-colors">
                <span class="text-xl font-bold">+ Ajouter un Partenaire</span>
            </a>
            <a href="/admin/accueil" class="flex-1 p-6 text-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
                <span class="text-xl font-bold">Modifier la Page d'Accueil</span>
            </a>
        </div>
    </div>
{/if}