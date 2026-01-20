<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>Page introuvable - Amicale</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-6xl font-bold text-amicale-green mb-4">404</h1>
    <p class="text-xl text-gray-600 mb-8">Oups ! La page que vous cherchez n'existe pas.</p>
    <a href="/" class="px-6 py-3 bg-amicale-green text-white rounded-lg hover:bg-green-700 transition shadow-lg">
        Retour à l'accueil
    </a>
</div>