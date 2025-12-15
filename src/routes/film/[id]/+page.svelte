<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
	import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';
	import ButtonAddWatchlist from '$lib/components/ui/button-add-watchlist/ButtonAddWatchlist.svelte';
	import ButtonAddWatchedList from '$lib/components/ui/button-add-watched-list/ButtonAddWatchedList.svelte';
	import HeaderFilmDetail from '$lib/components/film-detail/HeaderFilmDetail.svelte';
	import { getOrCreateFilmEntryByTmdbId } from '$lib/services/getOrCreateFilmEntryByTmdbId';
  
  let userFilmEntryClient: UserFilmEntryClient | null;
  let loading = true;
  let saving = false;

  onMount(async () => {
    const id = Number($page.params.id); // <- $page reactive
    if (isNaN(id)) {
      console.error('ID invalide dans l’URL');
      loading = false;
      return;
    }

    try {
      userFilmEntryClient = await getOrCreateFilmEntryByTmdbId(id);
      if (!userFilmEntryClient) {
        return;
      }
      if (!userFilmEntryClient.filmId) {
        throw new Error("filmId n'est pas bon")
      }

    } catch (err) {
      console.error('Erreur récupération film TMDb:', err);
      userFilmEntryClient = null;
    } finally {
      loading = false;
    }
  });
</script>
  

<div class="bg-black text-zinc-200 overflow-hidden shadow-xl">
  {#if loading}
    <div class="flex items-center justify-center min-h-[300px] text-zinc-400">
      Chargement du film…
    </div>

  {:else if !userFilmEntryClient}
    <div class="flex items-center justify-center min-h-[300px] text-red-400">
      Film non trouvé.
    </div>
  {:else}
    <!-- HERO -->
    <HeaderFilmDetail userFilmEntryClient={userFilmEntryClient} />

    <!-- CONTENT -->
    <div class="p-6 space-y-6">

      <!-- ACTION -->
      <ButtonAddWatchedList userFilmEntryClient={userFilmEntryClient}/>

      <ButtonAddWatchlist userFilmEntryClient={userFilmEntryClient} />

      <!-- SYNOPSIS -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-white">Synopsis</h3>
        <p class="text-zinc-300 leading-relaxed">
          {userFilmEntryClient.film.overview ?? 'Pas de synopsis disponible.'}
        </p>
      </div>

      <!-- META -->
      <div class="grid bg-gray-800 rounded-lg p-5 grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-zinc-400">
        {#if userFilmEntryClient.film.originalLanguage}
          <div>
            <span class="block text-zinc-500">Langue</span>
            {userFilmEntryClient.film.originalLanguage.toUpperCase()}
          </div>
        {/if}

        {#if userFilmEntryClient.film.releaseStatus}
          <div>
            <span class="block text-zinc-500">Statut</span>
            {userFilmEntryClient.film.releaseStatus}
          </div>
        {/if}

        {#if userFilmEntryClient.film.budget}
          <div>
            <span class="block text-zinc-500">Budget</span>
            ${userFilmEntryClient.film.budget.toLocaleString()}
          </div>
        {/if}

        {#if userFilmEntryClient.film.revenue}
          <div>
            <span class="block text-zinc-500">Revenue</span>
            ${userFilmEntryClient.film.revenue.toLocaleString()}
          </div>
        {/if}  
        {#if userFilmEntryClient.dateWatched}
        <div>
            <span class="block text-zinc-500">Vu le</span>
           
            {userFilmEntryClient.dateWatched}
        </div>
      {/if}    
      </div>
        
      {#if userFilmEntryClient.film.belongsToCollection}
        <div>
            <span class="block text-zinc-500">Collection</span>
            <a class="px-2 py-1 rounded hover:bg-gray-800" href={`/collections/${userFilmEntryClient.film.belongsToCollection?.tmdbId}`}>
{userFilmEntryClient.film.belongsToCollection?.name}
            </a>
        </div>
      {/if}
    </div>
    {/if}
  </div>
