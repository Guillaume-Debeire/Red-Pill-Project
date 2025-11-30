<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import type { FilmDetails } from '$lib/types/film';
  import { getFilmByTmdbId } from '$lib/services/tmdb';
	import FilmTitle from '$lib/components/layout/film-details/FilmTitle.svelte';

  let film: FilmDetails | null = null;
  let loading = true;

  onMount(async () => {
    const id = Number($page.params.id); // <- $page reactive
    if (isNaN(id)) {
      console.error('ID invalide dans l’URL');
      loading = false;
      return;
    }

    try {
      film = await getFilmByTmdbId(id);
      console.log('film', film);
    } catch (err) {
      console.error('Erreur récupération film TMDb:', err);
      film = null;
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Chargement du film...</p>
{:else if !film}
  <p>Film non trouvé.</p>
{:else}
<div class="space-y-2">
  <FilmTitle film={film} />
  <p><strong>Note :</strong> {film.vote_average ?? 'N/A'} / 10</p>
  <p><strong>Genres :</strong> {film.genres?.map(g => g.name).join(', ') ?? 'N/A'}</p>
  <p><strong>Réalisateur :</strong> {film.production_companies?.map(c => c.name).join(', ') ?? 'N/A'}</p>
  <p><strong>Date de sortie :</strong> {film.release_date ?? 'N/A'}</p>
  <p><strong>Durée :</strong> {film.runtime ?? 'N/A'} min</p>
  <p><strong>Synopsis :</strong> {film.overview ?? 'Pas de synopsis'}</p>
  {#if film.poster_path}
    <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`} alt={film.title} class="mt-2 rounded" />
  {/if}
</div>
{/if}
