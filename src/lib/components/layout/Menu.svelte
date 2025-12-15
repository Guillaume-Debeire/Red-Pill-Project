<script lang="ts">
	import type { UserSession } from "$lib/types/User.types";
	import classNames from "classnames";
  import { page  } from "$app/state"

  export let user: UserSession;

  const links = [
    { href: '/films', label: 'Films' },
    { href: '/collections', label: 'Collections' },
    { href: '/search', label: 'Ajouter' },
    { href: '/dashboard', label: 'Stats' },
    { href: '/user/contacts', label: 'Contacts' }
  ];
</script>

{#if user}
  <nav class="rounded-full bg-gray-200  max-w-5xl mx-auto px-2 py-1.5 flex items-center justify-between text-black">
    <div class="flex items-center gap-6">
      {#each links as link}
      <div class="flex flex-col group">

        <a
        href={link.href}
        class={classNames(" text-sm w-full rounded-full px-4 py-2")}
        >
        {link.label}
      </a>
        <div class={classNames("transition-opacity rounded-full opacity-0 nav-item-underline mx-auto w-2/3 h-0.5 bg-black",
          {
            "opacity-100 navigation-item": page.url.pathname.startsWith(link.href)
          }
        )}>

        </div>
        </div>
      {/each}
    </div>
  </nav>
{/if}

<style>
  .navigation-item {
    view-transition-name: active-page;
  }
</style>