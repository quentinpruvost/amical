<script lang="ts">
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<h2 class="text-3xl font-serif font-bold text-gray-800 border-b pb-4 mb-6">Sécurité et Mots de Passe</h2>

<div class="max-w-xl mx-auto">
    <p class="mb-6 text-gray-600">
        Utilisez ce formulaire pour changer le mot de passe de l'utilisateur 'admin_modifiable'. Le mot de passe de l'administrateur principal ('admin_fixe') ne peut pas être modifié depuis cette interface.
    </p>

    <form method="POST" class="bg-gray-50 p-6 rounded-lg border space-y-4">
        <div>
            <label for="oldPassword" class="block text-sm font-medium text-gray-700">Ancien mot de passe</label>
            <input id="oldPassword" name="oldPassword" type="password" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
            <input id="newPassword" name="newPassword" type="password" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>

        {#if form?.error}
            <p class="text-sm text-red-600 bg-red-100 p-3 rounded-md">{form.error}</p>
        {/if}

        {#if form?.success}
            <p class="text-sm text-green-700 bg-green-100 p-3 rounded-md">{form.success}</p>
        {/if}

        <div class="pt-2">
            <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-amicale-green rounded-lg hover:bg-green-700">
                Changer le mot de passe
            </button>
        </div>
    </form>
</div>