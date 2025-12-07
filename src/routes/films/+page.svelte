<script lang="ts">
	import FilmCard from '$lib/components/film-card/FilmCard.svelte';
	import type { FilmUser } from '$lib/types/FilmUser.types';

  // SvelteKit fournit les données du load via `export let data`
  export let data: {
    films: FilmUser[];
  };

  const { films } = data;
  console.log('films', films)
</script>

<div class="min-h-screen flex flex-col items-center justify-start pt-20 bg-neutral-900 text-white px-4">
  <h1 class="text-2xl font-bold mb-6">Redpill — Mes films</h1>

  {#if !films || films.length === 0}
    <p>Aucun film enregistré pour le moment.</p>
  {:else}
    <ul class="w-[90%] max-w-5xl flex flex-wrap gap-4">
      {#each films as filmUser}
        <li class="bg-neutral-800 rounded-lg shadow">
          <FilmCard filmUser={filmUser} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
