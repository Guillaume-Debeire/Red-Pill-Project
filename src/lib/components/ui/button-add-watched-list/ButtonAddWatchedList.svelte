<script lang="ts">
  import { changeStatus } from "$lib/services/changeStatus";
  import type { UserFilmEntryClient } from "$lib/types/FilmUser.types";

  export let userFilmEntryClient: UserFilmEntryClient;

  let saving = false;

  const handleClick = async () => {
    if (saving) return;

    saving = true;

    try {
      await changeStatus({
        filmId: userFilmEntryClient.film.tmdbId,
        status: "VU"
      });

      // 🔥 UI instantanée
      userFilmEntryClient.entryStatus = "VU";
    } catch (e) {
      console.error(e);
    } finally {
      saving = false;
    }
  };
</script>


<button
  class="w-full sm:w-auto px-6 py-2 rounded-lg font-medium
          bg-blue-600 hover:bg-blue-700 transition
          disabled:opacity-50 disabled:cursor-not-allowed"
  on:click={handleClick}
  disabled={
    saving ||
    userFilmEntryClient.entryStatus === "VU" ||
    userFilmEntryClient.film.releaseStatus !== "Released"
  }
>
  {#if saving}
    Ajout en cours…
  {:else if userFilmEntryClient.film.releaseStatus !== "Released"}
    Pas encore sorti
  {:else if userFilmEntryClient.entryStatus === "VU"}
    ✔ Film ajouté
  {:else}
    Ajouter à mes films vus
  {/if}
</button>
