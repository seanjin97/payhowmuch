<script lang="ts">
	import { expoInOut } from 'svelte/easing';
	import { sharingItems, people, sharingItemsCount } from '$lib/store';
	import { slide } from 'svelte/transition';
	import Button from '../common/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import type { SharingItem as SharingItemType } from '$lib/types';
	import SharingItem from './SharingItem.svelte';
	import Modal from '../common/Modal.svelte';

	const dispatch = createEventDispatcher();
	let modalOpen = false;

	const scrollToTop = () => {
		dispatch('scrollToTop');
	};

	const resetItemList = () => {
		$sharingItems = [];
	};
	const addItem = () => {
		const newItem = {
			id: uuidv4(),
			name: `Shared item ${$sharingItemsCount + 1}`,
			subtotal: 0,
			sharers: $people,
		};
		$sharingItems = [newItem, ...$sharingItems];
		updateItemToPeople(newItem);
		$sharingItemsCount++;
		scrollToTop();
	};

	const updateItem = (event: CustomEvent<{ updatedItem: SharingItemType }>) => {
		const index = $sharingItems.findIndex((item) => item.id === event.detail.updatedItem.id);
		const modifiedList = $sharingItems;
		modifiedList[index] = event.detail.updatedItem;
		$sharingItems = modifiedList;
		updateItemToPeople(event.detail.updatedItem);
	};

	const deleteItem = (event: CustomEvent<{ sharedItem: SharingItemType }>) => {
		const removedItemList = $sharingItems.filter(
			(item) => item.id !== event.detail.sharedItem.id,
		);
		$sharingItems = removedItemList;
		event.detail.sharedItem.sharers = [];
		updateItemToPeople(event.detail.sharedItem);
		$sharingItemsCount -= 1;
	};

	const updateItemToPeople = (updatedSharedItem: SharingItemType) => {
		const updatedPeopleList = $people;
		const sharerIds = updatedSharedItem.sharers.map((sharer) => sharer.id);

		updatedPeopleList.forEach((person) => {
			if (sharerIds.includes(person.id)) {
				const checkIfAlreadyAdded = person.sharedItems.findIndex(
					(item) => item.id === updatedSharedItem.id,
				);
				if (checkIfAlreadyAdded !== -1) {
					person.sharedItems[checkIfAlreadyAdded] = updatedSharedItem;
				} else {
					person.sharedItems = [...person.sharedItems, updatedSharedItem];
				}
			} else {
				person.sharedItems = person.sharedItems.filter(
					(item) => item.id !== updatedSharedItem.id,
				);
			}
		});
		$people = updatedPeopleList;
	};
</script>

<div class="mt-4" transition:slide|local={{ easing: expoInOut }}>
	<h3 class="font-bold text-md opacity-80">What items are being shared?</h3>
	<div class="flex justify-between items-center">
		<Button styleProps="btn-circle mt-4 mb-2 hover:opacity-80" on:click={addItem}>
			<i class="fa-solid fa-plus" />
		</Button>
		{#if $sharingItems.length > 0}
			<Button
				on:click={() => (modalOpen = true)}
				styleProps="btn-error btn-xs hover:opacity-80"
				>Reset <i class="ml-1 fa-solid fa-circle-minus" /></Button
			>
		{/if}
	</div>
	{#if $sharingItems.length !== 0}
		<div>
			{#each $sharingItems as item (item.id)}
				<SharingItem bind:item on:removeItem={deleteItem} on:updateItem={updateItem} />
			{/each}
		</div>
	{/if}
</div>

<Modal on:primaryAction={resetItemList} bind:modalOpen>
	<span slot="header">
		<i class="fa-solid fa-exclamation fa-2xl text-warning bold" />
	</span>

	<span slot="body"
		>Are you sure you want to <span class="underline decoration-4 decoration-error">reset</span>
		this list?</span
	>
	<span slot="secondary">This action is permanent and you will not be able to undo it.</span>
	<span slot="secondaryButton">Cancel</span>
	<span slot="actionButton">Confirm</span>
</Modal>
