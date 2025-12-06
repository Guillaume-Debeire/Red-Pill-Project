<script lang="ts">
  import { invalidate } from '$app/navigation';

  let email = '';
  let password = '';
  let error: string | null = null;
  let loading = false;

  async function handleLogin() {
    loading = true;
    error = null;

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      error = data.error ?? 'Erreur de connexion';
      loading = false;
      return;
    }

    // Invalide data + redirect
    await invalidate(() => true);
    window.location.href = '/films';
  }
</script>

<div class="max-w-md mx-auto mt-20 p-6 rounded-lg shadow-lg bg-white">
  <h1 class="text-2xl font-bold mb-6">Connexion</h1>

  {#if error}
    <p class="text-red-600 mb-4">{error}</p>
  {/if}

  <form on:submit|preventDefault={handleLogin} class="space-y-4">

    <div>
      <label class="font-semibold block mb-1">Email</label>
      <input
        class="w-full border p-2 rounded"
        type="email"
        bind:value={email}
        required
      />
    </div>

    <div>
      <label class="font-semibold block mb-1">Mot de passe</label>
      <input
        class="w-full border p-2 rounded"
        type="password"
        bind:value={password}
        required
      />
    </div>

    <button
      class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      disabled={loading}
    >
      {loading ? 'Connexion...' : 'Se connecter'}
    </button>

    <p class="text-sm mt-4 text-center">
      Pas encore de compte ?
      <a href="/signup" class="text-blue-600 hover:underline">Créer un compte</a>
    </p>

  </form>
</div>
