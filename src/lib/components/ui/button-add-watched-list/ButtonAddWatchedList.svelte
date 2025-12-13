<script lang="ts">
	import { changeStatus } from "$lib/services/changeStatus";
	import type { UserFilmEntryClient } from "$lib/types/FilmUser.types";

  export let userFilmEntryClient: UserFilmEntryClient;
    export let saving: boolean;

</script>

<button
  class="w-full sm:w-auto px-6 py-2 rounded-lg font-medium
          bg-blue-600 hover:bg-blue-700 transition
          disabled:opacity-50 disabled:cursor-not-allowed"
  on:click={() => changeStatus({
    userFilmEntryClient,
    saving,
    status: "VU"
  })}
  disabled={saving || userFilmEntryClient.userStatus === "VU" || userFilmEntryClient.film.releaseStatus !== "Released"}
>
  {#if saving}
    Ajout en cours…
  {:else if userFilmEntryClient.film.releaseStatus !== "Released"}
    Pas encore sorti
  {:else if userFilmEntryClient.userStatus === "VU"}
    ✔ Film ajouté
  {:else}
    Ajouter à mes films vus
  {/if}
</button>