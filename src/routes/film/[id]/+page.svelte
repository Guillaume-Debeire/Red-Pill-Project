<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import type { FilmDetails } from '$lib/types/Film.types';
  import { getFilmByTmdbId } from '$lib/services/tmdb';
	import FilmTitle from '$lib/components/layout/film-details/FilmTitle.svelte';
	import type { FilmUserCreateInput } from '$lib/types/FilmUser.types';
	import { addFilmToUserList } from '$lib/services/addFilmToUserList';
	import type { FilmBaseDTO, FilmDetailsDTO } from '$lib/types/Film.dto.types';

  let film: FilmDetailsDTO | null = null;
  let loading = true;
  let saving = false;
  let saved = false;

  onMount(async () => {
    const id = Number($page.params.id); // <- $page reactive
    if (isNaN(id)) {
      console.error('ID invalide dans l’URL');
      loading = false;
      return;
    }

    try {
      film = await getFilmByTmdbId(id);
    } catch (err) {
      console.error('Erreur récupération film TMDb:', err);
      film = null;
    } finally {
      loading = false;
    }
  });


async function handleAddFilm() {
  if (!film) return;
  saving = true;

  try {
    const userFilmInput: FilmUserCreateInput = {
      filmId: film.tmdbId,
      userStatus: 'vu',        // ou 'to-watch' selon ton UI
    };

    await addFilmToUserList({ input:userFilmInput, film });
    saved = true;
  } catch (err) {
    console.error('Erreur ajout film:', err);      
    saved = false;
  } finally {
    saving = false;
  }
}

</script>

{#if loading}
  <p>Chargement du film...</p>
{:else if !film}
  <p>Film non trouvé.</p>
{:else}
<div class="space-y-2">
  <FilmTitle film={film} />
  <button 
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50" 
      on:click={handleAddFilm} 
      disabled={saving || saved}>
      {#if saving}Ajout en cours...{:else if saved}Film ajouté !{:else}Ajouter à mes films vus{/if}
    </button>
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
