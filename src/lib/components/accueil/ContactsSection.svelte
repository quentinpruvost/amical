<script lang="ts">
	import { slide } from 'svelte/transition';

	export let contactsContent: any;
	export let teamContent: any;
	export let reglementUrl: string | undefined = undefined;

    // Variable pour gérer l'ouverture/fermeture des listes de membres
	let showMissionMembers = false;
	let showActiveMembers = false;
</script>

<section class="bg-gray-50 py-16 px-4">
	<div class="container mx-auto">
		<div class="text-center mb-12">
			<h2 class="text-4xl font-serif font-bold text-amicale-green">Contacts et Équipe</h2>
			<p class="text-gray-600 mt-2">Toutes les informations pour nous joindre et découvrir qui nous sommes.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
			<div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" in:slide|global>
				<div class="flex items-center mb-4">
					<div class="bg-amicale-light-green p-3 rounded-full mr-4">
						<svg class="w-6 h-6 text-amicale-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					</div>
					<h3 class="text-2xl font-serif font-bold text-gray-800">Permanences</h3>
				</div>
				<p class="text-gray-700 mb-3">{contactsContent.permanences_intro}</p>
				<p class="font-bold text-amicale-green text-lg">{contactsContent.permanences_horaires}</p>
				<p class="text-gray-600 mt-4 text-sm border-t pt-3">{contactsContent.permanences_ehpad}</p>
			</div>
			
			<div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" in:slide|global={{ delay: 150 }}>
				<div class="flex items-center mb-4">
					<div class="bg-amicale-light-green p-3 rounded-full mr-4">
						<svg class="w-6 h-6 text-amicale-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
					</div>
					<h3 class="text-2xl font-serif font-bold text-gray-800">Nous contacter</h3>
				</div>
				<div class="space-y-3 text-gray-700">
					<p><strong>Email:</strong> <a href="mailto:{contactsContent.email}" class="hover:underline">{contactsContent.email}</a> (Poste {contactsContent.poste_telephonique})</p>
					<p><strong>Téléphone:</strong> {contactsContent.telephone}</p>
				</div>
			</div>
		</div>

		<div class="bg-white p-8 rounded-xl shadow-lg" in:slide|global={{ delay: 300 }}>
			<h3 class="text-3xl font-serif font-bold text-center text-gray-800 mb-8">Le bureau de l'Amicale</h3>
			
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center mb-10">
				<div class="p-4"><strong class="block text-amicale-green">Présidente</strong> {teamContent.presidente.nom}</div>
				<div class="p-4"><strong class="block text-amicale-green">Vice-présidente</strong> {teamContent.vice_presidente.nom}</div>
				<div class="p-4"><strong class="block text-amicale-green">Trésorière</strong> {teamContent.tresoriere.nom}</div>
				<div class="p-4"><strong class="block text-amicale-green">Trésorière adj.</strong> {teamContent.tresoriere_adjointe.nom}</div>
				<div class="p-4"><strong class="block text-amicale-green">Secrétaire</strong> {teamContent.secretaire.nom}</div>
				<div class="p-4"><strong class="block text-amicale-green">Secrétaire adj.</strong> {teamContent.secretaire_adjointe.nom}</div>
			</div>
			
			<div class="text-center text-lg font-semibold text-gray-600 mb-10">
				Président d'honneur : <span class="font-serif text-amicale-green">{teamContent.president_honneur}</span>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
				<div>
					<button on:click={() => showMissionMembers = !showMissionMembers} class="w-full text-left font-serif text-xl font-bold text-gray-700 mb-3 flex justify-between items-center">
						Chargés de mission
						<svg class="w-5 h-5 transition-transform" class:-rotate-180={showMissionMembers} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
					</button>
					{#if showMissionMembers}
						<ul class="list-disc list-inside text-gray-600 space-y-1" transition:slide>
							{#each teamContent.charges_mission as member}<li>{member}</li>{/each}
						</ul>
					{/if}
				</div>
				<div>
					<button on:click={() => showActiveMembers = !showActiveMembers} class="w-full text-left font-serif text-xl font-bold text-gray-700 mb-3 flex justify-between items-center">
						Membres actifs
						<svg class="w-5 h-5 transition-transform" class:-rotate-180={showActiveMembers} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
					</button>
					{#if showActiveMembers}
						<ul class="list-disc list-inside text-gray-600 space-y-1" transition:slide>
							{#each teamContent.membres_actifs as member}<li>{member}</li>{/each}
						</ul>
					{/if}
				</div>
			</div>
		</div>

		<p class="text-center text-sm text-gray-500 mt-8">
			{#if reglementUrl}
				Consultez notre <a href={reglementUrl} target="_blank" rel="noopener noreferrer" class="font-semibold text-amicale-green hover:underline">règlement intérieur</a>.
			{/if}
		</p>
	</div>
</section>