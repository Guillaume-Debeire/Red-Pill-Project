<script lang="ts">
	import StatCard from '$lib/components/ui/StatCard.svelte';
	import { computeDashboardStats } from '$lib/services/computeDashboardStats';
  import type { UserFilmEntryClient } from '$lib/types/FilmUser.types';

  export let data: {
    userFilmEntryClients: UserFilmEntryClient[];
  };

  const stats = computeDashboardStats(data.userFilmEntryClients);

  const hoursWatched = Math.floor(stats.totalRuntimeWatched / 60);
  const minutesWatched = stats.totalRuntimeWatched % 60;
</script>

<div class="min-h-screen bg-neutral-900 text-white px-6 pt-20">
  <div class="max-w-6xl mx-auto space-y-12">

    <h1 class="text-3xl font-bold">
      🎬 Dashboard
    </h1>

    <!-- KPI -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard label="Films vus" value={stats.watched} color="green" />
      <StatCard label="À voir" value={stats.toWatch} color="blue" />
      <StatCard label="Pas vus" value={stats.notSeen} color="red" />
      <StatCard label="Total" value={stats.total} />
    </div>

    <!-- TEMPS -->
    <div class="bg-neutral-800 rounded-xl p-6 space-y-2">
      <h2 class="text-xl font-semibold">⏱ Temps passé à regarder des films</h2>
      <p class="text-2xl font-bold">
        {hoursWatched}h {minutesWatched}min
      </p>
    </div>

    <!-- NOTE MOYENNE -->
    {#if stats.averageRating}
      <div class="bg-neutral-800 rounded-xl p-6 space-y-2">
        <h2 class="text-xl font-semibold">⭐ Note moyenne</h2>
        <p class="text-2xl font-bold">
          {stats.averageRating.toFixed(1)} / 10
        </p>
      </div>
    {/if}

    <!-- TOP FILM -->
    {#if stats.topRated}
      <div class="bg-neutral-800 rounded-xl p-6 space-y-2">
        <h2 class="text-xl font-semibold">🏆 Film le mieux noté</h2>
        <p class="text-lg">
          {stats.topRated.title}
        </p>
        <p class="text-zinc-400">
          Note : {stats.topRated.rating} / 10
        </p>
      </div>
    {/if}

  </div>
</div>
