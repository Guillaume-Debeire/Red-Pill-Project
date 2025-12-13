<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
	import FilmTitle from '$lib/components/layout/film-details/FilmTitle.svelte';
	import type { Film, UserFilmEntry } from '@prisma/client';
	import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';
	import { getOrCreateFilmByTmdbId } from '$lib/services/tmdb';
	import { updateFilmStatus } from '$lib/api/userFilmEntry';
	import { changeStatus } from '$lib/services/changeStatus';
	import ButtonAddWatchlist from '$lib/components/ui/button-add-watchlist/ButtonAddWatchlist.svelte';
	import ButtonAddWatchedList from '$lib/components/ui/button-add-watched-list/ButtonAddWatchedList.svelte';
  
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
      userFilmEntryClient = await getOrCreateFilmByTmdbId(id);

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
    <div class="relative">
      {#if userFilmEntryClient.film.backdropPath}
        <div
          class="h-[260px] blur-xs bg-cover bg-center"
          style="background-image: url('https://image.tmdb.org/t/p/w780{userFilmEntryClient.film.backdropPath}')"
        />
        <div class="absolute h-[105%] inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      {/if}

      <div class="absolute bottom-4 left-4 right-4 flex gap-6">
        {#if userFilmEntryClient.film.posterPath}
          <img
            src={`https://image.tmdb.org/t/p/w300${userFilmEntryClient.film.posterPath}`}
            alt={userFilmEntryClient.film.title}
            class="w-32 rounded-lg shadow-lg"
          />
        {/if}

        <div class="flex flex-col justify-end gap-2">
          <FilmTitle film={userFilmEntryClient.film} />

          <div class="flex items-center gap-4 text-sm text-zinc-400">
            {#if userFilmEntryClient.film.releaseDate}
              <span>{new Date(userFilmEntryClient.film.releaseDate).getFullYear()}</span>
            {/if}
            {#if userFilmEntryClient.film.runtime}
              <span>{userFilmEntryClient.film.runtime} min</span>
            {/if}
            {#if userFilmEntryClient.film.voteAverage}
              <span>⭐ {userFilmEntryClient.film.voteAverage.toFixed(1)} / 10</span>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="p-6 space-y-6">

      <!-- ACTION -->
      <ButtonAddWatchedList userFilmEntryClient={userFilmEntryClient} saving={saving}/>

      <ButtonAddWatchlist userFilmEntryClient={userFilmEntryClient} saving={saving} />

      <!-- SYNOPSIS -->
      <div class="space-y-2">
        {userFilmEntryClient.film.releaseStatus}
        <h3 class="text-lg font-semibold text-white">Synopsis</h3>
        <p class="text-zinc-300 leading-relaxed">
          {userFilmEntryClient.film.overview ?? 'Pas de synopsis disponible.'}
        </p>
      </div>

      <!-- META -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-zinc-400">
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
      </div>

    </div>
    {/if}
  </div>
