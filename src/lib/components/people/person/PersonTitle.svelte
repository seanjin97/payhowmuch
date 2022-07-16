<script lang="ts">
	import { clickOutside } from '$lib/handlers/click_outside';
	import { tick } from 'svelte';
	import { personCount } from '$lib/store';

	export let personName: string;
	export let underline: boolean;
	export let colour: string;

	$: name = personName;
	let focused = false;
	let ref: any;

	const setFocus = async () => {
		focused = true;
		await tick();
		ref.focus();
	};

	const changeName = () => {
		if (name.length === 0) {
			const randomName = `Person ${$personCount + 1}`;
			const name = randomName;
			personName = name;
			focused = false;
		} else {
			personName = name;
			focused = false;
		}
	};
</script>

<h3 class="card-title">
	{#if focused}
		<form on:submit|preventDefault={changeName}>
			<label class="flex items-center" use:clickOutside on:outclick={changeName}>
				<input
					class="input input-xs input-ghost text-sm md:text-base"
					type="text"
					bind:value={name}
					bind:this={ref}
					style="width: 55%;"
				/>
			</label>
		</form>
	{:else}
		<div
			class="flex items-center hover:cursor-pointer hover:opacity-60 opacity-100 whitespace-nowrap"
			on:click={setFocus}
		>
			<p
				class="decoration-2 {underline
					? 'underline'
					: null} decoration-double text-sm md:text-base "
				style="text-decoration-color: {colour};"
			>
				{personName}
			</p>
			<i class="ml-2 fas fa-edit fa-xs" />
		</div>
	{/if}
</h3>
