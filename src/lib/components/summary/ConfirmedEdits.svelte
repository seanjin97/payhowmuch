<script lang="ts">
	import { percentageFormatter } from '$lib/handlers/util';
	import type { Person } from '$lib/types';
	import type { Tweened } from 'svelte/motion';

	export let countConfirmed: number;
	export let percentageConfirmed: Tweened<number>;
	export let people: Person[];
</script>

<div>
	<h4 class="font-bold text-xl mb-4">
		Confirmed Edits for {countConfirmed} of {people.length}
		People!
	</h4>
	<div id="progress-bar" class="flex items-center justify-between mb-4">
		<label for="progress-bar" class="m-1 text-xs opacity-80">0%</label>
		<progress
			class="progress {Math.ceil($percentageConfirmed) === 100
				? 'progress-success'
				: 'progress-error'}"
			value={$percentageConfirmed}
			max="100"
		/>
		<label for="progress-bar" class="m-1 text-xs opacity-80"
			>{percentageFormatter.format($percentageConfirmed)}%</label
		>
	</div>
</div>
