<script lang="ts">
	import type { UserFilmEntryClient } from "$lib/types/FilmUser.types";
	import FilmTitle from "../layout/film-details/FilmTitle.svelte";

  export let userFilmEntryClient: UserFilmEntryClient;
</script>

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