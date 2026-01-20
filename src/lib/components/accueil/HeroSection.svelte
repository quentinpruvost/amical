<script lang="ts">
    import { fade } from 'svelte/transition';

    // On déclare une prop 'content' pour recevoir les données
    export let content: any;
</script>

<section class="bg-blue-50 p-10 md:p-20 text-center rounded-lg mb-10" transition:fade={{ duration: 1000 }}>
    <div class="max-w-3xl mx-auto">
        <h1 class="text-amicale-green text-3xl md:text-4xl font-extrabold mb-5">{content.title}</h1>
        <p class="text-gray-700 text-lg leading-relaxed">{content.intro_1}</p>
        <p class="text-gray-700 text-lg leading-relaxed mt-2">
            {@html `L'adhésion est valable pour <strong class="text-amicale-green font-bold">toute la famille</strong> (conjointe et enfants à charge) sur l'<strong class="text-amicale-green font-bold">année civile</strong> en cours (1er janvier au 31 décembre).`}
        </p>
        <div class="mt-8 p-6 bg-white rounded-lg shadow-inner">
            <p class="text-xl font-bold text-gray-800">Tarif = {content.tarif_principal} <span class="text-sm font-normal text-gray-500">(année {content.annee_tarif})</span></p>
            <p class="text-gray-600 mt-1">Tarif réduit pour les étudiants de l'IFSI = {content.tarif_etudiant}</p>
        </div>
        <div class="mt-8 p-6 bg-white rounded-lg shadow-inner">
            <h3 class="text-2xl font-bold text-amicale-green mb-2">{content.note_title}</h3>
            <p class="text-lg text-gray-700">{content.note_content}</p>
            <p class="text-gray-500 mt-1">{content.note_inscription}</p>
        </div>
    </div>
</section>