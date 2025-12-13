<script lang="ts">
  import FilmCard from '$lib/components/film-card/FilmCard.svelte';
  import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';

  export let data: {
    userFilmEntryClients: UserFilmEntryClient[];
  };

  const { userFilmEntryClients } = data;

  const toWatch = userFilmEntryClients.filter(
    (entry) => entry.userStatus === 'A_VOIR'
  );

  const watched = userFilmEntryClients.filter(
    (entry) => entry.userStatus === 'VU'
  );

  const notSeen = userFilmEntryClients.filter(
    (entry) => entry.userStatus === 'PAS_VU'
  );
</script>

<div class="min-h-screen bg-neutral-900 text-white px-4 pt-20">
  <div class="max-w-6xl mx-auto space-y-16">

    <h1 class="text-3xl font-bold text-center">
      🎬 Mes films
    </h1>

    {#if userFilmEntryClients.length === 0}
      <p class="text-center text-zinc-400">
        Aucun film enregistré pour le moment.
      </p>
    {:else}

      <!-- À VOIR -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold text-blue-400">
          À voir ({toWatch.length})
        </h2>

        {#if toWatch.length === 0}
          <p class="text-zinc-500">Aucun film à voir.</p>
        {:else}
          <ul class="flex flex-wrap gap-4">
            {#each toWatch as entry}
              <li class="bg-neutral-800 rounded-lg shadow">
                <FilmCard userFilmEntryClient={entry} />
              </li>
            {/each}
          </ul>
        {/if}
      </section>

      <!-- VUS -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold text-green-400">
          Vus ({watched.length})
        </h2>

        {#if watched.length === 0}
          <p class="text-zinc-500">Aucun film vu.</p>
        {:else}
          <ul class="flex flex-wrap gap-4">
            {#each watched as entry}
              <li class="bg-neutral-800 rounded-lg shadow">
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
              <li class="bg-neutral-800 rounded-lg shadow">
                <FilmCard userFilmEntryClient={entry} />
              </li>
            {/each}
          </ul>
        {/if}
      </section>

    {/if}
  </div>
</div>