<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllFilms } from '$lib/services/localdb';
  import type { Film } from '$lib/types/film';

  let films: Film[] = [];
  let loading = true;

  onMount(async () => {
    try {
      films = await getAllFilms(); // Dexie côté client uniquement
    } catch (err) {
      console.error('Erreur Dexie:', err);
      films = [];
    } finally {
      loading = false;
    }
  });
</script>

<h1 class="text-2xl font-bold mb-4">Redpill — Mes films</h1>

{#if loading}
  <p>Chargement...</p>
{:else if films.length === 0}
  <p>Aucun film enregistré pour le moment.</p>
{:else}
  <ul class="space-y-2">
    {#each films as film}
      <li class="border-b py-2">
        <strong>{film.title}</strong> ({film.year})
      </li>
    {/each}
  </ul>
{/if}