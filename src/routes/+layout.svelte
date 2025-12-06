<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Menu from '$lib/components/layout/Menu.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	
	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} /> 
	<Navbar user={data.user} />

<Menu user={data.user} />
</svelte:head>

{@render children()}
