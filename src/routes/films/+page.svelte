<script lang="ts">
  import type { FilmLocal } from '$lib/types/Film.dto.types';
	import { onMount } from 'svelte';;
	import type { PageProps } from '../$types';
  
let { data }: PageProps = $props();
// onMount(() => {
//       console.log('films on mount', films); // toujours rempli côté client après SSR

// })

</script>

<h1 class="text-2xl font-bold mb-4">Redpill — Mes films</h1>

{#if !data}
  <p>Aucun film enregistré pour le moment.</p>
{:else}
  <ul class="space-y-2">
    {#each data.films as film}
      <li class="border-b py-2">
        <strong>{film.title}</strong>
      </li>
    {/each}
  </ul>
{/if}