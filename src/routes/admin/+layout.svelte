<div class="admin-layout bg-gray-100 min-h-screen">
    <aside class="bg-gray-800 text-white w-64 min-h-screen p-6 fixed">
        <h1 class="text-2xl font-serif font-bold border-b border-gray-600 pb-4">Administration</h1>
<nav class="mt-8 space-y-2">
    <a href="/admin" class="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">Tableau de bord</a>
    <a href="/admin/accueil" class="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">Gérer l'Accueil</a>
    <a href="/admin/offres" class="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">Gérer les Offres</a> <a href="/admin/partenaires" class="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">Gérer les Partenaires</a>
    </nav>
    </aside>

    <main class="ml-64 p-8">
        <div class="bg-white p-8 rounded-xl shadow-lg">
            <slot />
        </div>
    </main>
</div>