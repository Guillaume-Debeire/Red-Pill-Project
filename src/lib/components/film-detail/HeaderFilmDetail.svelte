<script lang="ts">
	import type { UserFilmEntryClient } from "$lib/types/FilmUser.types";
	import FilmTitle from "../layout/film-details/FilmTitle.svelte";
	import FilmPoster from "../transition/FilmPoster.svelte";
	import PosterNotFound from "../transition/PosterNotFound.svelte";

  export let userFilmEntryClient: UserFilmEntryClient;
  console.log('userfilm', userFilmEntryClient)
</script>

<div class="relative">


      <div class="absolute bottom-4 left-4 right-4 flex gap-6">
        <div class="min-w-32 min-h-48">

          {#if userFilmEntryClient.film.posterPath}
          <FilmPoster film={userFilmEntryClient.film} />
          {:else}
          <PosterNotFound title="N/A" />
          {/if}
        </div>

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

