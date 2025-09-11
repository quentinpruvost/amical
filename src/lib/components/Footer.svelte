<script lang="ts">
    export let reglementUrl: string | undefined = undefined;
</script>

<footer class="bg-amicale-green text-white p-10 mt-10">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
            <h3 class="font-bold border-b-2 border-white pb-2 mb-2">AMICALE DU CH DE BAGNOLS-SUR-CÈZE</h3>
            <p>Adresse: CH au rez-de-chaussée du bâtiment Urbain Richard</p>
            <p>Horaires: Lundi et Jeudi de 12h30 à 15h30</p>
        </div>
        <div>
             <h3 class="font-bold border-b-2 border-white pb-2 mb-2">Contacts</h3>
            <p>Email: <a href="mailto:amicale@ch-bagnolssurceze.fr" class="hover:underline">amicale@ch-bagnolssurceze.fr</a></p>
            <p>Téléphone: 04.66.79.10.11 ou 06.51.53.19.23</p>
        </div>
        <div>
            <h3 class="font-bold border-b-2 border-white pb-2 mb-2">Liens</h3>
            <ul>
                 {#if reglementUrl}
                    <li><a href={reglementUrl} target="_blank" rel="noopener noreferrer" class="hover:underline">Règlement Intérieur</a></li>
                 {/if}
                <li><a href="/equipe" class="hover:underline">Notre Équipe</a></li>
            </ul>
        </div>
    </div>
</footer>