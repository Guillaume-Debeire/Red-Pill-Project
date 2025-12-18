<script lang="ts">
  import { changeStatus } from "$lib/services/changeStatus";
  import type { UserFilmEntryClient } from "$lib/types/FilmUser.types";
	import ButtonAddWatchedList from "./button-add-watched-list/ButtonAddWatchedList.svelte";

  export let userFilmEntryClient: UserFilmEntryClient;

  let savingWatched = false;
  let savingToWatch = false;

  const handleToWatch = async () => {
    if (savingToWatch) return;

    savingToWatch = true;

    try {
      await changeStatus({
        filmId: userFilmEntryClient.film.tmdbId,
        status: "A_VOIR"
      });

      // 🔥 UI instantanée
      userFilmEntryClient.entryStatus = "A_VOIR";
    } catch (e) {
      console.error(e);
    } finally {
      savingToWatch = false;
    }
  };

  const handleWatched = async () => {
    if (savingWatched) return;

    savingWatched = true;

    try {
      await changeStatus({
        filmId: userFilmEntryClient.film.tmdbId,
        status: "VU"
      });

      // 🔥 UI instantanée
     userFilmEntryClient = {
        ...userFilmEntryClient,
        entryStatus: "VU"
      };
    } catch (e) {
      console.error(e);
    } finally {
      savingWatched = false;
    }
  };

  $: labelWatched = savingWatched
  ? "Ajout en cours…"
  : userFilmEntryClient.film.releaseStatus !== "Released"
    ? "Pas encore sorti"
    : userFilmEntryClient.entryStatus === "VU"
      ? "✔ Film ajouté"
      : "Ajouter à mes films vus";

  $: labelToWatch = savingToWatch
  ? "Ajout en cours…"
  : userFilmEntryClient.film.releaseStatus !== "Released"
    ? "Pas encore sorti"
    : userFilmEntryClient.entryStatus === "A_VOIR"
      ? "✔ Film ajouté"
      : "Ajouter à mes films à voir";
      
</script>

<ButtonAddWatchedList 
  label={labelWatched}
  onClick={handleWatched}   
  disabled={
    savingWatched ||
    userFilmEntryClient.entryStatus === "VU" ||
    userFilmEntryClient.film.releaseStatus !== "Released"
  } 
/>

<ButtonAddWatchedList 
  label={labelToWatch}
  onClick={handleToWatch}   
  disabled={
    savingToWatch ||
    userFilmEntryClient.entryStatus === "A_VOIR"
  } 
/>

