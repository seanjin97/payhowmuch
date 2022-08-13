<script lang="ts">
	import type { SharingItem as SharingItemType } from '$lib/types';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import PersonTitle from '../people/person/PersonTitle.svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from '../common/Button.svelte';
	import { sharingItems, people } from '$lib/store';
	import Modal from '../common/Modal.svelte';
	import { abbr, priceFormatter } from '$lib/handlers/util';
	import PersonAvatar from '../people/person/PersonAvatar.svelte';
	import MultiSelect from 'svelte-multiselect';
	import type { Option } from 'svelte-multiselect';

	const dispatch = createEventDispatcher();

	let underline = false;
	let editMode = false;
	let modalOpen = false;
	export let item: SharingItemType;

	let sharingWith = item.sharers.map((person) => ({
		label: person.name,
		value: person.id,
	})) as Option[];

	$: validOptions = $people.map((person) => ({
		label: person.name,
		value: person.id,
	})) as Option[];

	const setUnderline = () => {
		underline = true;
	};

	const unSetunderline = () => {
		underline = false;
	};

	const enableEditMode = () => {
		editMode = true;
		const updatedItem = {
			...item,
		};
		dispatch('updatePerson', { updatedItem });
	};

	const saveChanges = () => {
		let updatedName = item.name;
		if (updatedName.length === 0) {
			const randomName = `Item ${$sharingItems.length}`;
			updatedName = randomName;
		}

		const updatedSharers = $people.filter((person) =>
			sharingWith.map((sharer) => sharer.value).includes(person.id),
		);

		const updatedItem = {
			...item,
			name: updatedName,
			subtotal: item.subtotal,
			sharers: updatedSharers,
		};

		dispatch('updateItem', { updatedItem });

		editMode = false;
	};

	const emitDeleteItem = () => {
		dispatch('removeItem', { sharedItem: item });
	};
</script>

<div
	class="card mb-4 border-solid border-2 relative overflow-visible max-w-[503px]"
	transition:slide|local={{ duration: 500, easing: expoOut }}
	on:mouseenter={setUnderline}
	on:mouseleave={unSetunderline}
>
	<div class="p-4 card-body hover:cursor-pointer ">
		<div class="flex items-center w-fit justify-between">
			<PersonTitle bind:personName={item.name} {underline} {editMode} />
			{#if editMode}
				<div class="form-control">
					<input
						type="number"
						placeholder="Price"
						class="input input-bordered text-sm input-xs max-w-xs card-title"
						style="width: 20%;"
						bind:value={item.subtotal}
					/>
				</div>
			{:else}
				<div class="ml-20 md:ml-28">
					<h3 class="double text-sm md:text-base card-title">
						${priceFormatter.format(item.subtotal)}
					</h3>
				</div>
			{/if}
		</div>
		<div class="p-4 w-full">
			<p>People sharing this:</p>
			{#if editMode}
				<MultiSelect
					outerDivClass="w-100 max-w-md"
					inputClass="input input-bordered text-sm input-xs"
					bind:selected={sharingWith}
					options={validOptions}
				/>
			{:else}
				<div class="avatar-group -space-x-3">
					{#each item.sharers.slice(0, 4) as person}
						<PersonAvatar abbrName={abbr(person.name)} styleProps={person.styleProps} />
					{/each}
					{#if item.sharers.length > 4}
						<div class="avatar placeholder">
							<div class="w-8 bg-neutral-focus text-neutral-content">
								<span>+{item.sharers.length - 4}</span>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
	<div class="flex absolute top-2 right-2 justify-between items-center w-fill">
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
	</div>
</div>

<Modal on:primaryAction={emitDeleteItem} bind:modalOpen>
	<span slot="header">
		<i class="fa-solid fa-exclamation fa-2xl text-warning bold" />
	</span>

	<span slot="body"
		>Are you sure you want to <span class="underline decoration-4 decoration-error">delete</span
		> this item?</span
	>
	<span slot="secondary">This action is permanent and you will not be able to undo it.</span>
	<span slot="secondaryButton">Cancel</span>
	<span slot="actionButton">Confirm</span>
</Modal>
