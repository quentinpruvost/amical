<script lang="ts">
    import { scale } from 'svelte/transition';

    // On déclare les props pour recevoir les données des contacts et de l'équipe
    export let contactsContent: any;
    export let teamContent: any;
        export let reglementUrl: string | undefined = undefined;
</script>

<section class="bg-gray-100 p-10 rounded-lg" transition:scale={{ duration: 500, start: 0.5 }}>
    <h2 class="text-amicale-green text-3xl text-center font-bold mb-8">Contacts et Équipe</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">Permanences</h3>
            <p class="text-gray-600">{contactsContent.permanences_intro}</p>
            <p class="font-bold mt-2">{contactsContent.permanences_horaires}</p>
            <p class="text-gray-600 mt-4">{contactsContent.permanences_ehpad}</p>
        </div>
        <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">Nous contacter</h3>
            <p class="text-gray-600">Email: <a href="mailto:{contactsContent.email}" class="text-amicale-green hover:underline">{contactsContent.email}</a> / poste {contactsContent.poste_telephonique}</p>
            <p class="text-gray-600">Téléphone: {contactsContent.telephone}</p>
        </div>
    </div>

    <div class="bg-white p-5 rounded-lg shadow mb-10">
        <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">L'équipe</h3>
        <ul class="list-disc list-inside space-y-1 text-gray-600">
            <li><strong class="font-bold">Présidente</strong> : {teamContent.presidente.nom}, {teamContent.presidente.role}</li>
            <li><strong class="font-bold">Vice-présidente</strong> : {teamContent.vice_presidente.nom}, {teamContent.vice_presidente.role}</li>
            <li><strong class="font-bold">Trésorière</strong> : {teamContent.tresoriere.nom}, {teamContent.tresoriere.role}</li>
            <li><strong class="font-bold">Trésorière adjointe</strong> : {teamContent.tresoriere_adjointe.nom}, {teamContent.tresoriere_adjointe.role}</li>
            <li><strong class="font-bold">Secrétaire</strong> : {teamContent.secretaire.nom}, {teamContent.secretaire.role}</li>
            <li><strong class="font-bold">Secrétaire adjointe</strong> : {teamContent.secretaire_adjointe.nom}, {teamContent.secretaire_adjointe.role}</li>
        </ul>
        <h4 class="font-bold text-gray-700 mt-5">Président d'honneur : <strong class="text-amicale-green">{teamContent.president_honneur}</strong></h4>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">Chargés de mission</h3>
            <ul class="list-disc list-inside text-gray-600">
                {#each teamContent.charges_mission as member}
                    <li>{member}</li>
                {/each}
            </ul>
        </div>
        <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">Membres actifs</h3>
            <ul class="list-disc list-inside text-gray-600">
                {#each teamContent.membres_actifs as member}
                    <li>{member}</li>
                {/each}
            </ul>
        </div>
    </div>

    <p class="text-center text-sm text-gray-500 mt-5">
        {#if reglementUrl}
            Consultez notre <a href={reglementUrl} target="_blank" rel="noopener noreferrer" class="text-amicale-green font-semibold hover:underline">règlement intérieur</a>.
        {/if}
    </p>
</section>