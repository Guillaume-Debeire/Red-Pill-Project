<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import NavigationView from "./navigation.svelte"
	import "../app.css"

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} /> 
</svelte:head>

<div class="app min-h-screen">
	<NavigationView />

	<Navbar user={data.user} />
	
	<!-- Wrapper pour le contenu avec padding-top égal à la hauteur de la navbar -->
	<div class="content-wrapper h-full">
		{@render children()}
	</div>
</div>
