<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
	import FilmTitle from '$lib/components/layout/film-details/FilmTitle.svelte';

  import { addFilmToUserList } from '$lib/services/addFilmToUserList';
	import type { FilmBaseDTO, FilmDetailsDTO } from '$lib/types/Film.dto.types';
	import type { Film, Prisma, UserFilm } from '@prisma/client';
	import type { UserFilmClient } from '$lib/types/FilmUser.types';
	import { getOrCreateFilmByTmdbId, getUserFilmById } from '$lib/services/tmdb';
  
  let userFilm: UserFilm | null;
  let userFilmClient: UserFilmClient;
  let film: Film | null;
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
      userFilm = await getOrCreateFilmByTmdbId(id);

      if (!userFilm) {
        return;
      }
      console.log('userFilm', userFilm)
      if (!userFilm.filmId) {
        throw new Error("filmId n'est pas bon")
      }

      const res = await fetch(`/api/films/${userFilm.filmId}`);

	if (!res.ok) {
		throw new Error('Failed to fetch user films');
	}

	const data = await res.json();

  console.log('data', data)
  film = data;


    } catch (err) {
      console.error('Erreur récupération film TMDb:', err);
      userFilm = null;
    } finally {
      loading = false;
    }
  });


async function handleAddFilm() {
  if (!userFilm) return;
  saving = true;

  try {
    // const userFilmInput: Prisma.UserFilmCreateInput = {
    //   user: user,
    //   userStatus: 'vu',     // ou 'to-watch' selon ton UI
    // };

    // console.log('userFilm', userFilmInput)

    // await addFilmToUserList({ input:userFilmInput, filmUser });
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
{:else if !userFilm || !film}
  <p>Film non trouvé.</p>
{:else}
<div class="space-y-2">
  <p>{userFilm.id}</p>
  <FilmTitle film={film} />
  <button 
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50" 
      on:click={handleAddFilm} 
      disabled={saving || saved}>
      {#if saving}Ajout en cours...{:else if saved}Film ajouté !{:else}Ajouter à mes films vus{/if}
    </button>
  <p><strong>Note :</strong> {film.voteAverage ?? 'N/A'} / 10</p>
  <!-- <p><strong>Genres :</strong> {film.genres?.map(g => g.name).join(', ') ?? 'N/A'}</p> -->
  <!-- <p><strong>Date de sortie :</strong> {film.releaseDate ?? 'N/A'}</p> -->
  <p><strong>Durée :</strong> {film.runtime ?? 'N/A'} min</p>
  <p><strong>Synopsis :</strong> {film.overview ?? 'Pas de synopsis'}</p>
  {#if film.posterPath}
    <img src={`https://image.tmdb.org/t/p/w300${film.posterPath}`} alt={film.title} class="mt-2 rounded" />
  {/if}
</div>
{/if}
