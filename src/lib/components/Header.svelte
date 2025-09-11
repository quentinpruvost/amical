<script lang="ts">
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';

    let mobileMenuOpen = false;

    // Fonction pour fermer le menu mobile (utile après un clic sur un lien)
    function closeMenu() {
        mobileMenuOpen = false;
    }
</script>

<header class="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-gray-200">
    <div class="container mx-auto flex justify-between items-center p-4">
        <a href="/" class="text-amicale-green text-xl font-bold tracking-wider">
            AMICALE DU PERSONNEL
        </a>

        <nav class="hidden md:flex items-center space-x-2">
            <a href="/" 
               class="px-4 py-2 text-gray-600 font-semibold relative transition-colors duration-300 hover:text-amicale-green"
               class:text-amicale-green={$page.url.pathname === '/'}
            >
                Accueil
                {#if $page.url.pathname === '/'}
                    <span class="absolute bottom-0 left-0 w-full h-0.5 bg-amicale-green" in:fly={{ y: 5, duration: 300 }}></span>
                {/if}
            </a>
            <a href="/offres-loisirs" 
               class="px-4 py-2 text-gray-600 font-semibold relative transition-colors duration-300 hover:text-amicale-green"
               class:text-amicale-green={$page.url.pathname.startsWith('/offres-loisirs')}
            >
                Offres
                {#if $page.url.pathname.startsWith('/offres-loisirs')}
                    <span class="absolute bottom-0 left-0 w-full h-0.5 bg-amicale-green" in:fly={{ y: 5, duration: 300 }}></span>
                {/if}
            </a>
            <a href="/offres-partenaires" 
               class="px-4 py-2 text-gray-600 font-semibold relative transition-colors duration-300 hover:text-amicale-green"
               class:text-amicale-green={$page.url.pathname.startsWith('/offres-partenaires')}
            >
                Partenaires
                {#if $page.url.pathname.startsWith('/offres-partenaires')}
                    <span class="absolute bottom-0 left-0 w-full h-0.5 bg-amicale-green" in:fly={{ y: 5, duration: 300 }}></span>
                {/if}
            </a>
            </nav>

        <div class="md:hidden">
            <button on:click={() => mobileMenuOpen = !mobileMenuOpen} class="text-amicale-green focus:outline-none" aria-label="Ouvrir le menu">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    </div>

    {#if mobileMenuOpen}
        <div 
            class="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center md:hidden"
            in:fly={{ y: -30, duration: 300 }}
            out:fly={{ y: -30, duration: 300 }}
        >
            <button on:click={closeMenu} class="absolute top-6 right-6 text-gray-500" aria-label="Fermer le menu">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <nav class="flex flex-col items-center space-y-8">
                <a href="/" on:click={closeMenu} class="text-3xl font-bold text-gray-700 hover:text-amicale-green transition-colors">Accueil</a>
                <a href="/offres-loisirs" on:click={closeMenu} class="text-3xl font-bold text-gray-700 hover:text-amicale-green transition-colors">Offres</a>
                <a href="/offres-partenaires" on:click={closeMenu} class="text-3xl font-bold text-gray-700 hover:text-amicale-green transition-colors">Partenaires</a>
            </nav>
        </div>
    {/if}
</header>