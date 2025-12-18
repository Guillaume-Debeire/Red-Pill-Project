<script lang="ts">
	import Menu from "../layout/Menu.svelte";

  export let user: { id: number; email: string; username: string } | undefined;
</script>

<nav class="flex z-20 w-full justify-between min-h-20 items-center px-6 py-4 bg-linear-to-t from-black via-black/40 to-black/5 text-white">
  <a href="/" class="text-xl font-bold">Redpill</a>

  <div class="flex w-full items-center gap-4">

    {#if user}
      <Menu user={user} />

      <span class="opacity-80">{user.username.substring(0, 1)}.</span>

      <form method="POST" action="/logout">
        <button
          class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition">
          Déconnexion
        </button>
      </form>

    {:else}
      <a href="/login" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition">
        Connexion
      </a>
      <a href="/signup" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition">
        Inscription
      </a>
    {/if}

  </div>
</nav>
