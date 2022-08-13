<script lang="ts">
	import Button from '../common/Button.svelte';
	import Sharing from '$lib/components/sharing/Sharing.svelte';
	import People from '../people/People.svelte';

	let swipeRight: boolean;
	let ref: any;

	const clickHandler = (direction: string) => {
		swipeRight = direction === 'right' ? true : false;
		scrollToTop();
	};

	const scrollToTop = () => {
		ref.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<div class="mt-8">
	<h2 class="font-bold text-lg opacity-80 mb-4" bind:this={ref}>What goes into the bill?</h2>
	<Button
		styleProps="{swipeRight ? 'btn-outline' : 'btn'} mr-2"
		on:click={() => clickHandler('left')}>People</Button
	>
	<Button styleProps={swipeRight ? 'btn' : 'btn-outline'} on:click={() => clickHandler('right')}
		>Shared Items</Button
	>
	<div>
		{#if swipeRight}
			<Sharing on:scrollToTop={scrollToTop} />
		{:else}
			<People on:scrollToTop={scrollToTop} />
		{/if}
	</div>
</div>
