<script lang="ts">
	import LightModeToggle from '$lib/components/common/LightModeToggle.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import People from '$lib/components/people/People.svelte';
	import Summary from '$lib/components/summary/Summary.svelte';
	import Tax from '$lib/components/tax/Tax.svelte';
	import { onMount } from 'svelte';
	import { people, theme } from '$lib/store';
	import { Toaster } from 'svelte-french-toast';
	import Button from '$lib/components/common/Button.svelte';
	import Bill from '$lib/components/bill/Bill.svelte';

	let top: any;

	onMount(() => {
		const existingTheme = localStorage.getItem('theme');
		if (!existingTheme) {
			const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
			$theme = prefersDarkMode.matches ? 'night' : 'winter';
			localStorage.setItem('theme', $theme);
			document.documentElement.setAttribute('data-theme', $theme);
		} else {
			$theme = existingTheme;
			document.documentElement.setAttribute('data-theme', $theme);
		}
	});

	const toggleDarkMode = () => {
		const updatedTheme = $theme === 'night' ? 'winter' : 'night';
		localStorage.setItem('theme', updatedTheme);
		$theme = updatedTheme;
		document.documentElement.setAttribute('data-theme', $theme);
	};

	const scrollToTop = () => {
		top.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<div class="flex-wrapper" bind:this={top}>
	<div class="px-10 flex justify-center mt-12">
		<div class="max-w-parent">
			<Hero />
			<Tax />
			<Bill />
			{#if $people.length > 0}
				<Summary />
			{/if}
		</div>
	</div>
</div>

<div class="fixed right-[6px] top-[5px] lg:right-4 mt-12 h-screen">
	<LightModeToggle on:click={toggleDarkMode} />
</div>
<div class="fixed right-[6px] bottom-5 lg:right-4">
	<Button styleProps="btn-accent btn-xs md:btn md:btn-accent" on:click={scrollToTop}
		><i class="fa-solid fa-chevron-up" /></Button
	>
</div>
<div class="mt-auto">
	<Footer />
</div>
<Toaster />

<style>
	.flex-wrapper {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
