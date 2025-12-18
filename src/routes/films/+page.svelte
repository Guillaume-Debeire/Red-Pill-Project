<script lang="ts">
  import FilmCard from '$lib/components/cards/film-card/FilmCard.svelte';
	import RedirectFilmCard from '$lib/components/cards/film-card/RedirectFilmCard.svelte';
	import SectionAVoir from '$lib/features/film-list/SectionAVoir.svelte';
  import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';

  export let data: {
    userFilmEntryClients: UserFilmEntryClient[];
  };

  const { userFilmEntryClients } = data;

  const toWatch = userFilmEntryClients.filter(
    (entry) => entry.entryStatus === 'A_VOIR'
  );

  const watched = userFilmEntryClients.filter(
    (entry) => entry.entryStatus === 'VU'
  );

  const notSeen = userFilmEntryClients.filter(
    (entry) => entry.entryStatus === 'PAS_VU'
  );
</script>

<div class="min-h-screen bg-neutral-900 text-white px-4 py-20">
  <div class="max-w-6xl mx-auto space-y-16">

    <h1 class="text-3xl font-bold text-center list-title">
      🎬 Mes films
    </h1>

    {#if userFilmEntryClients.length === 0}
      <p class="text-center text-zinc-400">
        Aucun film enregistré pour le moment.
      </p>
    {:else}

      <!-- À VOIR -->
      <SectionAVoir userFilmEntryClients={userFilmEntryClients} />

      <!-- VUS -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold text-green-400">
          Vus ({watched.length})
        </h2>

        {#if watched.length === 0}
          <RedirectFilmCard />
        {:else}
          <ul class="flex flex-wrap gap-4">
            {#each watched as entry}
              <li class="rounded-lg shadow">
                <FilmCard userFilmEntryClient={entry} />
              </li>
            {/each}
          </ul>
        {/if}
      </section>

      <!-- PAS VUS -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold text-red-400">
          Consultés ({notSeen.length})
        </h2>

        {#if notSeen.length === 0}
          <p class="text-zinc-500">Aucun film dans cette catégorie.</p>
        {:else}
          <ul class="flex flex-wrap gap-4">
            {#each notSeen as entry}
              <li class="rounded-lg shadow">
                <FilmCard userFilmEntryClient={entry} />
              </li>
            {/each}
          </ul>
        {/if}
      </section>

    {/if}
  </div>
</div>

<style>
  .list-title{
    view-transition-name: list-title;
  }
</style>