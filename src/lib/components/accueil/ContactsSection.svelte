<script>
    import { scale } from 'svelte/transition';

    const missionMembers = [
        "Patricia BLANC, retraitée",
        "Nathalie BORDARY, IDE de Nuit",
        "Myriam BURDEAU, IDE de nuit",
        "Jennifer CHAMPETIER, IDE, Urgences",
        "Cathy DAUDON, retraitée",
        "Annie GIRARD, retraitée",
        "Marilou PAVESI, retraitée",
        "Ginette PONTAUD, AS, stérilisation",
        "Mireille VELEZ, retraitée."
    ];

    const activeMembers = [
        "Estelle BELLENGER",
        "Mélanie CONSEIL",
        "Séverine FRACH",
        "Sandrine GAILLARD",
        "Pascale GERBON",
        "Marie-Jo GIRAUD",
        "Marie-Christine GUERRA",
        "Nathalie NIKOLIC",
        "Pascal PAVESI",
        "Ludovic PONTAUD",
        "Marie RAY",
        "Michel TABERNER",
        "Jean Luc VELEZ",
        "Marc VELEZ"
    ];
</script>

<section class="bg-gray-100 p-10 rounded-lg" transition:scale={{ duration: 500, start: 0.5 }}>
    <h2 class="text-amicale-green text-3xl text-center font-bold mb-8">Contacts et Équipe</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">Permanences</h3>
            <p class="text-gray-600">Les permanences seront assurées sur le CH au rez-de-chaussée du bâtiment Urbain Richard (suivre fléchage).</p>
            <p class="font-bold mt-2">Lundi et Jeudi de 12h30 à 15h30</p>
            <p class="text-gray-600 mt-4">Pour tout renseignement à l'EHPAD Les 7 Sources, notre correspondante est Cathy DAUDON (permanence le lundi de 12h30 à 15h).</p>
        </div>
        <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">Nous contacter</h3>
            <p class="text-gray-600">Email: <a href="mailto:amicale@ch-bagnolssurceze.fr" class="text-amicale-green hover:underline">amicale@ch-bagnolssurceze.fr</a> / poste 2016</p>
            <p class="text-gray-600">Téléphone: 04.66.79.10.11 ou 06.51.53.19.23</p>
        </div>
    </div>

    <div class="bg-white p-5 rounded-lg shadow mb-10">
        <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">L'équipe</h3>
        <ul class="list-disc list-inside space-y-1 text-gray-600">
            <li><strong class="font-bold">Présidente</strong> : Corinne BRAWANSKI, aide-soignante, Nuit</li>
            <li><strong class="font-bold">Vice-présidente</strong> : Laetitia POTARD, cadre de santé, Qualité</li>
            <li><strong class="font-bold">Trésorière</strong> : Barbara DUMARCHE, secrétaire, direction des soins</li>
            <li><strong class="font-bold">Trésorière adjointe</strong> : Audrey VIZCAINO, s ecrétaire médicale, cardiologie</li>
            <li><strong class="font-bold">Secrétaire</strong> : Sophie GUELLERIN, retraitée</li>
            <li><strong class="font-bold">Secrétaire adjointe</strong> : Martine TABERNER, retraitée</li>
        </ul>
        <h4 class="font-bold text-gray-700 mt-5">Président d'honneur : <strong class="text-amicale-green">Abel André</strong></h4>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">Chargés de mission</h3>
            <ul class="list-disc list-inside text-gray-600">
                {#each missionMembers as member}
                    <li>{member}</li>
                {/each}
            </ul>
        </div>
        <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-2">Membres actifs</h3>
            <ul class="list-disc list-inside text-gray-600">
                {#each activeMembers as member}
                    <li>{member}</li>
                {/each}
            </ul>
        </div>
    </div>

    <p class="text-center text-sm text-gray-500 mt-5">
        Consultez notre <a href="#" class="text-amicale-green font-semibold hover:underline">règlement intérieur</a>.
    </p>
</section>