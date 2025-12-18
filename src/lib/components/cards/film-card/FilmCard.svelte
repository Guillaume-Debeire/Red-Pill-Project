<script lang="ts">
	import FilmPoster from "$lib/components/transition/FilmPoster.svelte";
	import PosterNotFound from "$lib/components/transition/PosterNotFound.svelte";
	import type { UserFilmEntryClient } from "$lib/types/FilmUser.types";

  export let userFilmEntryClient: UserFilmEntryClient;
</script>


<article class="group w-[101px] h-[152px]  lg:w-[151px] lg:h-[202px] rounded-lg overflow-hidden">
  <a href={`/films/${userFilmEntryClient.filmId}`}>
    {#if userFilmEntryClient.film.posterPath}
    <FilmPoster 
      film={userFilmEntryClient.film}
      className="group-hover:scale-110 transition-all duration-700 h-full w-full object-cover"
    />
    {:else}
      <PosterNotFound title={userFilmEntryClient.film.title} className="group-hover:scale-105 transition-all group-hover:text-gray-200" />
    {/if}  
  </a>
</article>