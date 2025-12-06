<script>
  import AutocompleteTMDB from '$lib/components/autocomplete/AutocompleteTMDB.svelte';

  function handleFilmSelect(event) {
    const film = event.detail;
   // Pré-remplir ton formulaire ici
  }
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white px-4">
  <div class="w-1/2">

    <AutocompleteTMDB on:select={handleFilmSelect} />
  </div>
</div>