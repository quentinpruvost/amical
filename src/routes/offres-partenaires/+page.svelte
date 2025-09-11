<script lang="ts">
	import { fly } from 'svelte/transition';

	// --- Définition des types (inchangé) ---
	type Partner = {
		id: number;
		category: string;
		title: string;
		description: string;
		website_url: string | null;
	};
	type PartnersByCategory = Record<string, Partner[]>;

	/** @type {import('./$types').PageData} */
	export let data;

	const partnersByCategory: PartnersByCategory = data.partnersByCategory;

	// --- Logique de recherche et de filtrage ---

	// Variables réactives pour les filtres
	let searchTerm = '';
	let selectedCategory = 'Toutes les catégories';

	// On extrait la liste des catégories une seule fois pour le menu déroulant
	const categories = ['Toutes les catégories', ...Object.keys(partnersByCategory)];

	// Variable réactive qui recalcule les partenaires à afficher quand un filtre change
	$: filteredPartnersByCategory = (() => {
		const result: PartnersByCategory = {};

		// On parcourt chaque catégorie de la liste originale
		for (const category in partnersByCategory) {
			// 1. Filtrage par catégorie sélectionnée
			if (selectedCategory !== 'Toutes les catégories' && category !== selectedCategory) {
				continue; // Si la catégorie ne correspond pas, on passe à la suivante
			}

			// 2. Filtrage par terme de recherche sur le nom
			const filteredPartners = partnersByCategory[category].filter((partner) =>
				partner.title.toLowerCase().includes(searchTerm.toLowerCase())
			);

			// Si la catégorie contient des partenaires après le filtrage, on l'ajoute au résultat
			if (filteredPartners.length > 0) {
				result[category] = filteredPartners;
			}
		}
		return result;
	})();
</script>

<div class="bg-gray-50 min-h-screen">
	<div class="container mx-auto px-4 py-12">
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-extrabold text-amicale-green mb-2">
				Nos Offres Partenaires
			</h1>
			<p class="text-lg text-gray-600">
				Remises immédiates sur présentation de votre carte d’adhérent.
			</p>
		</div>

		<div class="sticky top-4 z-10 bg-gray-50/80 backdrop-blur-md p-4 mb-10 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4">
			<div class="flex-grow">
				<label for="search" class="block text-sm font-medium text-gray-700 mb-1">Rechercher un partenaire</label>
				<input
					type="text"
					id="search"
					bind:value={searchTerm}
					placeholder="Ex: King Jouet, Dekra..."
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amicale-green focus:border-transparent transition"
				/>
			</div>
			<div class="flex-shrink-0 sm:w-64">
				<label for="category" class="block text-sm font-medium text-gray-700 mb-1">Filtrer par catégorie</label>
				<select
					id="category"
					bind:value={selectedCategory}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amicale-green focus:border-transparent transition"
				>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="space-y-12">
			{#each Object.entries(filteredPartnersByCategory) as [category, partners], i}
				<section in:fly={{ y: 20, duration: 500, delay: i * 50 }}>
					<h2 class="text-3xl font-bold text-gray-800 border-b-4 border-amicale-green pb-2 mb-8">
						{category}
					</h2>
					<div class="space-y-6">
						{#each partners as partner (partner.id)}
							<div class="bg-white p-6 rounded-lg shadow-md">
								<h3 class="text-xl font-bold text-amicale-green">{partner.title}</h3>
								<p class="text-gray-700 mt-1">{partner.description}</p>
								{#if partner.website_url}
									<a
										href={partner.website_url}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center text-sm text-blue-600 hover:underline mt-2"
									>
										Visiter le site web
										<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											></path></svg
										>
									</a>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/each}

			{#if Object.keys(filteredPartnersByCategory).length === 0}
				<div class="text-center py-16">
					<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
					<h3 class="mt-2 text-sm font-medium text-gray-900">Aucun partenaire trouvé</h3>
					<p class="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
				</div>
			{/if}
		</div>
	</div>
</div>