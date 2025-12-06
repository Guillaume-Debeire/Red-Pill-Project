<script lang="ts">
  export let user: { id: number; email: string; username: string } | undefined;
</script>

<nav class="flex justify-between items-center px-6 py-4 bg-zinc-900 text-white">
  <a href="/" class="text-xl font-bold">Redpill</a>

  <div class="flex items-center gap-4">

    {#if user}
      <span class="opacity-80">Yo {user.username} 👊</span>

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
