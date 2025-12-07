<script lang="ts">
	import type { FilmLocal } from "$lib/types/Film.dto.types";
	import type { FilmUser } from "$lib/types/FilmUser.types";

  export let filmUser: FilmUser;
</script>


<article class="relative w-[101px] h-[152px]  lg:w-[202px] lg:h-[304px] rounded-lg overflow-hidden">
{#if filmUser.film.posterPath}

<img class="absolute h-full w-full object-cover" src={`https://image.tmdb.org/t/p/w300${filmUser.film.posterPath}`} alt="film-poster" />
    {:else}
    <p class="absolute h-full w-full text-[rgba(0, 0, 0, 0.2)]">N/A</p>
    {/if}  
          
</article>