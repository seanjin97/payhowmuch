<script lang="ts">
	import { clickOutside } from '$lib/handlers/click_outside';
	import { personCount } from '$lib/store';

	export let personName: string;
	export let underline: boolean;
	export let colour: string;
	export let editMode: boolean;

	let ref: any;

	const setFocus = () => {
		ref.focus();
	};
</script>

<h3 class="card-title">
	{#if editMode}
		<label class="flex items-center" use:clickOutside>
			<input
				class="input input-xs input-bordered text-sm md:text-base p-2"
				type="text"
				bind:value={personName}
				bind:this={ref}
				style="width: 55%;"
			/>
		</label>
	{:else}
		<div class="flex items-center hover:cursor-auto whitespace-nowrap " on:click={setFocus}>
			<p
				class="decoration-2 {underline
					? 'underline'
					: null} decoration-double text-sm md:text-base "
				style="text-decoration-color: {colour};"
			>
				{personName}
			</p>
		</div>
	{/if}
</h3>
