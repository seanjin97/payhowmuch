<script lang="ts">
	import { priceFormatter } from '$lib/handlers/util';
	import type { Item } from '$lib/types';
	import { clickOutside } from '$lib/handlers/click_outside';
	import { createEventDispatcher } from 'svelte';

	export let item: Item;
	export let index: number;
	export let editMode: boolean;
	const dispatch = createEventDispatcher();

	let confirmDelete = false;
</script>

<div class="flex justify-between p-2 items-center">
	<div>
		<div class="flex items-center">
			{#if editMode}
				{#if confirmDelete}
					<div class="absolute left-0">
						<div
							class="tooltip tooltip-error tooltip-right"
							data-tip="Tap again to confirm delete"
							use:clickOutside
							on:outclick={() => (confirmDelete = false)}
							on:click={() => dispatch('deleteItem', { id: item.id })}
						>
							<i
								class="fa-solid fa-trash text-error hover:opacity-80 hover:cursor-pointer"
							/>
						</div>
					</div>
				{:else}
					<div class="absolute left-0">
						<i
							class="fa-solid fa-circle-minus text-error hover:opacity-80 hover:cursor-pointer"
							on:click={() => (confirmDelete = true)}
						/>
					</div>
				{/if}
			{/if}
			<p>
				<span class="font-bold italic">{index + 1}:</span>
				{item.name}
			</p>
		</div>
	</div>
	<div>
		<p>
			${priceFormatter.format(item.price)}
		</p>
	</div>
</div>
