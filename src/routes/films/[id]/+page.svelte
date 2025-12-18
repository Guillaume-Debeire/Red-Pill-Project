<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
	import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';
	import HeaderFilmDetail from '$lib/components/film-detail/HeaderFilmDetail.svelte';
	import { getOrCreateFilmEntryByTmdbId } from '$lib/services/getOrCreateFilmEntryByTmdbId';
	import ActionButtons from '$lib/components/ui/action-buttons/ActionButtons.svelte';
  
  let userFilmEntryClient: UserFilmEntryClient | null;
  let loading = true;

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
        console.log('userFilmEntry', userFilmEntryClient)


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
    <div class="flex items-center justify-center min-h-[300px] gap-4 flex-col">
      <p class="text-red-400">Film non trouvé.</p>
      <a href="/search">Rechercher un autre film</a>
    </div>
    
  {:else}
    <!-- HERO -->      
     <div class="relative">
      <div class="h-[260px] ">
       {#if userFilmEntryClient.film.backdropPath}
       <div
       class="blur-xs bg-cover bg-center"
       style="background-image: url('https://image.tmdb.org/t/p/w780{userFilmEntryClient.film.backdropPath}')"
       ></div>
       <div class="absolute h-[105%] inset-0 bg-linear-to-t frm-black via-black/80 to-black/5"></div>
       {:else}
        <div class="absolute h-[105%] inset-0 bg-linear-to-t frm-black via-black/80 to-black/5"></div>
       {/if}
       </div>
      </div>
      
          <!-- CONTENT -->
          <div class="px-6 lg:px-20 space-y-6">
    <HeaderFilmDetail userFilmEntryClient={userFilmEntryClient} />

      <!-- ACTION -->
       <ActionButtons userFilmEntryClient={userFilmEntryClient} />

      <!-- SYNOPSIS -->
      <div class="space-y-2">
        <h3 class="text-xl font-semibold text-white">Synopsis</h3>
        <p class="text-zinc-300 leading-relaxed max-w-2xl">
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
        {#if userFilmEntryClient.film.originCountry}
        <div>
            <span class="block text-zinc-500">Pays d'origine</span>
           
            {userFilmEntryClient.film.originCountry.map((pays) => (
              pays
            ))
            
            }
        </div>
        {/if}

        <!-- redirige vers le site du film
        {#if userFilmEntryClient.film.homepage}
        <div>
            <span class="block text-zinc-500">homepage</span>
           
            <a href={userFilmEntryClient.film.homepage}>homepage</a>
        </div>
        {/if}   -->
      </div>
        
      {#if userFilmEntryClient.film.belongsToCollectionId}
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
