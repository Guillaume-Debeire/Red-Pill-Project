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
			body: JSON.stringify({ receiverId: 1 })
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
		const res = await fetch(`/api/friends/request/${id}`, {
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

<div class="text-white">

  <h2>Mes amis</h2>
  <ul>
    {#each $friends as friend}
		<li>{friend.username}</li>
    {/each}
  </ul>
  
  <h2>Demandes d’amis</h2>
  <ul>
    {#each $requests as req}
		<li>
      {req.sender.username}
			<button on:click={() => handleRequest(req.id, 'ACCEPT')}>Accepter</button>
			<button on:click={() => handleRequest(req.id, 'DECLINE')}>Refuser</button>
			<button on:click={() => handleRequest(req.id, 'BLOCK')}>Bloquer</button>
		</li>
    {/each}
  </ul>
  
  <h2>Ajouter un ami</h2>
  <input type="number" bind:value={$newFriendId} placeholder="ID utilisateur" />
  <button on:click={sendRequest}>Envoyer demande</button>
</div>
