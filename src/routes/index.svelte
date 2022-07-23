<script lang="ts">
	import LightModeToggle from '$lib/components/common/LightModeToggle.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import People from '$lib/components/people/People.svelte';
	import Summary from '$lib/components/summary/Summary.svelte';
	import Tax from '$lib/components/tax/Tax.svelte';
	import { onMount } from 'svelte';
	import { people } from '$lib/store';

	let theme: string;

	onMount(() => {
		const existingTheme = localStorage.getItem('theme');
		if (!existingTheme) {
			const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
			theme = prefersDarkMode.matches ? 'night' : 'winter';
			localStorage.setItem('theme', theme);
			document.documentElement.setAttribute('data-theme', theme);
		} else {
			theme = existingTheme;
			document.documentElement.setAttribute('data-theme', theme);
		}
	});

	const toggleDarkMode = () => {
		const updatedTheme = theme === 'night' ? 'winter' : 'night';
		localStorage.setItem('theme', updatedTheme);
		theme = updatedTheme;
		document.documentElement.setAttribute('data-theme', theme);
	};
</script>

<svelte:head>
	<title>PayHowMuch</title>
</svelte:head>

<div class="flex-wrapper">
	<div class="px-8 flex justify-center mt-12">
		<div class="max-w-parent">
			<Hero />
			<Tax />
			<People />
			{#if $people.length > 0}
				<Summary />
			{/if}
		</div>
	</div>
</div>
<div class="fixed right-[4px] top-[5px] lg:right-4 mt-12 h-screen">
	<LightModeToggle {theme} on:click={toggleDarkMode} />
</div>
<div class="mt-auto">
	<Footer />
</div>

<style>
	.flex-wrapper {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
