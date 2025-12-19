<script lang="ts">
  import { changeStatus } from "$lib/services/changeStatus";
  import type { UserFilmEntryClient } from "$lib/types/FilmUser.types";
	import { en } from "zod/locales";
	import ButtonAddWatchedList from "./button-add-watched-list/ButtonAddWatchedList.svelte";
	import { EntryStatus } from "@prisma/client";

  export let userFilmEntryClient: UserFilmEntryClient;

  let savingWatched = false;
  let savingToWatch = false;
  let savingNotInteressed = false;

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

    const handleNotInteressed = async () => {
    if (savingNotInteressed) return;

    savingNotInteressed = true;

    try {
      await changeStatus({
        filmId: userFilmEntryClient.film.tmdbId,
        status: "PAS_INTERESSE"
      });

      // 🔥 UI instantanée
     userFilmEntryClient = {
        ...userFilmEntryClient,
        entryStatus: "PAS_INTERESSE"
      };
    } catch (e) {
      console.error(e);
    } finally {
      savingNotInteressed = false;
    }
  };

  $: labelWatched = savingWatched
  ? "Ajout en cours…"
  : userFilmEntryClient.film.releaseStatus !== "Released"
    ? "Pas encore sorti"
    : userFilmEntryClient.entryStatus === "VU"
      ? "Vu"
      : "Vu";

  $: labelToWatch = savingToWatch
  ? "Ajout en cours…"
    : userFilmEntryClient.entryStatus === "A_VOIR"
      ? "A voir"
      : "A voir";

  $: labelNotInteressed = savingNotInteressed
  ? "Suppression en cours…"
    : userFilmEntryClient.entryStatus === "A_VOIR"
      ? "Pas interessé"
      : "Pas interessé";
      
</script>

<div class="flex gap-4 flex-wrap">

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

<ButtonAddWatchedList 
label={labelNotInteressed}
onClick={handleNotInteressed}   
disabled={
  savingNotInteressed ||
  userFilmEntryClient.entryStatus === "PAS_INTERESSE"
} 
className={userFilmEntryClient.entryStatus === "PAS_INTERESSE" ? "" : "hover:bg-red-800"}
/>
</div>

