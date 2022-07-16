<script lang="ts">
	import Button from '$lib/components/common/Button.svelte';
	import { createEventDispatcher, onMount, tick } from 'svelte';

	let name = '';
	let price = '';
	let ref: any;

	const dispatch = createEventDispatcher();

	const setFocus = async () => {
		await tick();
		ref.focus();
	};

	const localAddItem = () => {
		if (!name || !price) {
			return;
		}

		dispatch('addItem', { name, price });
		name = '';
		price = '';
		setFocus();
	};

	onMount(() => {
		ref.focus();
	});
</script>

<form on:submit|preventDefault={localAddItem}>
	<div class="flex justify-between items-end my-2">
		<div class="form-control mr-2">
			<input
				type="text"
				placeholder="Item Name"
				class="input input-bordered input-xs w-full max-w-xs"
				bind:value={name}
				bind:this={ref}
			/>
		</div>
		<div class="form-control">
			<input
				type="number"
				placeholder="Price"
				class="input input-bordered input-xs w-full max-w-xs"
				bind:value={price}
			/>
		</div>

		<Button type="submit" styleProps="ml-2 btn-primary btn-xs" on:click={localAddItem}>
			<i class="fa-solid fa-plus" />
		</Button>
	</div>
</form>
