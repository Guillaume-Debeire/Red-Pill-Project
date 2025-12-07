<script lang="ts">
	import type { FilmDetails } from "$lib/schemas/tmdb/filmTMDB.schema";
	import type { Film } from "@prisma/client";


  export let film: Film;
</script>

<div class=" text-center space-y-1">
  <h1 class="text-3xl font-bold">{film.title}</h1>
  {#if film.releaseDate}
    <p class="text-gray-500">{new Date(film.releaseDate).toLocaleDateString()}</p>
  {/if}
  {#if film.tagline}
    <p class="italic text-gray-400">"{film.tagline}"</p>
  {/if}
</div>