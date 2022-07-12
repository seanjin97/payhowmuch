<script>
	import Calculator from '$lib/components/calculator/Calculator.svelte';
	import LightModeToggle from '$lib/components/common/LightModeToggle.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import People from '$lib/components/people/People.svelte';
	import Results from '$lib/components/results/Results.svelte';
	import Tax from '$lib/components/tax/Tax.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<svelte:head>
	<title>PayHowMuch</title>
</svelte:head>

<div>
	<div class="container mx-auto px-12 ">
		<div class="mt-2">
			<div class="flex justify-center">
				<div class="max-w-parent">
					<Hero />
					<Tax />
					<People />
					<!-- <Calculator />
					<Results /> -->
				</div>
			</div>
		</div>
	</div>

	<div class="fixed right-2 top-0 lg:right-4 mt-2 h-screen">
		<LightModeToggle />
	</div>
</div>

<!-- <Footer /> -->
