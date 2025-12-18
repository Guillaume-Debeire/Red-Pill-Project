<script lang="ts">
	import type { UserCollectionEntryClient } from "$lib/types/UserCollection.types";

  export let collection: UserCollectionEntryClient["collection"] 
</script>

<img
  src={`https://image.tmdb.org/t/p/w300${collection.posterPath}`}
  alt={collection.name}
  class="w-40 rounded-lg shadow"
/>