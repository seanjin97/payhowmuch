<script lang="ts">
	import type { Item, Person } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import PersonItem from './PersonItem.svelte';
	import PersonTitle from './PersonTitle.svelte';
	import { abbr, copyToClipboard, formatCopyText } from '$lib/handlers/util';
	import toast from 'svelte-french-toast';
	import { slide } from 'svelte/transition';
	import PersonAvatar from './PersonAvatar.svelte';
	import PersonAddItem from './PersonAddItem.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import PersonResult from './PersonResult.svelte';
	import { gst, svcCharge } from '$lib/store';
	import { theme } from '$lib/store';
	import { personCount } from '$lib/store';
	import { expoOut } from 'svelte/easing';
	import PersonSharedItems from './PersonSharedItems.svelte';

	const dispatch = createEventDispatcher();
	export let person: Person;
	let abbrName = abbr(person.name);
	export let expandedList: string[];
	$: displayItems = expandedList.includes(person.id);
	let underline = false;
	let editMode = false;
	let modalOpen = false;

	$: subtotal =
		person.subtotal +
		person.sharedItems.reduce(
			(prevValue, currValue) => prevValue + currValue.subtotal / currValue.sharers.length,
			0,
		);

	const setUnderline = () => {
		underline = true;
	};

	const unSetunderline = () => {
		underline = false;
	};

	const toggleShowItems = (event: any) => {
		event.preventDefault();
		if (event.target === event.currentTarget) {
			toggleView(!displayItems);
		}
	};

	const enableEditMode = () => {
		editMode = true;
		const updatedPerson = {
			...person,
			functionalProps: { ...person.functionalProps, isConfirmed: false },
		};
		dispatch('updatePerson', { updatedPerson });
		toggleView(true);
	};

	const saveChanges = () => {
		const sum = person.items.reduce((prevValue, currValue) => prevValue + currValue.price, 0);

		let updatedName = person.name;
		if (updatedName.length === 0) {
			$personCount++;
			const randomName = `Person ${$personCount}`;
			updatedName = randomName;
		}

		const updatedPerson = {
			...person,
			name: updatedName,
			subtotal: sum,
			functionalProps: { ...person.functionalProps, isConfirmed: true },
		};

		abbrName = abbr(updatedPerson.name);

		dispatch('updatePerson', { updatedPerson });

		editMode = false;
	};

	const addItem = (e: CustomEvent<{ name: string; price: number }>) => {
		const newItem: Item = { id: uuidv4(), name: e.detail.name, price: e.detail.price };
		const updatedItems = [...person.items, newItem];
		person = { ...person, items: updatedItems };
	};

	const deleteItem = (e: CustomEvent<{ id: string }>) => {
		const removedItemList = person.items.filter((item: Item) => item.id !== e.detail.id);
		person = { ...person, items: removedItemList };
	};

	const toggleView = (expand: boolean) => {
		dispatch('toggleView', { id: person.id, expand });
	};

	const copy = () => {
		copyToClipboard(
			formatCopyText(
				person.name,
				person.items,
				person.sharedItems,
				person.subtotal,
				$gst,
				$svcCharge,
			),
		);

		toast.success('Successfully copied!', {
			style: `background: ${$theme === 'winter' ? '#06142f' : '#202739'}; color: ${
				$theme === 'winter' ? '#b6c4eb' : '#b6c4eb'
			};`,
		});
	};

	const emitDeletePerson = () => {
		dispatch('removePerson', { id: person.id });
	};
</script>

<div
	class="card mb-4 border-solid border-2 relative overflow-visible max-w-[503px]"
	transition:slide|local={{ duration: 300, easing: expoOut }}
	on:mouseenter={setUnderline}
	on:mouseleave={unSetunderline}
>
	<div class="p-4 card-body hover:cursor-pointer" on:click={toggleShowItems}>
		<div class="flex items-center w-fit">
			<PersonAvatar {abbrName} styleProps={person.styleProps} />
			<PersonTitle
				bind:personName={person.name}
				{underline}
				colour={person.styleProps.primary}
				{editMode}
				styleProps="ml-2"
			/>
		</div>
		{#if displayItems}
			<div transition:slide|local class="cursor-auto">
				{#if editMode}
					<div transition:slide|local class="p-4">
						<PersonAddItem on:addItem={addItem} />
					</div>
				{/if}

				{#if person.items.length === 0}
					<div class="flex justify-center items-center p-2">
						<h4 class="opacity-80">
							No personal items added for this person. Click <Button
								styleProps="btn-xs btn-warning hover:opacity-80"
								on:click={enableEditMode}
							>
								<p>Edit</p>
								<i class="fa-solid fa-pen-to-square ml-1" />
							</Button> to add a personal item!
						</h4>
					</div>
				{/if}

				{#if person.items.length > 0 || person.sharedItems.length > 0}
					<div class="p-4 relative">
						<h4 class="font-bold underline">Item entries</h4>
						{#each person.items as item, index (item.id)}
							<PersonItem {item} {index} {editMode} on:deleteItem={deleteItem} />
						{/each}
						{#each person.sharedItems as sharedItem}
							<PersonSharedItems {sharedItem} />
						{/each}
						{#if !editMode}
							<div class="divider" />
							<PersonResult {subtotal} />
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div class="flex absolute top-2 right-2 justify-between items-center w-fill">
		{#if person.items.length > 0}
			<Button
				styleProps="btn-xs hover:opacity-80 {editMode
					? 'btn-disabled'
					: ''} btn-outline mr-1"
				on:click={copy}
			>
				<i class="fa-solid fa-copy ml-1" />
			</Button>
		{/if}

		{#if editMode}
			<Button styleProps="btn-xs btn-success hover:opacity-80 mr-1" on:click={saveChanges}>
				<p>Save</p>
				<i class="fa-solid fa-check ml-1" />
			</Button>
		{:else}
			<Button styleProps="btn-xs btn-warning hover:opacity-80 mr-1" on:click={enableEditMode}>
				<p>Edit</p>
				<i class="fa-solid fa-pen-to-square ml-1" />
			</Button>
		{/if}

		<Button on:click={() => (modalOpen = true)} styleProps="btn-xs btn-error  hover:opacity-80"
			><i class="fas fa-trash-alt" /></Button
		>
		<Modal on:primaryAction={emitDeletePerson} bind:modalOpen>
			<span slot="header">
				<i class="fa-solid fa-exclamation fa-2xl text-warning bold" />
			</span>

			<span slot="body"
				>Are you sure you want to <span class="underline decoration-4 decoration-error"
					>delete</span
				> this person?</span
			>
			<span slot="secondary"
				>This action is permanent and you will not be able to undo it.</span
			>
			<span slot="secondaryButton">Cancel</span>
			<span slot="actionButton">Confirm</span>
		</Modal>
	</div>
	<div class="absolute top-9 right-4">
		{#if displayItems}
			<i
				on:click={toggleShowItems}
				class="fa-solid fa-angle-up hover:opacity-60 hover:cursor-pointer"
			/>
		{:else}
			<i
				on:click={toggleShowItems}
				class="fa-solid fa-angle-down hover:opacity-60 hover:cursor-pointer"
			/>
		{/if}
	</div>
</div>
