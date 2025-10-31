<script>
    import { slide } from 'svelte/transition';

    const offers = [
        { 
            title: "Nos offres Loisirs", 
            description: "Découvrez des réductions sur vos activités préférées.",
            href: "/offres-loisirs?tab=loisirs",
            icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        { 
            title: "Nos offres permanentes", 
            description: "Profitez d'avantages continus toute l'année.",
            href: "/offres-loisirs?tab=permanentes",
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        { 
            title: "Nos offres partenaires", 
            description: "Accédez aux offres exclusives de nos partenaires.",
            href: "/offres-partenaires",
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        }
    ];
</script>

<section class="mb-10">
    <h2 class="text-amicale-green text-3xl text-center font-bold mb-10">Nos rubriques</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each offers as offer (offer.title)}
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center" transition:slide>
                <div class="w-14 h-14 bg-amicale-light-green rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg class="w-7 h-7 text-amicale-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={offer.icon}></path>
                    </svg>
                </div>
                <h3 class="text-gray-900 text-xl font-bold mb-3">{offer.title}</h3>
                <p class="text-gray-600 mb-6">{offer.description}</p>
                <a href={offer.href} class="inline-block px-6 py-2.5 bg-amicale-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Découvrir
                </a>
            </div>
        {/each}
    </div>
</section>