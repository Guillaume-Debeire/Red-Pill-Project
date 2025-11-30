<script lang="ts">
    import { goto } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';
  import { searchTMDB } from '$lib/services/tmdb';
	import type { Film } from '$lib/types/film';

  const dispatch = createEventDispatcher();

  let query = '';
  let results: any[] = [];
  let loading = false;
  let open = false;
  let debounceTimer: NodeJS.Timeout;

  // Déclenché quand on clique sur un film
  function selectFilm(film: Film) {
    query = film.title;
    open = false;
    dispatch('select', film);
  }

  function gotoFilm(film: Film) {
    goto(`/film/${film.id}`);
  }

  // Recherche TMDb avec debounce
  async function handleInput() {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      if (query.trim().length < 2) {
        results = [];
        open = false;
        return;
      }

      loading = true;
      results = await searchTMDB(query);
      loading = false;

      open = results.length > 0;
    }, 300);
  }
</script>

<div class="relative w-full">
  <input
    type="text"
    bind:value={query}
    on:input={handleInput}
    placeholder="Rechercher un film..."
    class="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
  />

  {#if loading}
    <div class="absolute right-3 top-2.5 text-gray-400 text-sm">
      ...
    </div>
  {/if}

  {#if open}
    <ul
      class="absolute z-10 left-0 right-0 bg-white border rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg"
    >
      {#each results as film}
        <li
          class="px-3 py-2 cursor-pointer hover:bg-gray-100 flex gap-3 items-center"
        >
          <a class="w-full h-full" href={`/film/${film.id}`}
            >

            {#if film.poster_path}
            <img
            src={"https://image.tmdb.org/t/p/w92" + film.poster_path}
            alt=""
            class="w-10 h-14 rounded"
            />
            {/if}
            
            <div class="flex flex-col">
              <span class="font-medium">{film.title}</span>
              <span class="text-xs text-gray-500">
                {film.release_date?.slice(0, 4)}
              </span>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>