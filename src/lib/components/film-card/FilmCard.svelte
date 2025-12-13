<script lang="ts">
	import type { UserFilmEntryClient } from "$lib/types/FilmUser.types";

  export let userFilmEntryClient: UserFilmEntryClient;
</script>


<article class="group relative w-[101px] h-[152px]  lg:w-[202px] lg:h-[304px] rounded-lg overflow-hidden">
  <a href={`/film/${userFilmEntryClient.filmId}`}>
    {#if userFilmEntryClient.film.posterPath}
      <img class="absolute group-hover:scale-110  transition-all duration-700 h-full w-full object-cover" src={`https://image.tmdb.org/t/p/w300${userFilmEntryClient.film.posterPath}`} alt="film-poster" />
    {:else}
      <p class="absolute h-full w-full text-[rgba(0, 0, 0, 0.2)]">N/A</p>
    {/if}  
  </a>
</article>