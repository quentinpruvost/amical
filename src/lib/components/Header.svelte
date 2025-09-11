<script>
    import { fly } from 'svelte/transition';
</script>

<header class="bg-amicale-light-green p-5 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-amicale-green text-2xl font-semibold">AMICALE DU PERSONNEL</h1>
        <nav>
            <ul class="flex space-x-5">
                <li><a href="/" class="text-gray-600 hover:text-amicale-green font-bold transition-colors">Accueil</a></li>
                <li><a href="/offres-loisirs" class="text-gray-600 hover:text-amicale-green font-bold transition-colors">Loisirs</a></li>
                <li><a href="/offres-partenaires" class="text-gray-600 hover:text-amicale-green font-bold transition-colors">Partenaires</a></li>
                <li><a href="/contacts" class="text-gray-600 hover:text-amicale-green font-bold transition-colors">Contacts</a></li>
            </ul>
        </nav>
    </div>
</header>