<script lang="ts">
  import type { FilmDetails } from '$lib/types/Film.type';

  export let film: FilmDetails;
</script>

<div class=" text-center space-y-1">
  <h1 class="text-3xl font-bold">{film.title}</h1>
  {#if film.release_date}
    <p class="text-gray-500">{new Date(film.release_date).toLocaleDateString()}</p>
  {/if}
  {#if film.tagline}
    <p class="italic text-gray-400">"{film.tagline}"</p>
  {/if}
</div>