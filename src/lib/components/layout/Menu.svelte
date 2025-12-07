<script lang="ts">
	import type { UserSession } from "$lib/types/User.types";

  export let user: UserSession;

  const links = [
    { href: '/films', label: 'Films' },
    { href: '/search', label: 'Ajouter' },
    { href: '/dashboard', label: 'Stats' }
  ];
</script>

{#if user}
  <nav class="rounded-full bg-gray-200  max-w-5xl mx-auto px-2 py-1.5 flex items-center justify-between text-black">
    <div class="flex items-center gap-6">
      {#each links as link}
        <a
          href={link.href}
          class="text-sm w-full rounded-full px-4 py-2 hover:bg-white transition-colors"
        >
          {link.label}
        </a>
      {/each}
    </div>
  </nav>
{/if}
