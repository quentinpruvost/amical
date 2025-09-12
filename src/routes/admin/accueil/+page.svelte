<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('./$types').ActionData} */
    export let form;

    let heroContent = { ...data.homepageContent.hero };
    let contactsContent = { ...data.homepageContent.contacts };
    let equipeContent = { ...data.homepageContent.equipe };

    // On transforme les tableaux en chaînes de caractères (une par ligne) pour les textareas
    let chargesMissionText = equipeContent.charges_mission.join('\n');
    let membresActifsText = equipeContent.membres_actifs.join('\n');
</script>

<h2 class="text-3xl font-serif font-bold text-gray-800 border-b pb-4 mb-8">Gestion de la Page d'Accueil</h2>

{#if data.error}
    <p class="text-red-500">{data.error}</p>
{:else}
    <form method="POST" action="?/updateHero" class="bg-gray-50 p-6 rounded-lg mb-12 border">
        <h3 class="text-2xl font-serif font-semibold text-amicale-green mb-4">Section Bannière d'Accueil</h3>
        <div class="space-y-4">
            <div>
                <label for="hero-title" class="block text-sm font-medium text-gray-700">Titre principal</label>
                <input type="text" id="hero-title" name="title" bind:value={heroContent.title} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div>
                <label for="hero-intro" class="block text-sm font-medium text-gray-700">Texte d'introduction</label>
                <textarea id="hero-intro" name="intro_1" bind:value={heroContent.intro_1} rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label for="hero-tarif" class="block text-sm font-medium text-gray-700">Tarif principal (€)</label>
                    <input type="text" id="hero-tarif" name="tarif_principal" bind:value={heroContent.tarif_principal} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label for="hero-annee" class="block text-sm font-medium text-gray-700">Année du tarif</label>
                    <input type="text" id="hero-annee" name="annee_tarif" bind:value={heroContent.annee_tarif} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label for="hero-tarif-etudiant" class="block text-sm font-medium text-gray-700">Tarif étudiant (€)</label>
                    <input type="text" id="hero-tarif-etudiant" name="tarif_etudiant" bind:value={heroContent.tarif_etudiant} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
            </div>
             <div>
                <label for="note-title" class="block text-sm font-medium text-gray-700">Titre de la note</label>
                <input type="text" id="note-title" name="note_title" bind:value={heroContent.note_title} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div>
                <label for="note-content" class="block text-sm font-medium text-gray-700">Contenu de la note</label>
                <input type="text" id="note-content" name="note_content" bind:value={heroContent.note_content} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div>
                <label for="note-inscription" class="block text-sm font-medium text-gray-700">Note sur l'inscription</label>
                <input type="text" id="note-inscription" name="note_inscription" bind:value={heroContent.note_inscription} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
        </div>
        <button type="submit" class="mt-4 px-4 py-2 bg-amicale-green text-white rounded-md hover:bg-green-700">Enregistrer</button>
        {#if form?.success && form?.section === 'hero'}<span class="ml-4 text-sm text-green-600">Modifications enregistrées !</span>{/if}
    </form>

    <form method="POST" action="?/updateContacts" class="bg-gray-50 p-6 rounded-lg mb-12 border">
        <h3 class="text-2xl font-serif font-semibold text-amicale-green mb-4">Section Contacts</h3>
        <div class="space-y-4">
            <div>
                <label for="contact-intro" class="block text-sm font-medium text-gray-700">Intro des permanences</label>
                <textarea id="contact-intro" name="permanences_intro" bind:value={contactsContent.permanences_intro} rows="2" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <div>
                <label for="contact-horaires" class="block text-sm font-medium text-gray-700">Horaires</label>
                <input type="text" id="contact-horaires" name="permanences_horaires" bind:value={contactsContent.permanences_horaires} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
             <div>
                <label for="contact-ehpad" class="block text-sm font-medium text-gray-700">Note EHPAD</label>
                <textarea id="contact-ehpad" name="permanences_ehpad" bind:value={contactsContent.permanences_ehpad} rows="2" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                    <label for="contact-email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="contact-email" name="email" bind:value={contactsContent.email} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label for="contact-poste" class="block text-sm font-medium text-gray-700">Poste téléphonique</label>
                    <input type="text" id="contact-poste" name="poste_telephonique" bind:value={contactsContent.poste_telephonique} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label for="contact-tel" class="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input type="text" id="contact-tel" name="telephone" bind:value={contactsContent.telephone} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
            </div>
        </div>
        <button type="submit" class="mt-4 px-4 py-2 bg-amicale-green text-white rounded-md hover:bg-green-700">Enregistrer</button>
        {#if form?.success && form?.section === 'contacts'}<span class="ml-4 text-sm text-green-600">Modifications enregistrées !</span>{/if}
    </form>
    
    <form method="POST" action="?/updateEquipe" class="bg-gray-50 p-6 rounded-lg border">
         <h3 class="text-2xl font-serif font-semibold text-amicale-green mb-4">Section Équipe</h3>
         <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Présidente</label>
                    <input type="text" name="presidente_nom" placeholder="Nom" bind:value={equipeContent.presidente.nom} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <input type="text" name="presidente_role" placeholder="Rôle" bind:value={equipeContent.presidente.role} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                 <div>
                    <label class="block text-sm font-medium text-gray-700">Vice-présidente</label>
                    <input type="text" name="vice_presidente_nom" placeholder="Nom" bind:value={equipeContent.vice_presidente.nom} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <input type="text" name="vice_presidente_role" placeholder="Rôle" bind:value={equipeContent.vice_presidente.role} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Trésorière</label>
                    <input type="text" name="tresoriere_nom" placeholder="Nom" bind:value={equipeContent.tresoriere.nom} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <input type="text" name="tresoriere_role" placeholder="Rôle" bind:value={equipeContent.tresoriere.role} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                 <div>
                    <label class="block text-sm font-medium text-gray-700">Trésorière adjointe</label>
                    <input type="text" name="tresoriere_adjointe_nom" placeholder="Nom" bind:value={equipeContent.tresoriere_adjointe.nom} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <input type="text" name="tresoriere_adjointe_role" placeholder="Rôle" bind:value={equipeContent.tresoriere_adjointe.role} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                 <div>
                    <label class="block text-sm font-medium text-gray-700">Secrétaire</label>
                    <input type="text" name="secretaire_nom" placeholder="Nom" bind:value={equipeContent.secretaire.nom} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <input type="text" name="secretaire_role" placeholder="Rôle" bind:value={equipeContent.secretaire.role} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Secrétaire adjointe</label>
                    <input type="text" name="secretaire_adjointe_nom" placeholder="Nom" bind:value={equipeContent.secretaire_adjointe.nom} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <input type="text" name="secretaire_adjointe_role" placeholder="Rôle" bind:value={equipeContent.secretaire_adjointe.role} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
            </div>
             <div>
                <label for="president-honneur" class="block text-sm font-medium text-gray-700">Président d'honneur</label>
                <input type="text" id="president-honneur" name="president_honneur" bind:value={equipeContent.president_honneur} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="charges-mission" class="block text-sm font-medium text-gray-700">Chargés de mission (un par ligne)</label>
                    <textarea id="charges-mission" name="charges_mission" bind:value={chargesMissionText} rows="10" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
                <div>
                    <label for="membres-actifs" class="block text-sm font-medium text-gray-700">Membres actifs (un par ligne)</label>
                    <textarea id="membres-actifs" name="membres_actifs" bind:value={membresActifsText} rows="10" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
            </div>
         </div>
        <button type="submit" class="mt-4 px-4 py-2 bg-amicale-green text-white rounded-md hover:bg-green-700">Enregistrer</button>
        {#if form?.success && form?.section === 'equipe'}<span class="ml-4 text-sm text-green-600">Modifications enregistrées !</span>{/if}
    </form>
{/if}