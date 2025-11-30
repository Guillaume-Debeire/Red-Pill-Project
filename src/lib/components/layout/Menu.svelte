<script>
  import { page } from '$app/state';

  const links = [
    { href: '/films', label: 'Films' },
    { href: '/search', label: 'Ajouter' },
    { href: '/dashboard', label: 'Stats' },
  ];
</script>

  <nav class="rounded-full bg-gray-200 absolute bottom-0 left-[50%] -translatex-[50%] max-w-5xl mx-auto px-2 my-12 py-1.5 flex items-center justify-between">
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
