<script>
    import { slide } from 'svelte/transition';

    const offers = [
        { title: "Nos offres Loisirs", description: "Découvrez des réductions sur vos activités préférées." },
        { title: "Nos offres permanentes", description: "Profitez d'avantages continus toute l'année." },
        { title: "Nos offres partenaires", description: "Accédez aux offres exclusives de nos partenaires." }
    ];
</script>

<section class="mb-10">
    <h2 class="text-amicale-green text-3xl text-center font-bold mb-8">Nos rubriques</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        {#each offers as offer (offer.title)}
            <div class="bg-gray-50 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center" transition:slide>
                <h3 class="text-amicale-green text-xl font-semibold mb-2">{offer.title}</h3>
                <p class="text-gray-600 mb-4">{offer.description}</p>
                <a href="#" class="inline-block px-5 py-2 bg-amicale-green text-white rounded-md hover:bg-green-700 transition-colors">Découvrir</a>
            </div>
        {/each}
    </div>
</section>