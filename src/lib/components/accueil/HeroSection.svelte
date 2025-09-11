<script>
    import { fade } from 'svelte/transition';
</script>

<section class="bg-blue-50 p-20 text-center rounded-lg mb-10" transition:fade={{ duration: 1000 }}>
    <div class="max-w-3xl mx-auto">
        <h2 class="text-amicale-green text-4xl font-extrabold mb-5">BIENVENUE SUR LA RUBRIQUE DÉDIÉE À L'AMICALE DU CENTRE HOSPITALIER !</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
            L'adhésion à l'Amicale est ouverte à tous les agents hospitaliers, qu'ils soient en activité ou bien en retraite, ainsi qu'aux étudiants de l'IFSI.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed mt-2">
            L'adhésion est valable pour <strong class="text-amicale-green font-bold">toute la famille</strong> (conjointe et enfants à charge) sur l'<strong class="text-amicale-green font-bold">année civile</strong> en cours (1er janvier au 31 décembre).
        </p>
        <div class="mt-8 p-6 bg-white rounded-lg shadow-inner">
            <p class="text-xl font-bold text-gray-800">Tarif = 15 € <span class="text-sm font-normal text-gray-500">(année 2025)</span></p>
            <p class="text-gray-600 mt-1">Tarif réduit pour les étudiants de l'IFSI = 7 €</p>
        </div>
        <div class="mt-8 p-6 bg-white rounded-lg shadow-inner">
            <h3 class="text-2xl font-bold text-amicale-green mb-2">À NOTER :</h3>
            <p class="text-lg text-gray-700">Cours de Yoga : reprise le <strong class="text-amicale-green">jeudi 02/10/2025</strong> - tarif : <strong class="text-amicale-green">120 €</strong> l'année.</p>
            <p class="text-gray-500 mt-1">Inscription auprès de l'Amicale.</p>
        </div>
    </div>
</section>