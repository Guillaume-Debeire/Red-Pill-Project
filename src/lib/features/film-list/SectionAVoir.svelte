<script lang="ts">
	import FilmCard from "$lib/components/cards/film-card/FilmCard.svelte";
	import RedirectFilmCard from "$lib/components/cards/film-card/RedirectFilmCard.svelte";
	import type { UserFilmEntryClient } from "$lib/types/FilmUser.types";
   
  export let userFilmEntryClients: UserFilmEntryClient[];
  
  const toWatch = userFilmEntryClients.filter(
    (entry) => entry.entryStatus === 'A_VOIR'
  );
</script>

<section class="space-y-4">
  <h2 class="text-xl font-semibold text-blue-400">
    À voir ({toWatch.length})
  </h2>

  <!-- { TODO: Réparer cette merde } -->
  {#if toWatch.length === 0}
    <RedirectFilmCard />
  {:else}
    <ul class="flex flex-wrap gap-4">
      {#each toWatch as entry}
        <li class="bg-neutral-800 rounded-lg shadow">
          <FilmCard userFilmEntryClient={entry} />
        </li>
      {/each}
      <li>
        <RedirectFilmCard />
      </li>
    </ul>
  {/if}
</section>