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
    status: "A_VOIR"
  })}
  disabled={saving || userFilmEntryClient.userStatus === "A_VOIR"}
>
  {#if saving}
    Ajout en cours…
  {:else if userFilmEntryClient.userStatus === "A_VOIR"}
    ✔ Film ajouté
  {:else}
    Ajouter à mes films à voir
  {/if}
</button>