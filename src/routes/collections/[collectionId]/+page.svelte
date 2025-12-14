<script lang="ts">
  import { onMount } from 'svelte';
  import type { UserCollectionEntryClient } from '$lib/types/UserCollection.types';
	import { getOrCreateCollectionEntryById } from '$lib/api/userCollectionEntry';
;

  export let params;

  let collection: UserCollectionEntryClient | null = null;
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      collection = await getOrCreateCollectionEntryById(Number(params.collectionId));
      console.log('collection en front: ', collection)
    } catch {
      error = 'Erreur lors du chargement de la collection';
    } finally {
      loading = false;
    }
  });

  $: totalFilms = collection?.collection.films.length ?? 0;
</script>

<div class="min-h-screen bg-neutral-900 text-white px-6 pt-20">
  {#if loading}
    <p class="text-zinc-400">Chargement de la collection…</p>

  {:else if error || !collection}
    <p class="text-red-400">{error ?? 'Collection introuvable'}</p>

  {:else}
    <!-- HEADER -->
    <div class="flex gap-6 items-end mb-10">
      {#if collection.collection.posterPath}
        <img
          src={`https://image.tmdb.org/t/p/w300${collection.collection.posterPath}`}
          alt={collection.collection.name}
          class="w-40 rounded-lg shadow"
        />
      {/if}

      <div class="space-y-2">
        <h1 class="text-3xl font-bold">
          {collection.collection.name}
        </h1>

        <p class="text-zinc-400">
          Statut : <span class="font-medium">{collection.entryStatus}</span>
        </p>

        {#if collection.rating}
          <p class="text-zinc-400">
            Note : {collection.rating} / 10
          </p>
        {/if}

        <p class="text-zinc-500 text-sm">
          {totalFilms} film{totalFilms > 1 ? 's' : ''}
        </p>
      </div>
    </div>

    <!-- FILMS -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">
        Films de la collection
      </h2>

      <ul class="flex flex-wrap gap-4">
        {#each collection.collection.films as film}
          <li class="bg-neutral-800 rounded-lg p-3 w-40 hover:bg-neutral-700 transition">
            <a href={`/film/${film.tmdbId}`}>
              {#if film.posterPath}
              <img
              src={`https://image.tmdb.org/t/p/w200${film.posterPath}`}
              alt={film.title}
              class="rounded mb-2"
              />
              {/if}
              
              <p class="text-sm font-medium leading-tight">
                {film.title}
              </p>
              
              {#if film.releaseDate}
              <p class="text-xs text-zinc-400">
                {new Date(film.releaseDate).getFullYear()}
              </p>
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</div>
