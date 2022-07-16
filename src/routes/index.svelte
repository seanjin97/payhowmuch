<script>
	import LightModeToggle from '$lib/components/common/LightModeToggle.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import People from '$lib/components/people/People.svelte';
	import Summary from '$lib/components/summary/Summary.svelte';
	import Tax from '$lib/components/tax/Tax.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { people } from '$lib/store';
	import { spring } from 'svelte/motion';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<svelte:head>
	<title>PayHowMuch</title>
</svelte:head>

<div class="flex-wrapper">
	<div class="mx-auto px-8">
		<div class="mt-4">
			<div class="flex justify-center">
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
	</div>

	<div class="fixed right-0 top-2 lg:right-4 mt-2 h-screen">
		<LightModeToggle />
	</div>
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
