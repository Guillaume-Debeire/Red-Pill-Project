<script>
  import AutocompleteTMDB from '$lib/components/autocomplete/AutocompleteTMDB.svelte';

  function handleFilmSelect(event) {
    const film = event.detail;
   // Pré-remplir ton formulaire ici
  }
</script>

<AutocompleteTMDB on:select={handleFilmSelect} />