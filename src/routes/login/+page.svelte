<script lang="ts">
    import { fly } from 'svelte/transition';
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg" in:fly={{ y: 20 }}>
        <h2 class="text-3xl font-serif font-bold text-center text-gray-800">Accès Administration</h2>
        
        <form method="POST" class="space-y-6">
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input id="password" name="password" type="password" required class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amicale-green">
            </div>

            {#if form?.error}
                <p class="text-sm text-red-600">{form.error}</p>
            {/if}

            <div>
                <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-amicale-green rounded-lg hover:bg-green-700">
                    Se connecter
                </button>
            </div>
        </form>
    </div>
</div>