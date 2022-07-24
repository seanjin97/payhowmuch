<script lang="ts">
	import { people, personCount } from '$lib/store';
	import type { Person as PersonType } from '$lib/types';
	import Person from './person/Person.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import randomColor from '$lib/handlers/random_color';
	import Modal from '../common/Modal.svelte';
	import Button from '../common/Button.svelte';
	import { fade } from 'svelte/transition';
	import { DEFAULT_PERSON } from '$lib/constants';

	let expandedList: string[] = [];
	let modalOpen = false;

	const addPerson = () => {
		$personCount++;
		const randomName = `Person ${$personCount}`;
		const newPerson = {
			id: uuidv4(),
			name: randomName,
			styleProps: { primary: randomColor() },
			...DEFAULT_PERSON,
		};
		$people = [...$people, newPerson];
	};

	const deletePerson = (event: CustomEvent<{ id: string }>) => {
		const removedPersonList = $people.filter((person) => person.id !== event.detail.id);
		$people = removedPersonList;
	};

	const updatePerson = (event: CustomEvent<{ updatedPerson: PersonType }>) => {
		const index = $people.findIndex((person) => person.id === event.detail.updatedPerson.id);
		const modifiedList = [...$people];
		modifiedList[index] = event.detail.updatedPerson;
		$people = modifiedList;
	};

	const resetPersonList = () => {
		retractAllPersons();
		$people = [];
		$personCount = 0;
	};

	const expandAllPersons = () => {
		const expandedPeople = $people.map((people) => people.id);
		expandedList = expandedPeople;
	};

	const retractAllPersons = () => {
		expandedList = [];
	};

	const updateExpandedPersons = (e: CustomEvent<{ id: string; expand: boolean }>) => {
		let updatedList: string[];
		if (e.detail.expand) {
			updatedList = [...expandedList, e.detail.id];
		} else {
			updatedList = expandedList.filter((personId) => personId !== e.detail.id);
		}

		expandedList = updatedList;
	};
</script>

<div class="mt-8">
	<h2 class="font-bold text-lg opacity-80">Who's sharing the bill?</h2>
	<div class="flex justify-between items-center">
		<Button styleProps="btn-circle mt-4 mb-2 hover:opacity-80" on:click={addPerson}>
			<i class="fa-solid fa-plus" />
		</Button>
		{#if $people.length > 0}
			<div transition:fade|local>
				{#if expandedList.length > 0}
					<Button
						styleProps="btn-primary btn-outline btn-xs hover:opacity-80"
						on:click={retractAllPersons}
						>Retract <i class="ml-1 fa-solid fa-angles-up" /></Button
					>
				{:else}
					<Button
						styleProps="btn-primary btn-outline btn-xs hover:opacity-80"
						on:click={expandAllPersons}
						>Expand <i class="ml-1 fa-solid fa-angles-down" /></Button
					>
				{/if}

				<Button
					on:click={() => (modalOpen = true)}
					styleProps="btn-error btn-xs hover:opacity-80"
					>Reset <i class="ml-1 fa-solid fa-circle-minus" /></Button
				>
			</div>

			<Modal on:primaryAction={resetPersonList} bind:modalOpen>
				<span slot="header">
					<i class="fa-solid fa-exclamation fa-2xl text-warning bold" />
				</span>

				<span slot="body"
					>Are you sure you want to <span class="underline decoration-4 decoration-error"
						>reset</span
					> this list?</span
				>
				<span slot="secondary"
					>This action is permanent and you will not be able to undo it.</span
				>
				<span slot="secondaryButton">Cancel</span>
				<span slot="actionButton">Confirm</span>
			</Modal>
		{/if}
	</div>

	{#if $people.length !== 0}
		{#each $people as person (person.id)}
			<Person
				bind:person
				{expandedList}
				on:removePerson={deletePerson}
				on:toggleView={updateExpandedPersons}
				on:updatePerson={updatePerson}
			/>
		{/each}
	{/if}
</div>
