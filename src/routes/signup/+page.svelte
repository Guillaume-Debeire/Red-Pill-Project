<script lang="ts">
  import { invalidate } from '$app/navigation';

  let email = '';
  let username = '';
  let password = '';
  let error: string | null = null;
  let loading = false;

  async function handleSignup() {
    loading = true;
    error = null;

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      error = data.error ?? 'Erreur création de compte';
      loading = false;
      return;
    }

    await invalidate(() => true);
    window.location.href = '/films';
  }
</script>

<div class="max-w-md mx-auto mt-20 p-6 rounded-lg shadow-lg bg-white">
  <h1 class="text-2xl font-bold mb-6">Créer un compte</h1>

  {#if error}
    <p class="text-red-600 mb-4">{error}</p>
  {/if}

  <form on:submit|preventDefault={handleSignup} class="space-y-4">

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
      <label class="font-semibold block mb-1">Nom d'utilisateur</label>
      <input
        class="w-full border p-2 rounded"
        type="text"
        bind:value={username}
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
      class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      disabled={loading}
    >
      {loading ? 'Création...' : 'Créer mon compte'}
    </button>

    <p class="text-sm mt-4 text-center">
      Déjà un compte ?
      <a href="/login" class="text-blue-600 hover:underline">Connexion</a>
    </p>

  </form>
</div>
