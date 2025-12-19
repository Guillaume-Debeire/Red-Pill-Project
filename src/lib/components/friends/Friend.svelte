<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	type User = {
		id: number;
		username: string;
		email: string;
	};

	const friends = writable<User[]>([]);
	const requests = writable<{ id: number; sender: User }[]>([]);
	const newFriendId = writable<number | null>(null);

	async function fetchFriends() {
		const res = await fetch('/api/friends');
		if (res.ok) friends.set(await res.json());
	}

	async function fetchRequests() {
		const res = await fetch('/api/friends/requests'); // à créer si tu veux les requests côté client
		if (res.ok) requests.set(await res.json());
	}

	async function sendRequest() {
		if (!newFriendId) return;
		const res = await fetch('/api/friends/requests', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ receiverId: $newFriendId })
		});
		if (res.ok) {
			alert('Demande envoyée !');
			newFriendId.set(null);
		} else {
			const err = await res.json();
			alert(err.error || 'Erreur');
		}
	}

	async function handleRequest(id: number, action: 'ACCEPT' | 'DECLINE' | 'BLOCK') {
		const res = await fetch(`/api/friends/requests/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action })
		});
		if (res.ok) {
			await fetchFriends();
			await fetchRequests();
		} else {
			alert('Erreur lors du traitement de la demande');
		}
	}

	onMount(async () => {
		await fetchFriends();
		await fetchRequests();
	});
</script>

<div class="min-h-full text-zinc-100 p-6">
  <div class="max-w-3xl mx-auto space-y-8">

    <!-- Mes amis -->
    <section class="bg-zinc-800 rounded-2xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Mes amis</h2>

      <ul class="space-y-2">
        {#each $friends as friend}
          <li class="flex items-center justify-between bg-zinc-700/50 rounded-lg px-4 py-2 hover:bg-zinc-700 transition">
            <span class="font-medium">{friend.username}</span>
          </li>
        {/each}

        {#if $friends.length === 0}
          <li class="text-sm text-zinc-400">Aucun ami pour le moment.</li>
        {/if}
      </ul>
    </section>

    <!-- Demandes d'amis -->
    <section class="bg-zinc-800 rounded-2xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Demandes d’amis</h2>

      <ul class="space-y-3">
        {#each $requests as req}
          <li class="flex items-center justify-between bg-zinc-700/50 rounded-lg px-4 py-3">
            <span class="font-medium">{req.sender.username}</span>

            <div class="flex gap-2">
              <button
                class="px-3 py-1 text-sm rounded-md bg-emerald-600 hover:bg-emerald-500 transition"
                on:click={() => handleRequest(req.id, 'ACCEPT')}
              >
                Accepter
              </button>

              <button
                class="px-3 py-1 text-sm rounded-md bg-amber-600 hover:bg-amber-500 transition"
                on:click={() => handleRequest(req.id, 'DECLINE')}
              >
                Refuser
              </button>

              <button
                class="px-3 py-1 text-sm rounded-md bg-red-600 hover:bg-red-500 transition"
                on:click={() => handleRequest(req.id, 'BLOCK')}
              >
                Bloquer
              </button>
            </div>
          </li>
        {/each}

        {#if $requests.length === 0}
          <li class="text-sm text-zinc-400">Aucune demande en attente.</li>
        {/if}
      </ul>
    </section>

    <!-- Ajouter un ami -->
    <section class="bg-zinc-800 rounded-2xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Ajouter un ami</h2>

      <div class="flex gap-3">
        <input
          type="number"
          bind:value={$newFriendId}
          placeholder="ID utilisateur"
          class="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          on:click={sendRequest}
          class="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium"
        >
          Envoyer
        </button>
      </div>
    </section>

  </div>
</div>
