<script lang="ts">
	import type { FilmWithCollection } from "$lib/types/FilmWithCollection.types";
	import classNames from "classnames";
  export let film: FilmWithCollection;
  export let className: string = "";
</script>

<img
  src={`https://image.tmdb.org/t/p/w200${film.posterPath}`}
  alt={film.title}
  class={classNames("film-card-image w-32 rounded-lg shadow-lg", className)}
  style:--poster="image-{film.tmdbId}" 
/>

<style>
  .film-card-image {
    view-transition-name: var(--poster);
  }
</style>
